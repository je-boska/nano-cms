import React, { useState, useEffect, useContext, useCallback } from 'react'
import '../App.css'
import axios from 'axios'
import { UserContext } from '../UserContext'

const EditPostScreen = ({ match, history }) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const { user } = useContext(UserContext)

  const getPost = useCallback(async () => {
    const post = await axios.get(`/api/posts/${match.params.id}`)
    const { title, text } = post.data
    setTitle(title)
    setText(text)
  }, [match])

  useEffect(() => {
    if (!user) {
      history.push('/login')
    } else {
      getPost()
    }
  }, [user, history, getPost])

  const submitHandler = async e => {
    e.preventDefault()
    await axios.put(
      `/api/posts/${match.params.id}`,
      {
        title,
        text,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
    history.push('/admin')
  }

  return (
    <>
      <div className='form-container'>
        <form onSubmit={submitHandler}>
          <label htmlFor='title'>
            <h2>Title</h2>
          </label>
          <input
            size='50'
            id='title'
            value={title}
            onChange={e => setTitle(e.target.value)}></input>
          <label htmlFor='text'>
            <h2>Text</h2>
          </label>
          <textarea
            rows='10'
            cols='50'
            id='text'
            value={text}
            onChange={e => setText(e.target.value)}></textarea>
          <br></br>
          <button
            onClick={e => {
              e.preventDefault()
              history.push('/admin')
            }}>
            <h3>CANCEL</h3>
          </button>
          <button type='submit'>
            <h3>SAVE</h3>
          </button>
        </form>
      </div>
    </>
  )
}

export default EditPostScreen
