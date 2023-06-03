import PostsService from '../../services/posts.service'
import { idSchema, paginationSchema } from '../../schemas'

export default defineEventHandler((event) => {
  const userId = event.context.user.id
  const query = getQuery(event)

  const { value: authorId, error: authorIdError } = idSchema.required().validate(query.authorId)
  const { value: pagination, error: paginationError } = paginationSchema.validate({ page: query.page, limit: query.limit })

  if (authorIdError || paginationError) {
    throw createError({
      statusCode: 400,
      message: authorIdError?.message || paginationError?.message
    })
  }

  return PostsService.findMany({ authorId, userId, ...pagination })
})
