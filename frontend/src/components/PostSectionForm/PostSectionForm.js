import React from 'react'
import { uploadImage, deleteImage } from '../../requests/EditPostRequests'

const PostSectionForm = ({
  sections,
  font,
  setFont,
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
  imageCleanupPublish,
  setImageCleanupPublish,
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
        font,
        title,
        text,
        image,
      }
      setSections(newSections)
      setFont('Georgia')
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
            font,
            title,
            text,
            image,
          },
        ])
        setFont('Georgia')
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

  const fontHandler = e => {
    setFont(e.target.value)
  }

  const uploadHandler = async e => {
    if (image && !sectionId) {
      deleteImage(image, token)
    } else if (image && sectionId) {
      setImageCleanupPublish(imageCleanupPublish.concat(image))
    }
    setLoading(true)
    const imageUrl = await uploadImage(e.target.files[0], token)
    setImage(imageUrl)
    setLoading(false)
    setSectionSaved(false)
  }

  function removeImageHandler(e) {
    e.preventDefault()
    if (!sectionId) {
      deleteImage(image, token)
    } else {
      setImageCleanupPublish(imageCleanupPublish.concat(image))
    }
    setImage('')
  }

  function addSectionHandler(e) {
    e.preventDefault()
    if (!sectionId && image) {
      deleteImage(image, token)
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
      setImageCleanupPublish(imageCleanupPublish.concat(imageToRemove))

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
        <select className='font-select' value={font} onChange={fontHandler}>
          <option value='backout'>BackOut</option>
          <option value='cirrus-cumulus'>Cirrus Cumulus</option>
          <option value='cantiquenormal'>Cantique-Normal</option>
        </select>
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
        {image && !loading && (
          <button onClick={removeImageHandler}>
            <h3>- REMOVE IMAGE</h3>
          </button>
        )}
        {image && !loading && (
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
