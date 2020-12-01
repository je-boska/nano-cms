import React from 'react'
import './SectionPreview.css'

const SectionPreview = ({
  section,
  changeSection,
  deleteSectionHandler,
  editing,
  editPostScreen,
}) => {
  const { font, title, text, image, color, backgroundColor } = section

  const selectSectionHandler = () => {
    if (!editing && editPostScreen) {
      changeSection(section)
    }
  }

  return (
    <div
      className={`section-preview ${editing ? 'editing' : 'not-editing'} ${
        editPostScreen && 'edit-post-screen'
      }`}
      onClick={selectSectionHandler}
      style={{
        backgroundImage: image && `url(${image})`,
        backgroundColor: backgroundColor,
      }}
    >
      {title ? (
        <div className='preview-title-text'>
          <h5 style={{ fontFamily: font, color: color }}>{title}</h5>
        </div>
      ) : text ? (
        <div className='preview-title-text'>
          <p style={{ color: color }}>{text}</p>
        </div>
      ) : null}
      {editPostScreen && editing && (
        <button
          className='delete-section-button'
          onClick={deleteSectionHandler}
        >
          <h3>-</h3>
        </button>
      )}
    </div>
  )
}

export default SectionPreview
