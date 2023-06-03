import PostsService from '../../services/posts.service'

export default defineEventHandler((event) => {
  const userId = event.context.user.id
  const params = event.context.params!

  return PostsService.delete(+params.id, userId)
})
