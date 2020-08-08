import React, { useState } from "react"
import "../css/imageUpload.css"
import Modal from "@material-ui/core/Modal"
import { Button, Input, TextField } from "@material-ui/core"
import { getModalStyle, useStyles } from "../common/ModelStyle"
import postValidation from "../validations/postValidation"
import { db, storage, auth } from "../config/firebase"
import firebase from "firebase"

function ImageUpload() {
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const [progressBar, setprogressBar] = useState("none")
  const [uploadButton, setUploadButton] = useState("block")
  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState("")
  const [errors, setErrors] = useState({})
  const [progress, setProgress] = useState(0)

  const handleModel = () => {
    setOpen(!open)
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0])
      setImage(e.target.files[0])
    }
  }
  const savePost = () => {
    const { errors } = postValidation(image)
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return false
    } else {
      // Upload The Image File
      const uploadTask = storage.ref(`images/${image.name}`).put(image)

      // Listen for state changes
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setUploadButton("none")
          setprogressBar("block")
          setProgress(progress)
        },
        (error) => {
          console.log(error)
          alert(error.message)
        },
        () => {
          // Now get The Image Download Url and save into posts collection
          storage
            .ref("/images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                image: `images/${image.name}`,
                username: auth.currentUser.displayName,
                userId: auth.currentUser.uid,
              })

              setProgress(0)
              setImage(null)
              setCaption("")
              setOpen(false)
            })
        }
      )
    }
  }
  return (
    <div className="imageUpload">
      <Button variant="outlined" color="primary" onClick={handleModel}>
        Add Post
      </Button>
      <div className="imageUpload">
        <Modal open={open} onClose={handleModel}>
          <div style={modalStyle} className={classes.paper}>
            <div className="imageUplaod__title">
              <h3>Upload your new post 😍</h3>
            </div>
            <div className="imageUpload__input">
              <Input
                type="text"
                placeholder="Enter caption"
                onChange={(e) => setCaption(e.target.value)}
                fullWidth
              />
            </div>
            <div className="imageUpload__input">
              <TextField
                error={errors?.image ? true : false}
                helperText={errors?.image}
                type="file"
                fullWidth
                onChange={handleChange}
              />
            </div>
            <div className="imageUpload__input">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ display: uploadButton }}
                onClick={savePost}>
                Post
              </Button>
              <div className="imageUpload__progressDiv">
                <progress
                  className="imageUpload__progressbar"
                  value={progress}
                  style={{ display: progressBar }}
                  max="100"
                />
                <p
                  className="imageUpload__progressPercentage"
                  style={{ display: progressBar }}>
                  {progress}%
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default ImageUpload
