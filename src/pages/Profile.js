import React, { useState, useEffect } from "react"
import "../css/profile.css"
import Navbar from "../components/Navbar"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Container, Grid } from "@material-ui/core"
import { Link } from "react-router-dom"
import { auth, db } from "../config/firebase"
import { useHistory } from "react-router-dom"
import ImageUpload from "../components/ImageUpload"
import { Lightbox } from "react-modal-image"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}))
function Profile() {
  const history = useHistory()
  const classes = useStyles()
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [imgUrl, setImgUrl] = useState("")
  const [cap, setCap] = useState("")
  const { uid, image, name } = JSON.parse(localStorage.getItem("authUser"))

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .where("userId", "==", uid)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => doc.data()))
      })

    return () => {
      unsubscribe()
    }
  }, [])

  const signOut = () => {
    auth
      .signOut()
      .then(() => history.push("/login"))
      .catch((err) => console.log(err))
  }
  const handleLightBox = () => {
    setOpen(!open)
  }
  const openLightBox = (image, caption) => {
    setImgUrl(image)
    setCap(caption)
    setOpen(!open)
  }
  return (
    <React.Fragment>
      <Navbar />
      {open && <Lightbox medium={imgUrl} alt={cap} onClose={handleLightBox} />}

      <Container maxWidth="md">
        <div className="profile">
          <div className="profile__header">
            <img alt="profile-image" className="profile_image" src={image} />
            <div className="profile__actions">
              <h3>{name}</h3>
              <ImageUpload />

              <Button variant="outlined" color="secondary">
                <Link to="/edit-profile"> Edit profile</Link>
              </Button>
              <Button variant="outlined" onClick={signOut}>
                Log out
              </Button>
            </div>
          </div>

          {/* <div className="profile__galery1"></div> */}
          <div className="profile__galery">
            <Grid container className={classes.root} spacing={1}>
              <Grid
                container
                spacing={1}
                justify="flex-start"
                alignItems="center">
                {posts.map((value, i) => (
                  <Grid key={i} item xs={6} sm={4} lg={4} xl={4}>
                    <img
                      alt="profile-image"
                      className="profile__galery__image"
                      src={value.imageUrl}
                      onClick={() =>
                        openLightBox(value.imageUrl, value.caption)
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default Profile
