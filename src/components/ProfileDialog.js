import React, { useState } from "react"
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@material-ui/core"
import "../css/profileDialog.css"
function ProfileDialog() {
  const [open, setOpen] = useState(false)
  const handleDialog = () => {
    setOpen(!open)
  }
  return (
    <div className="profile__dialogParent">
      <Button variant="outlined" color="primary" onClick={handleDialog}>
        Open alert dialog
      </Button>
      <Dialog open={open} onClose={handleDialog} fullWidth={true} maxWidth="md">
        <DialogContent>
          <div className="profile__dialog">
            <div className="profile__dialog__left">
              <img
                alt="profile-image"
                className="profile__dialog__image"
                src="https://instagram.fagr1-1.fna.fbcdn.net/v/t51.2885-19/s320x320/64898701_790729697987552_4477491594919936000_n.jpg?_nc_ht=instagram.fagr1-1.fna.fbcdn.net&_nc_ohc=yxNL0-cD-5QAX_9VUcM&oh=7ba7412b310c049b2423a53da0cfbf86&oe=5F5098FC"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProfileDialog
