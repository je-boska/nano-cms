import { useState } from 'react'
import { getPostData } from '../requests/EditPostRequests'

const defaultValues = {
  sections: [{}],
  title: '',
  text: '',
  image: '',
  updateImage: false,
  loading: false,
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

  function setLoading(loading) {
    setValues(prev => ({
      ...prev,
      loading,
    }))
  }

  function setUpdateImage(updateImage) {
    setValues(prev => ({
      ...prev,
      updateImage,
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
    setLoading,
    setUpdateImage,
    getPost,
  }
}
