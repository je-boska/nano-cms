import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import AdminScreen from './screens/AdminScreen'
import CreatePostScreen from './screens/CreatePostScreen'
import EditPostScreen from './screens/EditPostScreen'

function App() {
  return (
    <>
      <Router>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/admin' component={AdminScreen} exact />
        <Route path='/admin/createpost' component={CreatePostScreen} />
        <Route path='/admin/edit/:id' component={EditPostScreen} />
      </Router>
    </>
  )
}

export default App
