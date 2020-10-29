import React, { useEffect, useContext } from 'react'
import '../App.css'
import { UserContext } from '../UserContext'
import useForm from '../hooks/UseForm'
import { submitForm, cancelForm } from '../requests/EditRequests'
import PostSectionForm from '../components/PostSectionForm'

const EditPostScreen = ({ match, history }) => {
  const { user } = useContext(UserContext)

  const {
    values,
    setSections,
    setTitle,
    setText,
    setImage,
    setTitleTwo,
    setTextTwo,
    setImageTwo,
    setLoading,
    setUpdateImage,
    getPost,
  } = useForm()
  const {
    sections,
    title,
    text,
    image,
    titleTwo,
    textTwo,
    imageTwo,
    loading,
    updateImage,
  } = values

  function setInitialSections() {
    imageTwo && setSections(2)
  }

  useEffect(() => {
    setInitialSections()
    // eslint-disable-next-line
  }, [imageTwo])

  useEffect(() => {
    getPost(match.params.id)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!user) {
      history.push('/login')
    }
  }, [user, history])

  const submitHandler = async e => {
    e.preventDefault()
    await submitForm(match.params.id, user.token, {
      title,
      text,
      image,
      titleTwo,
      textTwo,
      imageTwo,
    })
    history.push('/admin')
  }

  const cancelHandler = async e => {
    e.preventDefault()
    setUpdateImage(true)
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
        <button onClick={() => sections < 4 && setSections(sections + 1)}>
          <h3>+ ADD SECTION</h3>
        </button>
        <button onClick={() => sections > 1 && setSections(sections - 1)}>
          <h3>- REMOVE SECTION</h3>
        </button>
        <form onSubmit={submitHandler}>
          <PostSectionForm
            key={1}
            section={1}
            title={title}
            setTitle={setTitle}
            text={text}
            setText={setText}
            image={image}
            setImage={setImage}
            setUpdateImage={setUpdateImage}
            loading={loading}
            setLoading={setLoading}
            token={user.token}
          />
          {sections >= 2 && (
            <PostSectionForm
              key={2}
              section={2}
              title={titleTwo}
              setTitle={setTitleTwo}
              text={textTwo}
              setText={setTextTwo}
              image={imageTwo}
              setImage={setImageTwo}
              setUpdateImage={setUpdateImage}
              loading={loading}
              setLoading={setLoading}
              token={user.token}
            />
          )}
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
