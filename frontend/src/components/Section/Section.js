import React from 'react'
import './Section.css'

const Layout = ({ post, layout }) => {
  return (
    <>
      {post.sections.map(section => (
        <div key={section.sectionId} className={`section ${layout}`}>
          {section.image && <img src={section.image} alt={section.title} />}
          {section.title || section.text ? (
            <div className='centered-text'>
              {section.title ? (
                <h1 style={{ fontFamily: section.font }}>{section.title}</h1>
              ) : null}
              {section.text ? <p>{section.text}</p> : null}
            </div>
          ) : null}
        </div>
      ))}
    </>
  )
}

export default Layout
