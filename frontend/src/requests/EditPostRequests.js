import axios from 'axios'

export async function getPostData(id) {
  const post = await axios.get(`/api/posts/${id}`)
  const { sections, position } = post.data
  return { sections, position }
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

export async function submitForm(post, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  await axios.put(`/api/posts/${post._id}`, post, { headers })
}

export function deleteImage(image, token) {
  const imageId = image.slice(-24, -4)
  axios.delete(`/api/upload/${imageId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function checkImageInDatabase(image, id) {
  const data = await getPostData(id)
  const postImages = []
  data.sections.forEach(section => postImages.push(section.image))
  if (postImages.includes(image)) {
    return true
  } else {
    return false
  }
}
