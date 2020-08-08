import React, { useState } from "react"
import "../css/auth.css"
import logo from "../assets/logo.png"
import { TextField, Button, CircularProgress } from "@material-ui/core"
import { Link, useHistory } from "react-router-dom"
import FacebookIcon from "@material-ui/icons/Facebook"
import signupValidation from "../validations/signupValidation"
import { auth } from "../config/firebase"
import facebookLogin from "../components/FacebookLogin"
function Register() {
  const history = useHistory()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cpassword, setCpassword] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Register User
  const signUp = (event) => {
    event.preventDefault()
    const data = {
      username: name,
      email: email,
      password: password,
      cpassword: cpassword,
    }
    const { errors } = signupValidation(data)
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
    } else {
      setLoading(true)
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authuser) => {
          history.push("/login")
          return authuser.user.updateProfile({
            displayName: name,
            photoURL:
              "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png",
          })
        })
        .catch((err) => {
          setLoading(false)
          setErrors({ email: err.message })
        })
    }
  }
  return (
    <div className="auth">
      <div className="auth__box">
        <div className="auth__header">
          <img src={logo} alt="logo" className="auth__header__logo" />
          <h3 className="auth__header__text">
            Sign up to see photos and videos from your friends
          </h3>
          <div className="auth__buttons">
            <Button
              variant="contained"
              startIcon={<FacebookIcon />}
              onClick={() => facebookLogin(history)}>
              Sign up with Facebook
            </Button>
          </div>
          <div className="auth__OR">
            <h3>
              <span>OR</span>
            </h3>
          </div>
        </div>
        <form className="auth__form" autoComplete="off">
          <div className="auth__textField">
            <TextField
              label="Name"
              variant="outlined"
              size="small"
              onChange={(e) => setName(e.target.value)}
              value={name}
              error={errors?.username ? true : false}
              helperText={errors?.username}
            />
          </div>

          <div className="auth__textField">
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              error={errors?.email ? true : false}
              helperText={errors?.email}
            />
          </div>
          <div className="auth__textField">
            <TextField
              label="Password"
              variant="outlined"
              size="small"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              error={errors?.password ? true : false}
              helperText={errors?.password}
              type="password"
            />
          </div>
          <div className="auth__textField">
            <TextField
              label="Confirm Password"
              variant="outlined"
              size="small"
              onChange={(e) => setCpassword(e.target.value)}
              value={cpassword}
              error={errors?.cpassword ? true : false}
              helperText={errors?.cpassword}
              type="password"
            />
          </div>
          <div className="auth__buttons auth__signup">
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              startIcon={
                loading ? <CircularProgress color="primary" size={18} /> : ""
              }
              onClick={signUp}>
              Sign up
            </Button>
          </div>
          <div className="auth__policyText">
            By signing up, you agree to our
            <strong> Terms , Data Policy and Cookies Policy .</strong>
          </div>
        </form>
      </div>

      <div className="auth__gotoLogin">
        <p>
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
