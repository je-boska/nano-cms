import React from 'react'
import './TwoLayout.css'

const TwoLayout = ({ post }) => {
  return (
    <>
      {post.sections.map(section => (
        <div key={section.sectionNumber} className='section two-layout'>
          {section.image && <img src={section.image} alt={section.title} />}
          {section.title || section.text ? (
            <div className='centered-text'>
              {section.title ? <h1>{section.title}</h1> : null}
              {section.text ? <p>{section.text}</p> : null}
            </div>
          ) : null}
        </div>
      ))}
    </>
  )
}

export default TwoLayout
