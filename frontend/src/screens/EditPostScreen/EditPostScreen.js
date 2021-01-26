import React, { useEffect, useContext } from 'react'
import './EditPostScreen.css'
import { UserContext } from '../../UserContext'
import useForm from '../../hooks/UseForm'
import PostSectionForm from '../../components/PostSectionForm/PostSectionForm'
import SectionPreview from '../../components/SectionPreview/SectionPreview'
import { deletePost } from '../../requests/AdminRequests'
import {
  submitForm,
  checkImageInDatabase,
  deleteImage,
} from '../../requests/EditPostRequests'
import { isCreatePost } from '../../utils/utils'

const EditPostScreen = ({ match, history }) => {
  const { user } = useContext(UserContext)

  const {
    values,
    setSections,
    setFont,
    setCentered,
    setTitle,
    setText,
    setImage,
    setColor,
    setBackgroundColor,
    setSectionId,
    setLoading,
    setSectionSaved,
    setImageCleanupPublish,
    getPost,
    getPostsLength,
  } = useForm()

  const {
    sections,
    sectionId,
    position,
    image,
    postsLength,
    imageCleanupPublish,
    loading,
    sectionSaved,
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

  async function submitHandler(e) {
    e.preventDefault()
    const createPost = isCreatePost()
    imageCleanupPublish.forEach(image => deleteImage(image, user.token))
    await submitForm(
      {
        sections,
        position: createPost ? postsLength : position,
        _id: match.params.id,
      },
      user.token
    )
    history.push('/admin')
  }

  function deleteAllImages() {
    sections.forEach(section => {
      section.image && deleteImage(section.image, user.token)
    })
    if (image) {
      deleteImage(image, user.token)
    }
  }

  async function deleteAllImagesIfNotInDb() {
    sections.forEach(async section => {
      const imageInDb = await checkImageInDatabase(
        section.image,
        match.params.id
      )
      !imageInDb && deleteImage(section.image, user.token)
    })
    if (image) {
      const imageInDb = await checkImageInDatabase(image, match.params.id)
      !imageInDb && deleteImage(image, user.token)
    }
  }

  async function cancelHandler(e) {
    e.preventDefault()
    setLoading(true)
    const createPost = isCreatePost()
    if (createPost) {
      deleteAllImages()
      await deletePost(user.token, match.params.id)
    } else {
      deleteAllImagesIfNotInDb()
    }
    history.push('/admin')
  }

  async function changeSectionHandler(section) {
    const imageInDb = await checkImageInDatabase(image, match.params.id)
    const imageSaved = checkImageSaved()
    if (image && !imageInDb && !imageSaved) {
      deleteImage(image, user.token)
    }
    setFormToSection(section)
  }

  function checkImageSaved() {
    let imageSaved = false
    sections.forEach(section => {
      if (image === section.image) {
        imageSaved = true
      }
    })
    return imageSaved
  }

  function setFormToSection(section) {
    setFont(section.font)
    setCentered(section.centered)
    setTitle(section.title)
    setText(section.text)
    setImage(section.image)
    setColor(section.color)
    setBackgroundColor(section.backgroundColor)
    setSectionId(section.sectionId)
  }

  function resetForm() {
    setSectionId('')
    setCentered(false)
    setTitle('')
    setText('')
    setImage('')
    setColor('#FFFFFF')
    setBackgroundColor('#000000')
  }

  function addSectionHandler(e) {
    e.preventDefault()
    if (!sectionId && image) {
      deleteImage(image, user.token)
    }
    resetForm()
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
      resetForm()
      setSectionSaved(true)
    }
  }

  return (
    <div className='form-container'>
      <div className='cancel-publish-buttons'>
        <button
          className='cancel-button'
          onClick={cancelHandler}
          disabled={loading}>
          <h3>CANCEL</h3>
        </button>
        <button
          className='publish-button'
          onClick={submitHandler}
          disabled={loading || !sectionSaved}>
          <h3>PUBLISH</h3>
        </button>
      </div>
      <div className='section-previews'>
        {sections.map(section => (
          <SectionPreview
            key={section.sectionId}
            changeSection={changeSectionHandler}
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
        values={values}
        setFont={setFont}
        setCentered={setCentered}
        setTitle={setTitle}
        setText={setText}
        setImage={setImage}
        setColor={setColor}
        setBackgroundColor={setBackgroundColor}
        setSectionId={setSectionId}
        setLoading={setLoading}
        setSections={setSections}
        sectionSaved={sectionSaved}
        setSectionSaved={setSectionSaved}
        setImageCleanupPublish={setImageCleanupPublish}
        token={user.token}
      />
    </div>
  )
}

export default EditPostScreen
