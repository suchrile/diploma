import PostsService from '../../../services/posts.service'

export default defineEventHandler((event) => {
  const params = event.context.params!

  return PostsService.getComments(+params.id)
})
