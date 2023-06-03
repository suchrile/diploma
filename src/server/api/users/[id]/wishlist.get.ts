import UsersService from '../../../services/users.service'
import { paginationSchema } from '../../../schemas'

export default defineEventHandler((event) => {
  const { id: username } = event.context.params!
  const { page, limit } = getQuery(event)

  const { value: pagination, error } = paginationSchema.validate({ page, limit })

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }

  return UsersService.getWishlist(username, pagination)
})
