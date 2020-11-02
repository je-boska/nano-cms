import React, { useEffect } from 'react'
import { uploadImage, deleteImage } from '../../requests/EditPostRequests'

const PostSectionForm = ({
  sections,
  title,
  setTitle,
  text,
  setText,
  image,
  setImage,
  loading,
  setLoading,
  setSections,
  token,
  cleanupImage,
  setSectionSaved,
}) => {
  /*
  useEffect(() => {
    if (image && cleanupImage) {
      deleteImage(image, token)
    }
  }, [image, token])
  */
  const submitSectionHandler = e => {
    e.preventDefault()
    if (sections.length < 4) {
      setSections([
        ...sections,
        {
          sectionNumber: Math.random().toString(36).substring(2, 9),
          title,
          text,
          image,
        },
      ])
      setTitle('')
      setText('')
      setImage('')
      setSectionSaved(true)
    } else {
      alert('Post is already full')
    }
  }

  const uploadHandler = async e => {
    setLoading(true)
    const imageUrl = await uploadImage(e.target.files[0], token)
    setImage(imageUrl)
    setLoading(false)
  }

  const removeImageHandler = e => {
    e.preventDefault()
    deleteImage(image, token)
    setImage('')
  }

  return (
    <>
      <form onSubmit={submitSectionHandler}>
        <button type='submit' disabled={loading}>
          <h3>SAVE</h3>
        </button>
        <br />
        <input
          size='50'
          id='title'
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}></input>
        <br />
        <textarea
          rows='10'
          cols='50'
          id='text'
          placeholder='Text'
          value={text}
          onChange={e => setText(e.target.value)}></textarea>
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
