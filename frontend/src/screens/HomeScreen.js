import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TwoLayout from '../components/TwoLayout/TwoLayout'
import ThreeLayout from '../components/ThreeLayout/ThreeLayout'

const HomeScreen = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/posts')
      setPosts(data)
    }
    getData()
  }, [])

  return (
    <>
      {posts.map(post => (
        <div key={post._id} className='post'>
          {post.sections.length === 2 ? (
            <TwoLayout post={post} />
          ) : post.sections.length === 3 ? (
            <ThreeLayout post={post} />
          ) : null}
        </div>
      ))}
    </>
  )
}

export default HomeScreen
