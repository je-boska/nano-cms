import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

const AdminScreen = () => {
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    const { data } = await axios.get('/api/posts')
    setPosts(data)
  }

  useEffect(() => {
    getPosts()
  }, [])

  const deleteHandler = async id => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`/api/posts/${id}`)
    }
    getPosts()
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
          <div className='buttons'>
            <button onClick={() => deleteHandler(post._id)}>
              <h3>DELETE</h3>
            </button>
            <Link to={`/admin/edit/${post._id}`}>
              <button>
                <h3>EDIT</h3>
              </button>
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}

export default AdminScreen
