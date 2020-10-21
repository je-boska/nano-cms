import React, { useState, useEffect, useContext } from 'react'
import '../App.css'
import axios from 'axios'
import { UserContext } from '../UserContext'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user, setUser } = useContext(UserContext)

  const submitHandler = async e => {
    e.preventDefault()
    const loggedInUser = await axios.post(
      `/api/users/login`,
      {
        email,
        password,
      },
      config
    )
    sessionStorage.setItem('user', JSON.stringify(loggedInUser.data))
    setUser(loggedInUser.data)
  }

  useEffect(() => {
    if (user) {
      history.push('/admin')
    }
  }, [history, user])

  return (
    <>
      <div className='form-container'>
        <form onSubmit={submitHandler}>
          <label htmlFor='email'>
            <h2>Email</h2>
          </label>
          <input
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}></input>
          <label htmlFor='password'>
            <h2>Password</h2>
          </label>
          <input
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}></input>
          <br></br>
          <button type='submit'>
            <h3>LOG IN</h3>
          </button>
        </form>
      </div>
    </>
  )
}

export default LoginScreen
