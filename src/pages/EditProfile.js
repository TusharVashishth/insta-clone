import React, { useState, useEffect } from "react"
import { TextField, Button } from "@material-ui/core"
import "../css/editProfile.css"
import { storage, auth } from "../config/firebase"
import postValidation from "../validations/postValidation"
import Alert from "@material-ui/lab/Alert"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

function EditProfile() {
  // const [username, setUsername] = useState("")
  const [image, setImage] = useState(null)
  const [progressBar, setprogressBar] = useState("none")
  const [uploadButton, setUploadButton] = useState("block")
  const [backButton, setBackButton] = useState("block")
  const [msg, setMsg] = useState("none")
  const [errors, setErrors] = useState({})
  const [progress, setProgress] = useState(0)
  const { name, uid } = JSON.parse(localStorage.getItem("authUser"))
  // useEffect(() => {
  //   setUsername(name)
  // }, [])
  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const updateProfile = (e) => {
    e.preventDefault()
    const { errors } = postValidation(image)
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return false
    } else {
      const uploadImage = storage.ref(`/userImages/${image.name}`).put(image)
      uploadImage.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setUploadButton("none")
          setBackButton("none")
          setprogressBar("block")
          setProgress(progress)
        },
        (error) => {
          console.log(error)
          alert(error.message)
        },
        () => {
          storage
            .ref("userImages")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              auth.currentUser
                .updateProfile({
                  photoURL: url,
                })
                .catch((error) => alert(error.message))
              setImage(null)
              // setUsername("")
              setProgress(0)
              setMsg("block")
              setBackButton("block")
              setprogressBar("none")

              const data = {
                name: name,
                image: url,
                uid: uid,
              }
              localStorage.setItem("authUser", JSON.stringify(data))
            })
            .catch((err) => console.log(err))
        }
      )
    }
  }
  return (
    <div className="editprofile__parent">
      <Navbar />

      <div className="editProfile">
        <div className="editProfile__box">
          <h3>Update Profile</h3>
          <div className="alertMsg" style={{ display: msg }}>
            <Alert severity="success">Profile update successfully!</Alert>
          </div>
          <form className="editProfile__form">
            {/* <div className="editProfile__input">
              <TextField
                label="Name"
                size="small"
                value={username}
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
              />
            </div> */}
            <div className="editProfile__input">
              <TextField
                type="file"
                label="Name"
                size="small"
                error={errors?.image ? true : false}
                helperText={errors?.image}
                fullWidth
                onChange={handleImage}
              />
            </div>
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
            <div className="editProfile__input">
              <Button
                variant="contained"
                fullWidth
                style={{ display: uploadButton }}
                color="secondary"
                onClick={updateProfile}>
                Update Profile
              </Button>
            </div>
            <div className="editProfile__input">
              <Link to="/profile">
                <Button
                  variant="contained"
                  fullWidth
                  style={{ display: backButton }}
                  color="secondary">
                  Back
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
