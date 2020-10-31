import React from 'react'
import './SectionPreview.css'

const SectionPreview = ({ section }) => {
  const { title, image } = section

  return (
    <div className='section-preview'>
      {image && <img src={image} alt={title}></img>}
      {title && (
        <div className='preview-title'>
          <h5>{title}</h5>
        </div>
      )}
    </div>
  )
}

export default SectionPreview
