import React from 'react'
import './SectionPreview.css'

const SectionPreview = ({
  section,
  setTitle,
  setText,
  setImage,
  editPostScreen,
}) => {
  const { title, text, image } = section

  const selectSectionHandler = () => {
    setTitle(title)
    setText(text)
    setImage(image)
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
