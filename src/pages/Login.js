import React, { useState } from "react"
import "../css/auth.css"
import logo from "../assets/logo.png"
import { TextField, Button, CircularProgress } from "@material-ui/core"
import { Link, useHistory } from "react-router-dom"
import FacebookIcon from "@material-ui/icons/Facebook"
import loginValidation from "../validations/loginValidation"
import { auth } from "../config/firebase"
import facebookLogin from "../components/FacebookLogin"
function Login() {
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const signin = (event) => {
    event.preventDefault()
    const data = {
      email: email,
      password: password,
    }
    const { errors } = loginValidation(data)
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return false
    }
    setLoading(true)
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const data = {
          name: "",
          uid: "",
          image:
            "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png",
        }
        localStorage.setItem("authUser", JSON.stringify(data))
        history.push("/")
      })
      .catch((err) => {
        setLoading(false)
        if (err.code === "auth/user-not-found") {
          setErrors({ email: "Email not found in our records." })
        } else if (err.code === "auth/wrong-password") {
          setErrors({ password: "Password is invalid." })
        }
      })
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
              Log in with Facebook
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

          <div className="auth__buttons auth__signup">
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              startIcon={
                loading ? <CircularProgress color="primary" size={18} /> : ""
              }
              onClick={signin}>
              Log in
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
          don't have an account? <Link to="/signup">Sign up</Link>{" "}
        </p>
      </div>
    </div>
  )
}

export default Login
