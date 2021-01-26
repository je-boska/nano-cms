import React, { useState, useEffect, useContext, useCallback } from 'react'
import './AdminScreen.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import {
  createPost,
  deletePost,
  getAllPosts,
} from '../../requests/AdminRequests'
import SectionPreview from '../../components/SectionPreview/SectionPreview'
import { submitForm } from '../../requests/EditPostRequests'

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

  async function deleteHandler(id, deletePosition) {
    setLoading(true)
    if (window.confirm('Are you sure?')) {
      await deletePost(user.token, id)
      const rearrangedPosts = rearrangeOnDelete(deletePosition)
      rearrangedPosts.forEach(post => {
        if (post.position >= deletePosition) {
          submitForm(post, user.token)
        }
      })
      setPosts(rearrangedPosts)
    }
    setLoading(false)
  }

  function rearrangeOnDelete(deletePosition) {
    return posts
      .filter(post => post.position !== deletePosition)
      .map(post => {
        return {
          ...post,
          position:
            post.position > deletePosition ? post.position - 1 : post.position,
        }
      })
  }

  async function createPostHandler() {
    const id = await createPost(user.token)
    history.push(`/admin/edit/${id}?create=true`)
  }

  function logoutHandler() {
    setUser(null)
    localStorage.removeItem('user')
  }

  function movePostUpHandler(position) {
    const rearrangedPosts = posts.map(post => {
      return {
        ...post,
        position:
          post.position === position && post.position < posts.length
            ? post.position + 1
            : post.position === position + 1
            ? position
            : post.position,
      }
    })
    for (let i = 0; i < rearrangedPosts.length; i++) {
      if (
        rearrangedPosts[i].position === position ||
        rearrangedPosts[i].position === position + 1
      ) {
        submitForm(rearrangedPosts[i], user.token)
      }
    }
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
    for (let i = 0; i < rearrangedPosts.length; i++) {
      if (
        rearrangedPosts[i].position === position ||
        rearrangedPosts[i].position === position - 1
      ) {
        submitForm(rearrangedPosts[i], user.token)
      }
    }
    setPosts(rearrangedPosts)
  }

  return (
    <>
      <div className='admin-buttons'>
        <button onClick={createPostHandler} className='create-post-button'>
          <h3>CREATE POST</h3>
        </button>
        <button onClick={logoutHandler} className='logout-button'>
          <h3>LOG OUT</h3>
        </button>
      </div>
      {posts
        .sort((a, b) => (a.position < b.position ? 1 : -1))
        .map(post => (
          <div className='post-card' key={post._id}>
            <div className='up-down-arrows'>
              <button
                className='up-arrow'
                onClick={() => movePostUpHandler(post.position)}>
                <h3>↑</h3>
              </button>
              <br />
              <button
                className='down-arrow'
                onClick={() => movePostDownHandler(post.position)}>
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
                className='delete-edit-button delete-button'
                onClick={() => deleteHandler(post._id, post.position)}
                disabled={loading}>
                <i className='fas fa-trash-alt' />
              </button>
              <Link to={`/admin/edit/${post._id}`}>
                <button className='delete-edit-button edit-button'>
                  <i className='fas fa-edit' />
                </button>
              </Link>
            </div>
          </div>
        ))}
    </>
  )
}

export default AdminScreen
