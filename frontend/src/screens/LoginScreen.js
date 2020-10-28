import React, { useState, useEffect, useContext } from 'react'
import '../App.css'
import axios from 'axios'
import { UserContext } from '../UserContext'

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { user, setUser } = useContext(UserContext)

  const submitHandler = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(
        `/api/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      sessionStorage.setItem('user', data)
      setUser(data)
      setLoading(false)
    } catch (err) {
      setError(true)
      setLoading(false)
    }
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
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}></input>
          <br></br>
          {error && (
            <h3 className='error' style={{ color: 'red' }}>
              Invalid email or password
            </h3>
          )}
          <button type='submit' disabled={loading}>
            <h3>LOG IN</h3>
          </button>
        </form>
      </div>
    </>
  )
}

export default LoginScreen
