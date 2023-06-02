import PostsService from '../../../services/posts.service'

export default defineEventHandler((event) => {
  const userId = event.context.user.id
  const { id: postId } = event.context.params!

  return PostsService.like(Number(postId), userId)
})
