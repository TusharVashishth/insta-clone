import React, { useState, useEffect } from "react"
import "../css/post.css"
import Avatar from "@material-ui/core/Avatar"
import { db } from "../config/firebase"
import firebase from "firebase"
function Post({ postId, userId, username, imageUrl, caption }) {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  const { name, image } = JSON.parse(localStorage.getItem("authUser"))
  const addComment = (e, postId) => {
    e.preventDefault()

    db.collection("comments")
      .add({
        postId: postId,
        username: name,
        comment: comment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setComment("")
      })
      .catch((err) => console.log(err.message))
  }

  useEffect(() => {
    db.collection("comments")

      .where("postId", "==", postId)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            comment: doc.data(),
          }))
        )
      })
  }, [])

  return (
    <div className="post">
      <div className="post__header">
        <Avatar alt="User" src={image} />
        <p className="post__username">{username}</p>
      </div>

      <img className="post__image" alt="image" src={imageUrl} />

      <div className="post__comments">
        <p>
          <strong>{username}</strong> {caption}
        </p>
      </div>
      {comments.map(({ id, comment }) => (
        <div className="post__comments" key={id}>
          <p>
            <strong>{comment.username}</strong> {comment.comment}
          </p>
        </div>
      ))}
      <form className="post__commentBox">
        <input
          type="text"
          className="post__input"
          placeholder="Add a comments..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          disabled={!comment}
          className="post__button"
          type="submit"
          onClick={(e) => addComment(e, postId)}>
          Post
        </button>
      </form>
    </div>
  )
}

export default Post
