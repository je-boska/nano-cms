import React from 'react'
import { UserProvider } from './UserContext'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import AdminScreen from './screens/AdminScreen'
import EditPostScreen from './screens/EditPostScreen'
import LoginScreen from './screens/LoginScreen'
import './App.css'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Route path='/' component={HomeScreen} exact />
          <UserProvider>
            <Route path='/login' component={LoginScreen} />
            <Route path='/admin' component={AdminScreen} exact />
            <Route path='/admin/edit/:id' component={EditPostScreen} />
          </UserProvider>
        </div>
      </Router>
    </>
  )
}

export default App
