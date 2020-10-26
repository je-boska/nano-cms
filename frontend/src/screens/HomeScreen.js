import React, { useState, useEffect } from 'react'
import axios from 'axios'

const HomeScreen = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/posts')
      setPosts(data)
    }
    getData()
  }, [])

  return (
    <>
      {posts.map(post => (
        <div className='post' key={post._id}>
          {post.image ? <img src={post.image} alt={post.title} /> : null}
          <h1>{post.title}</h1>
          <p>{post.text}</p>
        </div>
      ))}
    </>
  )
}

export default HomeScreen
