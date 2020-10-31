import React from 'react'
import './ThreeLayout.css'

const ThreeLayout = ({ post }) => {
  return (
    <div className='post'>
      {post.sections.map(section => (
        <div key={section.sectionNumber} className='section three-layout'>
          {section.image && (
            <div>
              <img src={section.image} alt={section.title} />
            </div>
          )}
          {section.title || section.text ? (
            <div>
              {section.title ? <h1>{section.title}</h1> : null}
              {section.text ? <p>{section.text}</p> : null}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export default ThreeLayout
