import React, { useEffect, useContext } from 'react'
import '../App.css'
import { UserContext } from '../UserContext'
import useForm from '../hooks/UseForm'
import { uploadImage, submitForm, cancelForm } from '../requests/EditRequests'

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
    const imageUrl = await uploadImage(e.target.files[0], user.token)
    setImage(imageUrl)
    setUpdateImage(true)
    setLoading(false)
  }

  const submitHandler = async e => {
    e.preventDefault()
    await submitForm(match.params.id, user.token, { title, text, image })
    history.push('/admin')
  }

  const cancelHandler = async e => {
    e.preventDefault()
    await cancelForm(
      window.location.search,
      user.token,
      match.params.id,
      updateImage,
      image
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
