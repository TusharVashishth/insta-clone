import React from "react"
import firebase from "firebase"
const facebookLogin = (history) => {
  const provider = new firebase.auth.FacebookAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // const token = result.credential.accessToken
      const user = result.user
      user.updateProfile({
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
      const data = {
        uid: user.uid,
        name: user.displayName,
        image: user.photoURL,
      }
      localStorage.setItem("authUser", JSON.stringify(data))

      history.push("/")
    })
    .catch((error) => {
      console.log(error)
      alert(error.message)
    })
}

export default facebookLogin
