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
          {post.image && <img src={post.image} alt={post.title} />}
          {post.title && <h1>{post.title}</h1>}
          {post.text && <p>{post.text}</p>}
          {post.imageTwo && <img src={post.imageTwo} alt={post.title} />}
          {post.titleTwo && <h1>{post.titleTwo}</h1>}
          {post.textTwo && <p>{post.textTwo}</p>}
        </div>
      ))}
    </>
  )
}

export default HomeScreen
