import React, { useState, useEffect, useContext, useCallback } from 'react'
import '../App.css'
import axios from 'axios'
import { UserContext } from '../UserContext'

const EditPostScreen = ({ match, history }) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')

  const { user } = useContext(UserContext)

  const getPost = useCallback(async () => {
    const post = await axios.get(`/api/posts/${match.params.id}`)
    const { title, text, image } = post.data
    setTitle(title)
    setText(text)
    setImage(image)
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
    const formData = new FormData()
    formData.append('image', image)

    const { data } = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    await axios.put(
      `/api/posts/${match.params.id}`,
      {
        title,
        text,
        image: data.data,
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
          <br />
          <label htmlFor='image'>
            <h2>Image</h2>
          </label>
          <input
            type='file'
            id='image'
            accept='image/png, image/jpg, image/jpeg'
            onChange={e => setImage(e.target.files[0])}
          />
          <br />
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
