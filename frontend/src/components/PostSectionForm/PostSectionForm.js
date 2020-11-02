import React from 'react'
import { uploadImage, deleteImage } from '../../requests/EditPostRequests'

const PostSectionForm = ({
  sections,
  title,
  setTitle,
  text,
  setText,
  image,
  setImage,
  sectionId,
  setSectionId,
  loading,
  setLoading,
  setSections,
  token,
  setSectionSaved,
  imagesToRemove,
  setImagesToRemove,
}) => {
  const submitSectionHandler = e => {
    e.preventDefault()
    if (sectionId) {
      const sectionToReplaceIndex = sections.findIndex(
        section => section.sectionId === sectionId
      )
      const newSections = sections
      newSections[sectionToReplaceIndex] = {
        sectionId,
        title,
        text,
        image,
      }
      setSections(newSections)
      setTitle('')
      setText('')
      setImage('')
      setSectionId('')
      setSectionSaved(true)
    } else {
      if (sections.length < 4) {
        setSections([
          ...sections,
          {
            sectionId: Math.random().toString(36).substring(2, 9),
            title,
            text,
            image,
          },
        ])

        setTitle('')
        setText('')
        setImage('')
        setSectionId('')
        setSectionSaved(true)
      } else {
        alert('Post is already full')
      }
    }
  }

  const uploadHandler = async e => {
    setLoading(true)
    const imageUrl = await uploadImage(e.target.files[0], token)
    setImage(imageUrl)
    setLoading(false)
    setSectionSaved(false)
  }

  function removeImageHandler(e) {
    e.preventDefault()
    deleteImage(image, token)
    setImage('')
  }

  function addSectionHandler(e) {
    e.preventDefault()
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
      setImagesToRemove(imagesToRemove.concat(imageToRemove))

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
    <>
      <form onSubmit={submitSectionHandler}>
        <button onClick={addSectionHandler}>
          <h3>+</h3>
        </button>
        <button onClick={deleteSectionHandler}>
          <h3>-</h3>
        </button>
        <button type='submit' disabled={loading}>
          <h3>SAVE</h3>
        </button>
        <br />
        <input
          size='50'
          id='title'
          placeholder='Title'
          value={title}
          onChange={e => {
            setTitle(e.target.value)
            setSectionSaved(false)
          }}></input>
        <br />
        <textarea
          rows='10'
          cols='50'
          id='text'
          placeholder='Text'
          value={text}
          onChange={e => {
            setText(e.target.value)
            setSectionSaved(false)
          }}></textarea>
        <br />
        {image && (
          <button onClick={removeImageHandler}>
            <h3>- REMOVE IMAGE</h3>
          </button>
        )}
        {image && (
          <div className='admin-thumbs'>
            <img src={image} alt={title} />
          </div>
        )}
        <div className='image-upload-container'>
          <label className='image-upload-btn'>
            {loading ? 'UPLOADING' : !image ? 'Choose image file' : image}
            <input
              type='file'
              accept='image/png, image/jpg, image/jpeg'
              onChange={uploadHandler}
            />
          </label>
        </div>
      </form>
    </>
  )
}

export default PostSectionForm
