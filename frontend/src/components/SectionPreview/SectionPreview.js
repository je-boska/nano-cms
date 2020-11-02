import React from 'react'
import './SectionPreview.css'

const SectionPreview = ({ section, changeSection, editPostScreen }) => {
  const { title, text, image, sectionNumber } = section

  const selectSectionHandler = () => {
    if (editPostScreen) {
      changeSection(title, text, image, sectionNumber)
    }
  }

  return (
    <div
      className='section-preview'
      onClick={selectSectionHandler}
      style={editPostScreen && { cursor: 'pointer' }}>
      {image && <img src={image} alt={title}></img>}
      {title ? (
        <div className='preview-title-text'>
          <h5>{title}</h5>
        </div>
      ) : text ? (
        <div className='preview-title-text'>
          <p>{text}</p>
        </div>
      ) : null}
    </div>
  )
}

export default SectionPreview
