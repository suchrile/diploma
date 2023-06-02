import PostsService from '../../../services/posts.service'

export default defineEventHandler(async (event) => {
  const userId = event.context.user.id
  const { id: postId } = event.context.params!

  return await PostsService.unlike(Number(postId), userId)
})
