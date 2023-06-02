import PostsService from '../../../services/posts.service'

export default defineEventHandler(async (event) => {
  const userId = event.context.user.id
  const params = event.context.params!

  return await PostsService.findOne(+params.id, userId)
})
