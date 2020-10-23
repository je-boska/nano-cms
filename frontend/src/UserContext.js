import React from 'react'
import { createContext, useReducer, useEffect } from 'react'

const UserContext = createContext(null)

const localUser = JSON.parse(sessionStorage.getItem('user'))

let reducer = (user, newUser) => {
  if (newUser === null) {
    sessionStorage.removeItem('user')
    return null
  }
  return { ...user, ...newUser }
}

const UserProvider = props => {
  const [user, setUser] = useReducer(reducer, localUser || null)

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
