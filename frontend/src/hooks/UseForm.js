import { useState } from 'react'
import axios from 'axios'

const defaultValues = {
  title: '',
  text: '',
  image: '',
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
    const post = await axios.get(`/api/posts/${id}`)
    const { title, text, image } = post.data
    setValues(prev => ({
      ...prev,
      title,
      text,
      image,
    }))
  }

  return {
    values,
    setTitle,
    setText,
    setImage,
    setLoading,
    setUpdateImage,
    getPost,
  }
}
