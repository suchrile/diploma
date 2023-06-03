import PostsService from '../../../../services/posts.service'
import { idSchema } from '../../../../schemas'

export default defineEventHandler((event) => {
  const userId = event.context.user.id
  const params = event.context.params!
  const query = getQuery(event)

  const { value: postId, error: postIdError } = idSchema.validate(params.id)
  const { value: commentId, error: commentIdError } = idSchema.validate(query.id)

  if (postIdError || commentIdError) {
    throw createError({
      statusCode: 400,
      message: postIdError?.message || commentIdError?.message
    })
  }

  return PostsService.deleteComment(commentId, postId, userId)
})
