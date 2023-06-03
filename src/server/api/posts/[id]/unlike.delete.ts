import PostsService from '../../../services/posts.service'
import { idSchema } from '../../../schemas'

export default defineEventHandler(async (event) => {
  const userId = event.context.user.id
  const params = event.context.params!

  const { value: postId, error } = idSchema.validate(params.id)

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }

  return await PostsService.unlike(Number(postId), userId)
})
