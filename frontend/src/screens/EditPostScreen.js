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
    setFont,
    setTitle,
    setText,
    setImage,
    setSectionId,
    setLoading,
    setSectionSaved,
    setImageCleanupPublish,
    getPost,
    getPostsLength,
  } = useForm()
  const {
    sections,
    position,
    font,
    title,
    text,
    image,
    sectionId,
    loading,
    sectionSaved,
    imageCleanupPublish,
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
    const urlParams = new URLSearchParams(window.location.search)
    const createPost = urlParams.get('create')
    for (let i = 0; i < imageCleanupPublish.length; i++) {
      deleteImage(imageCleanupPublish[i], user.token)
    }
    await submitForm(match.params.id, user.token, {
      sections,
      position: createPost ? postsLength : position,
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

  const changeSection = async (
    newFont,
    newTitle,
    newText,
    newImage,
    sectionId
  ) => {
    const urlParams = new URLSearchParams(window.location.search)
    const createPost = urlParams.get('create')
    // When editing post, delete image only if image not in db
    if (image && !createPost && !sectionSaved) {
      const imageInDb = await checkImageInDatabase(image, match.params.id)
      if (!imageInDb) {
        deleteImage(image, user.token)
      }
      // When creating post, delete image if not saved
    } else if (createPost && !sectionSaved) {
      if (image) {
        let imageSaved = false
        for (let i = 0; i < sections.length; i++) {
          if (image === sections[i].image) {
            imageSaved = true
          }
        }
        if (!imageSaved) {
          deleteImage(image, user.token)
        }
      }
    }
    setFont(newFont)
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
          font={font}
          setFont={setFont}
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
          imageCleanupPublish={imageCleanupPublish}
          setImageCleanupPublish={setImageCleanupPublish}
          token={user.token}
        />
      </div>
    </>
  )
}

export default EditPostScreen
