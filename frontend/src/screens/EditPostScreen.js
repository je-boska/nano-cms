import React, { useEffect, useContext } from 'react'
import '../App.css'
import { UserContext } from '../UserContext'
import useForm from '../hooks/UseForm'
import { submitForm, cancelForm } from '../requests/EditPostRequests'
import PostSectionForm from '../components/PostSectionForm/PostSectionForm'
import SectionPreview from '../components/SectionPreview/SectionPreview'

const EditPostScreen = ({ match, history }) => {
  const { user } = useContext(UserContext)

  const {
    values,
    setSections,
    setCleanupImage,
    setSectionSaved,
    getPost,
  } = useForm()
  const { sections, loading, cleanupImage, sectionSaved } = values

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
    setCleanupImage(true)
    await cancelForm(
      window.location.search,
      user.token,
      match.params.id,
      sections
    )
    history.push('/admin')
  }

  return (
    <>
      <div className='form-container'>
        <div className='cancel-save-buttons'>
          <button onClick={cancelHandler}>
            <h3>CANCEL</h3>
          </button>
          <button onClick={submitHandler} disabled={loading || !sectionSaved}>
            <h3>PUBLISH</h3>
          </button>
        </div>
        <div className='section-previews'>
          {sections.map(section => (
            <SectionPreview key={section.sectionNumber} section={section} />
          ))}
        </div>
        <PostSectionForm
          cleanupImage={cleanupImage}
          sections={sections}
          setSections={setSections}
          sectionSaved={sectionSaved}
          setSectionSaved={setSectionSaved}
          token={user.token}
        />
      </div>
    </>
  )
}

export default EditPostScreen
