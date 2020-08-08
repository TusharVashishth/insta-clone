import React, { useEffect, useState } from "react"
import "./App.css"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import { auth } from "./config/firebase"
import PrivateRoute from "./config/PrivateRoute"
import EditProfile from "./pages/EditProfile"

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        const data = {
          uid: user.uid,
          name: user.displayName,
          image: user.photoURL,
        }
        localStorage.setItem("authUser", JSON.stringify(data))
      } else {
        setUser(null)
        localStorage.removeItem("authUser")
      }
    })
    return () => {
      unsubscribe()
    }
  }, [user])

  return (
    <div className="app">
      {/* <ProfileDialog /> */}
      <Router>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <PrivateRoute path="/edit-profile" exact component={EditProfile} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" component={Register} />
      </Router>
    </div>
  )
}

export default App
