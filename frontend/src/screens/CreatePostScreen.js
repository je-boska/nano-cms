import React, { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'

const CreatePostScreen = ({ history }) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const submitHandler = async e => {
    e.preventDefault()
    await axios.post('/api/posts', {
      title,
      text,
    })
    history.push('/admin')
  }

  return (
    <>
      <div className='form-container'>
        <form onSubmit={submitHandler}>
          <label htmlFor='title'>
            <h2>Title</h2>
          </label>
          <input
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
          <br></br>
          <button type='submit'>SUBMIT</button>
        </form>
      </div>
    </>
  )
}

export default CreatePostScreen
