import React, { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'

const EditPostScreen = ({ match, history }) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const getPost = async () => {
    const post = await axios.get(`/api/posts/${match.params.id}`)
    const { title, text } = post.data
    setTitle(title)
    setText(text)
  }

  useEffect(() => {
    getPost()
  }, [])

  const submitHandler = async e => {
    e.preventDefault()
    await axios.put(`/api/posts/${match.params.id}`, {
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
          <button
            onClick={e => {
              e.preventDefault()
              history.push('/admin')
            }}>
            <h3>CANCEL</h3>
          </button>
          <button type='submit'>
            <h3>SAVE</h3>
          </button>
        </form>
      </div>
    </>
  )
}

export default EditPostScreen
