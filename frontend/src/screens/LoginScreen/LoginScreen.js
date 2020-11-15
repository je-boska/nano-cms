import React, { useState, useEffect, useContext } from 'react'
import './LoginScreen.css'
import { UserContext } from '../../UserContext'
import { authUser } from '../../requests/LoginRequests'

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
      const data = await authUser(email, password)
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
            name='email'
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}></input>
          <label htmlFor='password'>
            <h2>Password</h2>
          </label>
          <input
            name='password'
            id='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}></input>
          <br />
          {error && <h3 className='error'>Invalid email or password</h3>}
          <br />
          <button className='login-button' type='submit' disabled={loading}>
            <h3>LOG IN</h3>
          </button>
        </form>
      </div>
    </>
  )
}

export default LoginScreen
