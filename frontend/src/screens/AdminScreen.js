import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './AdminScreen.css'
import { UserContext } from '../UserContext'
import { createPost, deletePost, getAllPosts } from '../requests/AdminRequests'
import SectionPreview from '../components/SectionPreview/SectionPreview'

const AdminScreen = ({ history }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const { user, setUser } = useContext(UserContext)

  const getPosts = useCallback(async () => {
    const data = await getAllPosts()
    setPosts(data)
  }, [])

  useEffect(() => {
    if (!user) {
      history.push('/login')
    } else {
      getPosts()
    }
  }, [user, history, getPosts])

  async function deleteHandler(id) {
    setLoading(true)
    if (window.confirm('Are you sure?')) {
      await deletePost(user.token, id)
    }
    getPosts()
    setLoading(false)
  }

  async function createPostHandler() {
    const id = await createPost(user.token)
    history.push(`/admin/edit/${id}?create=true`)
  }

  function logoutHandler() {
    setUser(null)
    sessionStorage.removeItem('user')
  }

  function movePostUpHandler(position) {
    const rearrangedPosts = posts.map(post => {
      return {
        ...post,
        position:
          post.position === position && post.position < posts.length
            ? post.position + 1
            : post.position === position + 1
            ? post.position - 1
            : post.position,
      }
    })
    setPosts(rearrangedPosts)
  }

  function movePostDownHandler(position) {
    const rearrangedPosts = posts.map(post => {
      return {
        ...post,
        position:
          post.position === position && post.position > 1
            ? post.position - 1
            : post.position === position - 1
            ? post.position + 1
            : post.position,
      }
    })
    setPosts(rearrangedPosts)
  }

  return (
    <>
      <div className='admin-buttons'>
        <button onClick={createPostHandler}>
          <h3>CREATE POST</h3>
        </button>
        <button onClick={logoutHandler}>
          <h3>LOG OUT</h3>
        </button>
      </div>
      {posts
        .sort((a, b) => (a.position < b.position ? 1 : -1))
        .map(post => (
          <div className='post-list' key={post._id}>
            <div className='up-down-arrows'>
              <button onClick={() => movePostUpHandler(post.position)}>
                <h3>↑</h3>
              </button>
              <button onClick={() => movePostDownHandler(post.position)}>
                <h3>↓</h3>
              </button>
            </div>
            <div className='section-previews'>
              {post.sections.map(section => (
                <SectionPreview key={section.sectionId} section={section} />
              ))}
            </div>
            <div className='delete-edit-buttons'>
              <button
                onClick={() => deleteHandler(post._id)}
                disabled={loading}>
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
