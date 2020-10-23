import React, { useMemo, useState } from 'react'
import { UserProvider } from './UserContext'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import AdminScreen from './screens/AdminScreen'
import CreatePostScreen from './screens/CreatePostScreen'
import EditPostScreen from './screens/EditPostScreen'
import LoginScreen from './screens/LoginScreen'

function App() {
  const [user, setUser] = useState(null)

  const value = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <>
      <Router>
        <div className='container'>
          <Route path='/' component={HomeScreen} exact />
          <UserProvider value={value}>
            <Route path='/login' component={LoginScreen} />
            <Route path='/admin' component={AdminScreen} exact />
            <Route path='/admin/createpost' component={CreatePostScreen} />
            <Route path='/admin/edit/:id' component={EditPostScreen} />
          </UserProvider>
        </div>
      </Router>
    </>
  )
}

export default App
