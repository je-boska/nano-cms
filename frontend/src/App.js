import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import AdminScreen from './screens/AdminScreen'

function App() {
  return (
    <>
      <Router>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/admin' component={AdminScreen} />
      </Router>
    </>
  )
}

export default App
