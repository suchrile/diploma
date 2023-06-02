import PostsService from '../../services/posts.service'

export default defineEventHandler((event) => {
  const userId = event.context.user.id
  const { authorId, page, limit } = getQuery(event)

  return PostsService.findMany({ authorId: authorId && Number(authorId), userId, page, limit })
})
