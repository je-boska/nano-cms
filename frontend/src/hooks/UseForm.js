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
  title: '',
  text: '',
  image: '',
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
    setTitle,
    setText,
    setImage,
    setSectionId,
    setLoading,
    setSectionSaved,
    setImageCleanupPublish,
    getPost,
    getPostsLength,
  }
}
