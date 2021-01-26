export const isCreatePost = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const createPost = urlParams.get('create')
  return createPost
}
