import React from "react"
import Logo from "../assets/logo.png"
import Avatar from "@material-ui/core/Avatar"
import "../css/navbar.css"
import { Link } from "react-router-dom"
function Navbar() {
  const { image } = JSON.parse(localStorage.getItem("authUser"))
  return (
    <div className="navbar">
      <Link to="/">
        <img src={Logo} alt="Logo" className="navbar__logo" />
      </Link>
      <Link to="/profile">
        <Avatar alt="profile" src={image} />
      </Link>
    </div>
  )
}

export default Navbar
