import UsersService from '../../services/users.service'
import { idSchema } from '../../schemas'

export default defineEventHandler((event) => {
  const userId = event.context.user.id
  const query = getQuery(event)

  const { value: movieId, error } = idSchema.required().validate(query.movieId)

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }

  return UsersService.addToWishlist(userId, movieId)
})
