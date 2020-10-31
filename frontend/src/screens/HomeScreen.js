import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './HomeScreen.css'

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
        <div className='post' key={post._id}>
          {post.sections.map(section => (
            <div key={section.sectionNumber} className='section'>
              {section.image && (
                <div>
                  <img src={section.image} alt={section.title} />
                </div>
              )}
              {section.title ||
                (section.text && (
                  <div className='section'>
                    {section.title && (
                      <div>
                        <h1>{section.title}</h1>
                      </div>
                    )}
                    {section.text && <p>{section.text}</p>}
                  </div>
                ))}
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default HomeScreen
