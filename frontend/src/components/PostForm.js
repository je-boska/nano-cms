import React from 'react'

const PostForm = ({
  title,
  setTitle,
  text,
  setText,
  loading,
  image,
  uploadHandler,
}) => {
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
      <div className='image-upload-container'>
        <label htmlFor='image-upload' className='image-upload-btn'>
          {loading ? 'UPLOADING' : !image ? 'Choose file' : image}
          <input
            type='file'
            id='image-upload'
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
