import React from 'react'
import { uploadImage, deleteImage } from '../../requests/EditPostRequests'

const PostSectionForm = ({
  sections,
  setSections,
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
      } else {
        alert('Post is already full')
        return
      }
    }
    setFont('Georgia')
    setTitle('')
    setText('')
    setImage('')
    setSectionId('')
    setSectionSaved(true)
  }

  const fontHandler = e => {
    setFont(e.target.value)
    setSectionSaved(false)
  }

  const titleHandler = e => {
    setTitle(e.target.value)
    setSectionSaved(false)
  }

  const textHandler = e => {
    setText(e.target.value)
    setSectionSaved(false)
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

  return (
    <>
      <form onSubmit={submitSectionHandler}>
        <button className='save-button' type='submit' disabled={loading}>
          <h3>SAVE</h3>
        </button>
        <br />
        <select
          name='font-select'
          className='font-select'
          value={font}
          onChange={fontHandler}>
          <option value='backout'>BackOut</option>
          <option value='cirrus-cumulus'>Cirrus Cumulus</option>
          <option value='cantiquenormal'>Cantique-Normal</option>
        </select>
        <br />
        <input
          name='title'
          size='50'
          id='title'
          placeholder='Title'
          value={title}
          onChange={titleHandler}></input>
        <br />
        <textarea
          name='text'
          rows='10'
          cols='50'
          id='text'
          placeholder='Text'
          value={text}
          onChange={textHandler}></textarea>
        <br />
        {image && !loading && (
          <button onClick={removeImageHandler} id='remove-img-button'>
            <h3>- REMOVE IMAGE</h3>
          </button>
        )}
        <div className='image-upload-container'>
          <label className='image-upload-btn'>
            {loading ? 'UPLOADING' : !image ? '+ ADD IMAGE' : '+ REPLACE IMAGE'}
            <input
              type='file'
              accept='image/png, image/jpg, image/jpeg'
              onChange={uploadHandler}
            />
          </label>
        </div>
        {image && !loading && (
          <div className='image-preview'>
            <img src={image} alt={title} />
          </div>
        )}
      </form>
    </>
  )
}

export default PostSectionForm
