import React, { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Post from "../components/Post"
import { db } from "../config/firebase"
import "../css/home.css"
import Skeleton from "../components/SkeletonComponent"
function Home() {
  const [posts, setPosts] = useState([])
  const [count] = useState([0, 1, 2, 3, 4, 5])
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        )
      })
  }, [])
  let DisplayPost
  if (posts.length > 0) {
    DisplayPost = posts.map(({ id, post }) => (
      <Post
        key={id}
        postId={id}
        userId={post.userId}
        username={post.username}
        imageUrl={post.imageUrl}
        caption={post.caption}
      />
    ))
  } else {
    DisplayPost = count.map((item) => <Skeleton key={item} />)
  }
  return (
    <div>
      <Navbar />
      <div className="home__posts">{DisplayPost}</div>
    </div>
  )
}

export default Home
