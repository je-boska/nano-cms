import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'
import { UserContext } from '../UserContext'

const AdminScreen = ({ history }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const { user, setUser } = useContext(UserContext)

  const getPosts = useCallback(async () => {
    const { data } = await axios.get('/api/posts')
    setPosts(data)
  }, [])

  useEffect(() => {
    if (!user) {
      history.push('/login')
    } else {
      getPosts()
    }
  }, [user, history, getPosts])

  const deleteHandler = async id => {
    setLoading(true)
    if (window.confirm('Are you sure?')) {
      await axios.delete(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
    }
    getPosts()
    setLoading(false)
  }

  const createPostHandler = async () => {
    const {
      data: { _id },
    } = await axios.post(
      '/api/posts',
      {
        title: '',
        text: '',
        image: null,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
    )

    history.push(`/admin/edit/${_id}`)
  }

  const logoutHandler = () => {
    setUser(null)
    sessionStorage.removeItem('user')
  }

  return (
    <>
      <div className='admin-buttons'>
        <button className='create-button' onClick={createPostHandler}>
          <h3>CREATE POST</h3>
        </button>
        <button onClick={logoutHandler}>
          <h3>LOG OUT</h3>
        </button>
      </div>
      {posts.map(post => (
        <div className='post post-list' key={post._id}>
          <div className='img-container'>
            {post.image ? <img src={post.image} alt={post.title} /> : null}
          </div>
          <h2>{post.title}</h2>
          <div>
            <button onClick={() => deleteHandler(post._id)} disabled={loading}>
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
