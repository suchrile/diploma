import PostsService from '../../../../services/posts.service'
import { idSchema } from '../../../../schemas'

export default defineEventHandler((event) => {
  const params = event.context.params!

  const { value: postId, error } = idSchema.validate(params.id)

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }

  return PostsService.getComments(postId)
})
