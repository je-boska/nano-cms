import React, { useEffect, useContext } from 'react'
import '../App.css'
import axios from 'axios'
import { UserContext } from '../UserContext'
import useForm from '../hooks/UseForm'

const EditPostScreen = ({ match, history }) => {
  const { user } = useContext(UserContext)

  const {
    values,
    setTitle,
    setText,
    setImage,
    setLoading,
    setUpdateImage,
    getPost,
  } = useForm()
  const { title, text, image, loading, updateImage } = values

  useEffect(() => {
    getPost(match.params.id)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!user) {
      history.push('/login')
    }
  }, [user, history])

  const uploadHandler = async e => {
    setLoading(true)
    const imageUpload = e.target.files[0]

    const formData = new FormData()
    formData.append('image', imageUpload)

    const { data } = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`,
      },
    })

    setImage(data.data)
    setUpdateImage(true)
    setLoading(false)
  }

  const submitHandler = async e => {
    e.preventDefault()
    await axios.put(
      `/api/posts/${match.params.id}`,
      {
        title,
        text,
        image,
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

    const headers = {
      Authorization: `Bearer ${user.token}`,
    }

    if (createPost) {
      await axios.delete(`/api/posts/${match.params.id}`, {
        headers,
      })
    }

    if (updateImage) {
      const imageId = image.slice(-24, -4)
      axios.delete(`/api/upload/${imageId}`, {
        headers,
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
              {loading ? 'UPLOADING' : !image ? 'Choose file' : image}
              <input
                type='file'
                id='image-upload'
                accept='image/png, image/jpg, image/jpeg'
                onChange={uploadHandler}
              />
            </label>
          </div>
          <br />
          <button onClick={cancelHandler}>
            <h3>CANCEL</h3>
          </button>
          <button type='submit' disabled={loading}>
            <h3>SAVE</h3>
          </button>
        </form>
      </div>
    </>
  )
}

export default EditPostScreen
