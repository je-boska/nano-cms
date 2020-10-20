import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
      <Link to='/admin/createpost'>
        <button className='create-button'>
          <h3>CREATE POST</h3>
        </button>
      </Link>
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
