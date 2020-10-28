import React from 'react'
import { uploadImage } from '../requests/EditRequests'

const PostForm = ({
  section,
  title,
  setTitle,
  text,
  setText,
  loading,
  image,
  setImage,
  setLoading,
  setUpdateImage,
  token,
}) => {
  const uploadHandler = async e => {
    setLoading(true)
    const imageUrl = await uploadImage(e.target.files[0], token)
    setImage(imageUrl)
    setUpdateImage(true)
    setLoading(false)
  }

  return (
    <>
      <label htmlFor='title'>
        <h2>Title</h2>
      </label>
      <input
        size='50'
        id='title'
        value={title}
        onChange={e => setTitle(e.target.value)}></input>
      <label htmlFor='text'>
        <h2>Text</h2>
      </label>
      <textarea
        rows='10'
        cols='50'
        id='text'
        value={text}
        onChange={e => setText(e.target.value)}></textarea>
      <br />
      <h2>Image</h2>
      {image && (
        <div className='img-container admin-thumbs'>
          <img src={image} alt={title} />
        </div>
      )}
      <div className='image-upload-container'>
        <label className='image-upload-btn'>
          {loading ? 'UPLOADING' : !image ? 'Choose file' : image}
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

export default PostForm
