import axios from 'axios'
import { deleteImage } from './EditPostRequests'

export async function createPost(token) {
  const {
    data: { _id },
  } = await axios.post(
    '/api/posts',
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return _id
}

export async function deletePost(token, id) {
  const post = await axios.get(`/api/posts/${id}`)
  const { sections } = post.data
  sections.forEach(section => {
    if (section.image) {
      deleteImage(section.image, token)
    }
  })
  await axios.delete(`/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function getAllPosts() {
  const { data } = await axios.get('/api/posts')
  const sortedData = data.sort((a, b) => (a.position < b.position ? 1 : -1))
  return sortedData
}
