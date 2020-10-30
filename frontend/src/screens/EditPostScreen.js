import React, { useEffect, useContext } from 'react'
import '../App.css'
import { UserContext } from '../UserContext'
import useForm from '../hooks/UseForm'
import { submitForm, cancelForm } from '../requests/EditPostRequests'
import PostSectionForm from '../components/PostSectionForm'

const EditPostScreen = ({ match, history }) => {
  const { user } = useContext(UserContext)

  const { values, setSections, setImage, setUpdateImage, getPost } = useForm()
  const { sections, image, loading, updateImage } = values

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
      sections,
    })
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
        <div className='add-remove-buttons'>
          <button onClick={() => console.log('ADD')}>
            <h3>+ ADD SECTION</h3>
          </button>
          <button onClick={() => console.log('REMOVE')}>
            <h3>- REMOVE SECTION</h3>
          </button>
        </div>
        <PostSectionForm
          setSections={setSections}
          sections={sections}
          image={image}
          setImage={setImage}
          token={user.token}
          updateImage={updateImage}
          setUpdateImage={setUpdateImage}
        />
        <div className='cancel-save-buttons'>
          <button onClick={cancelHandler}>
            <h3>CANCEL</h3>
          </button>
          <button onClick={submitHandler} disabled={loading}>
            <h3>PUBLISH</h3>
          </button>
        </div>
      </div>
    </>
  )
}

export default EditPostScreen
