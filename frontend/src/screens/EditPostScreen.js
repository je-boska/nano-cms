import React, { useState, useEffect, useContext, useCallback } from 'react'
import '../App.css'
import axios from 'axios'
import { UserContext } from '../UserContext'

const EditPostScreen = ({ match, history, location }) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const [updateImage, setUpdateImage] = useState(false)
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    let newImage
    if (updateImage) {
      const formData = new FormData()
      formData.append('image', image)

      const { data } = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      })
      newImage = data.data
    }

    await axios.put(
      `/api/posts/${match.params.id}`,
      {
        title,
        text,
        image: updateImage ? newImage : image,
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

  const cancelHandler = async e => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    const createPost = urlParams.get('create')

    if (createPost) {
      await axios.delete(`/api/posts/${match.params.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
    }

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
          <h2>Image</h2>
          <div className='image-upload-container'>
            <label htmlFor='image-upload' className='image-upload-btn'>
              {!image ? 'Choose file' : image.name ? image.name : image}
              <input
                type='file'
                id='image-upload'
                accept='image/png, image/jpg, image/jpeg'
                onChange={e => {
                  setUpdateImage(true)
                  setImage(e.target.files[0])
                }}
              />
            </label>
          </div>
          <br />
          <button onClick={cancelHandler}>
            <h3>CANCEL</h3>
          </button>
          <button type='submit' disabled={loading}>
            <h3>{loading ? 'UPLOADING' : 'SAVE'}</h3>
          </button>
        </form>
      </div>
    </>
  )
}

export default EditPostScreen
