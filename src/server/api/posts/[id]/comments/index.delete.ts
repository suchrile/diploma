import PostsService from '../../../../services/posts.service'

export default defineEventHandler((event) => {
  const userId = event.context.user.id
  const params = event.context.params!
  const query = getQuery(event)

  return PostsService.deleteComment(+query.id, +params.id, userId)
})
