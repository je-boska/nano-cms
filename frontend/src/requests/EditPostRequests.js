import axios from 'axios'

export async function getPostData(id) {
  const post = await axios.get(`/api/posts/${id}`)
  const { sections } = post.data
  return { sections }
}

export async function uploadImage(image, token) {
  const formData = new FormData()
  formData.append('image', image)
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  }

  const { data } = await axios.post('/api/upload', formData, { headers })

  return data.data
}

export async function submitForm(id, token, data) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  await axios.put(`/api/posts/${id}`, data, { headers })
}

export function deleteImage(image, token) {
  const imageId = image.slice(-24, -4)
  axios.delete(`/api/upload/${imageId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function cancelForm(queryString, token, id, updateImage, image) {
  const urlParams = new URLSearchParams(queryString)
  const createPost = urlParams.get('create')
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  if (createPost) {
    await axios.delete(`/api/posts/${id}`, {
      headers,
    })
  }

  updateImage && deleteImage(image, token)
}
