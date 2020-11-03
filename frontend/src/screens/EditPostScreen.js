import React, { useEffect, useContext } from 'react'
import '../App.css'
import { UserContext } from '../UserContext'
import useForm from '../hooks/UseForm'
import {
  submitForm,
  cancelForm,
  checkImageInDatabase,
  deleteImage,
} from '../requests/EditPostRequests'
import PostSectionForm from '../components/PostSectionForm/PostSectionForm'
import SectionPreview from '../components/SectionPreview/SectionPreview'

const EditPostScreen = ({ match, history }) => {
  const { user } = useContext(UserContext)

  const {
    values,
    setSections,
    setTitle,
    setText,
    setImage,
    setSectionId,
    setLoading,
    setSectionSaved,
    setImagesToRemove,
    getPost,
    getPostsLength,
  } = useForm()
  const {
    sections,
    title,
    text,
    image,
    sectionId,
    loading,
    sectionSaved,
    imagesToRemove,
    postsLength,
  } = values

  useEffect(() => {
    getPost(match.params.id)
    getPostsLength()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!user) {
      history.push('/login')
    }
  }, [user, history])

  const submitHandler = async e => {
    e.preventDefault()
    for (let i = 0; i < imagesToRemove.length; i++) {
      deleteImage(imagesToRemove[i], user.token)
    }
    await submitForm(match.params.id, user.token, {
      sections,
      position: postsLength,
    })
    history.push('/admin')
  }

  const cancelHandler = async e => {
    e.preventDefault()
    setLoading(true)
    await cancelForm(
      window.location.search,
      user.token,
      match.params.id,
      sections,
      image
    )
    history.push('/admin')
  }

  const changeSection = async (newTitle, newText, newImage, sectionId) => {
    const urlParams = new URLSearchParams(window.location.search)
    const createPost = urlParams.get('create')
    if (!createPost && !sectionSaved) {
      const imageInDb = await checkImageInDatabase(image, match.params.id)
      if (image && !imageInDb) {
        deleteImage(image, user.token)
      }
    }
    setTitle(newTitle)
    setText(newText)
    setImage(newImage)
    setSectionId(sectionId)
  }

  return (
    <>
      <div className='form-container'>
        <div className='cancel-save-buttons'>
          <button onClick={cancelHandler} disabled={loading}>
            <h3>CANCEL</h3>
          </button>
          <button onClick={submitHandler} disabled={loading || !sectionSaved}>
            <h3>PUBLISH</h3>
          </button>
        </div>
        <div className='section-previews'>
          {sections.map(section => (
            <SectionPreview
              key={section.sectionId}
              changeSection={changeSection}
              section={section}
              editPostScreen={true}
              editing={section.sectionId === sectionId ? true : false}
            />
          ))}
        </div>
        <PostSectionForm
          sections={sections}
          title={title}
          setTitle={setTitle}
          text={text}
          setText={setText}
          image={image}
          setImage={setImage}
          sectionId={sectionId}
          setSectionId={setSectionId}
          loading={loading}
          setLoading={setLoading}
          setSections={setSections}
          sectionSaved={sectionSaved}
          setSectionSaved={setSectionSaved}
          imagesToRemove={imagesToRemove}
          setImagesToRemove={setImagesToRemove}
          token={user.token}
        />
      </div>
    </>
  )
}

export default EditPostScreen
