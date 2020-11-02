import { useState } from 'react'
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
  imagesToRemove: [],
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

  function setImagesToRemove(imagesToRemove) {
    setValues(prev => ({
      ...prev,
      imagesToRemove,
    }))
  }

  async function getPost(id) {
    const { sections } = await getPostData(id)
    setValues(prev => ({
      ...prev,
      sections,
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
    setImagesToRemove,
    getPost,
  }
}
