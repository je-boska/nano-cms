import { useState } from 'react'
import { getPostData } from '../requests/EditPostRequests'

const defaultValues = {
  sections: [
    {
      sectionNumber: 0,
    },
  ],
  sectionNumber: '',
  title: '',
  text: '',
  image: '',
  loading: false,
  sectionSaved: false,
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

  function setSectionNumber(sectionNumber) {
    setValues(prev => ({
      ...prev,
      sectionNumber,
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
    setSectionNumber,
    setLoading,
    setSectionSaved,
    getPost,
  }
}
