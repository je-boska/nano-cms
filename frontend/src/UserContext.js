import React from 'react'
import { createContext, useReducer, useEffect } from 'react'

const UserContext = createContext(null)

const localUser = JSON.parse(localStorage.getItem('user'))

let reducer = (user, newUser) => {
  if (newUser === null) {
    localStorage.removeItem('user')
    return null
  }
  return { ...user, ...newUser }
}

const UserProvider = props => {
  const [user, setUser] = useReducer(reducer, localUser || null)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
