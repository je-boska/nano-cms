import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'

const AdminScreen = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/posts')
      setPosts(data)
    }
    getData()
  }, [])

  const editHandler = () => {
    console.log('Click!')
  }

  return (
    <>
      <button className='create-button'>CREATE POST</button>
      {posts.map(post => (
        <div className='post post-list' key={post._id}>
          <h2>{post.title}</h2>
          <button onClick={editHandler}>
            <h3>EDIT</h3>
          </button>
        </div>
      ))}
    </>
  )
}

export default AdminScreen
