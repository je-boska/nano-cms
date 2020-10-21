import React, { useContext, useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'
import { UserContext } from '../UserContext'

const CreatePostScreen = ({ history }) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const { user, setUser } = useContext(UserContext)

  const localUser = sessionStorage.getItem('user')

  useEffect(() => {
    setUser(localUser)

    if (!user) {
      history.push('/login')
    }
  }, [user, history, localUser, setUser])

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
          <button
            onClick={e => {
              e.preventDefault()
              history.push('/admin')
            }}>
            <h3>CANCEL</h3>
          </button>
          <button type='submit'>
            <h3>SUBMIT</h3>
          </button>
        </form>
      </div>
    </>
  )
}

export default CreatePostScreen
