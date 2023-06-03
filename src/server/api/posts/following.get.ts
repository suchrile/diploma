import PostsService from '../../services/posts.service'

export default defineEventHandler((event) => {
  const userId = event.context.user.id
  const { page, limit } = getQuery(event)

  return PostsService.findPostsOfFollowing(userId, { page, limit })
})
