import { useState } from 'react'
import { getPostData } from '../requests/EditPostRequests'

const defaultValues = {
  sections: 1,
  title: '',
  text: '',
  image: '',
  titleTwo: '',
  textTwo: '',
  imageTwo: '',
  updateImage: false,
  updateImageTwo: false,
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
  function setTitleTwo(titleTwo) {
    setValues(prev => ({
      ...prev,
      titleTwo,
    }))
  }

  function setTextTwo(textTwo) {
    setValues(prev => ({
      ...prev,
      textTwo,
    }))
  }

  function setImageTwo(imageTwo) {
    setValues(prev => ({
      ...prev,
      imageTwo,
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

  function setUpdateImageTwo(updateImageTwo) {
    setValues(prev => ({
      ...prev,
      updateImageTwo,
    }))
  }

  async function getPost(id) {
    const {
      sections,
      text,
      title,
      image,
      titleTwo,
      textTwo,
      imageTwo,
    } = await getPostData(id)
    setValues(prev => ({
      ...prev,
      sections,
      title,
      text,
      image,
      titleTwo,
      textTwo,
      imageTwo,
    }))
  }

  return {
    values,
    setSections,
    setTitle,
    setText,
    setImage,
    setTitleTwo,
    setTextTwo,
    setImageTwo,
    setLoading,
    setUpdateImage,
    setUpdateImageTwo,
    getPost,
  }
}
