import React, { useEffect, useContext } from 'react'
import './EditPostScreen.css'
import { UserContext } from '../../UserContext'
import useForm from '../../hooks/UseForm'
import {
  submitForm,
  cancelForm,
  checkImageInDatabase,
  deleteImage,
} from '../../requests/EditPostRequests'
import PostSectionForm from '../../components/PostSectionForm/PostSectionForm'
import SectionPreview from '../../components/SectionPreview/SectionPreview'

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

  function isCreatePost() {
    const urlParams = new URLSearchParams(window.location.search)
    const createPost = urlParams.get('create')
    return createPost
  }

  const submitHandler = async e => {
    e.preventDefault()
    const createPost = isCreatePost()
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
    const createPost = isCreatePost()
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

  function addSectionHandler(e) {
    e.preventDefault()
    if (!sectionId && image) {
      deleteImage(image, user.token)
    }
    setSectionId('')
    setTitle('')
    setText('')
    setImage('')
    setSectionSaved(false)
  }

  function deleteSectionHandler(e) {
    e.preventDefault()
    if (sectionId) {
      const imageToRemove = sections.find(
        section => section.sectionId === sectionId
      ).image
      if (imageToRemove) {
        setImageCleanupPublish(imageCleanupPublish.concat(imageToRemove))
      }

      const newSections = sections.filter(
        section => section.sectionId !== sectionId
      )
      setSections(newSections)
      setSectionId('')
      setTitle('')
      setText('')
      setImage('')
      setSectionSaved(true)
    }
  }

  return (
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
            deleteSectionHandler={deleteSectionHandler}
            section={section}
            sections={sections}
            editPostScreen={true}
            editing={section.sectionId === sectionId ? true : false}
          />
        ))}
        {sections.length < 4 && (
          <button onClick={addSectionHandler} className='add-section-button'>
            <h3>+</h3>
          </button>
        )}
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
  )
}

export default EditPostScreen
