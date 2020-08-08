import firebase from "firebase"
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
}

const firebaseapp = firebase.initializeApp(firebaseConfig)
const db = firebaseapp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }
