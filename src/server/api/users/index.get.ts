import UsersService from '../../services/users.service'
import { paginationSchema, stringSchema } from '../../schemas'

export default defineEventHandler((event) => {
  const userId = event.context.user.id
  const query = getQuery(event)

  const { value: searchQuery, error: searchQueryError } = stringSchema.required().validate(query.query)
  const { value: pagination, error: paginationError } = paginationSchema.validate({ page: query.page, limit: query.limit })

  if (searchQueryError || paginationError) {
    throw createError({
      statusCode: 400,
      message: searchQueryError?.message || paginationError?.message
    })
  }

  return UsersService.findMany(searchQuery, userId, pagination)
})
