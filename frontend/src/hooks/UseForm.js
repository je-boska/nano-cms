import { useState } from 'react'
import { getPostData } from '../requests/EditRequests'

const defaultValues = {
  title: '',
  text: '',
  image: '',
  titleTwo: '',
  textTwo: '',
  imageTwo: '',
  updateImage: false,
  loading: false,
}

export default function useForm() {
  const [values, setValues] = useState(defaultValues)

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

  async function getPost(id) {
    const {
      text,
      title,
      image,
      titleTwo,
      textTwo,
      imageTwo,
    } = await getPostData(id)
    setValues(prev => ({
      ...prev,
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
    setTitle,
    setText,
    setImage,
    setTitleTwo,
    setTextTwo,
    setImageTwo,
    setLoading,
    setUpdateImage,
    getPost,
  }
}
