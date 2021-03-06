import { useState } from 'react'
import { getAllPosts } from '../requests/AdminRequests'
import { getPostData } from '../requests/EditPostRequests'

const defaultValues = {
  sections: [
    {
      sectionId: 0,
    },
  ],
  sectionId: '',
  font: 'pyromaani',
  centered: false,
  title: '',
  text: '',
  image: '',
  color: '#FFFFFF',
  backgroundColor: '#000000',
  loading: false,
  sectionSaved: false,
  imageCleanupPublish: [],
  position: 0,
  postsLength: 0,
}

export default function useForm() {
  const [values, setValues] = useState(defaultValues)

  function setSections(sections) {
    setValues(prev => ({
      ...prev,
      sections,
    }))
  }

  function setFont(font) {
    setValues(prev => ({
      ...prev,
      font,
    }))
  }

  function setCentered(centered) {
    setValues(prev => ({
      ...prev,
      centered,
    }))
  }

  function setTitle(title) {
    setValues(prev => ({
      ...prev,
      title,
    }))
  }

  function setText(text) {
    setValues(prev => ({
      ...prev,
      text,
    }))
  }

  function setImage(image) {
    setValues(prev => ({
      ...prev,
      image,
    }))
  }

  function setColor(color) {
    setValues(prev => ({
      ...prev,
      color,
    }))
  }

  function setBackgroundColor(backgroundColor) {
    setValues(prev => ({
      ...prev,
      backgroundColor,
    }))
  }

  function setSectionId(sectionId) {
    setValues(prev => ({
      ...prev,
      sectionId,
    }))
  }

  function setLoading(loading) {
    setValues(prev => ({
      ...prev,
      loading,
    }))
  }

  function setSectionSaved(sectionSaved) {
    setValues(prev => ({
      ...prev,
      sectionSaved,
    }))
  }

  function setImageCleanupPublish(imageCleanupPublish) {
    setValues(prev => ({
      ...prev,
      imageCleanupPublish,
    }))
  }

  async function getPost(id) {
    const { sections, position } = await getPostData(id)
    setValues(prev => ({
      ...prev,
      sections,
      position,
    }))
  }

  async function getPostsLength() {
    const data = await getAllPosts()
    setValues(prev => ({
      ...prev,
      postsLength: data.length,
    }))
  }

  return {
    values,
    setSections,
    setFont,
    setCentered,
    setTitle,
    setText,
    setImage,
    setColor,
    setBackgroundColor,
    setSectionId,
    setLoading,
    setSectionSaved,
    setImageCleanupPublish,
    getPost,
    getPostsLength,
  }
}
