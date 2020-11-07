import React from 'react'
import './SectionPreview.css'

const SectionPreview = ({
  section,
  changeSection,
  editing,
  editPostScreen,
}) => {
  const { font, title, text, image, sectionId } = section

  const selectSectionHandler = () => {
    if (editPostScreen) {
      changeSection(font, title, text, image, sectionId)
    }
  }

  return (
    <div
      className={`section-preview ${editing && 'editing'}`}
      onClick={selectSectionHandler}
      style={editPostScreen && { cursor: 'pointer' }}>
      {image && <img src={image} alt={title}></img>}
      {title ? (
        <div className='preview-title-text'>
          <h5 style={{ fontFamily: font }}>{title}</h5>
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
