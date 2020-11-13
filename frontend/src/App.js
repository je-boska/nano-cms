import React from 'react'
import { UserProvider } from './UserContext'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import AdminScreen from './screens/AdminScreen/AdminScreen'
import EditPostScreen from './screens/EditPostScreen/EditPostScreen'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Route path='/' component={HomeScreen} exact />
        <UserProvider>
          <Route path='/login' component={LoginScreen} />
          <Route path='/admin' component={AdminScreen} exact />
          <Route path='/admin/edit/:id' component={EditPostScreen} />
        </UserProvider>
      </Router>
    </>
  )
}

export default App
