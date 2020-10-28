import React, { useEffect, useContext } from 'react'
import '../App.css'
import { UserContext } from '../UserContext'
import useForm from '../hooks/UseForm'
import { uploadImage, submitForm, cancelForm } from '../requests/EditRequests'
import PostForm from '../components/PostForm'

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
          <PostForm
            title={title}
            setTitle={setTitle}
            text={text}
            setText={setText}
            loading={loading}
            image={image}
            uploadHandler={uploadHandler}
          />
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
