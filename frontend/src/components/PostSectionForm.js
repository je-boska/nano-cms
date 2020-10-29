import React from 'react'
import { uploadImage, deleteImage } from '../requests/EditPostRequests'

const PostSectionForm = ({
  section,
  title,
  setTitle,
  text,
  setText,
  loading,
  image,
  setImage,
  setUpdateImage,
  setLoading,
  token,
}) => {
  const uploadHandler = async e => {
    setLoading(true)
    const imageUrl = await uploadImage(e.target.files[0], token)
    setImage(imageUrl)
    setUpdateImage(true)
    setLoading(false)
  }

  const removeImageHandler = e => {
    e.preventDefault()
    deleteImage(image, token)
    setImage('')
    setUpdateImage(false)
  }

  return (
    <>
      <h1>Section {section}</h1>
      <input
        size='50'
        id='title'
        value={title}
        placeholder='Title'
        onChange={e => setTitle(e.target.value)}></input>
      <br />
      <textarea
        rows='10'
        cols='50'
        id='text'
        value={text}
        placeholder='Text'
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
      <br />
    </>
  )
}

export default PostSectionForm
