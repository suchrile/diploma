import PostsService from '../../../../services/posts.service'
import { idSchema } from '../../../../schemas'
import { postCommentCreateSchema } from '../../../../schemas/posts.schema'

export default defineEventHandler(async (event) => {
  const userId = event.context.user.id
  const params = event.context.params!
  const body = await readBody(event)

  const { value: postId, error: postIdError } = idSchema.validate(params.id)
  const { value: dto, error: dtoError } = postCommentCreateSchema.validate(body)

  if (postIdError || dtoError) {
    throw createError({
      statusCode: 400,
      message: postIdError?.message || dtoError?.message
    })
  }

  return PostsService.createComment(postId, userId, dto.text)
})
