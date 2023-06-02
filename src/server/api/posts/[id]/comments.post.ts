import PostsService from '../../../services/posts.service'

export default defineEventHandler(async (event) => {
  const authorId = event.context.user.id
  const params = event.context.params!
  const { text } = await readBody(event)

  return PostsService.createComment(+params.id, authorId, text)
})
