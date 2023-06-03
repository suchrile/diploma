import MoviesService from '../../services/movies.service'
import { idSchema } from '../../schemas'

export default defineEventHandler((event) => {
  const userId = event.context.user.id
  const params = event.context.params!

  const { value: movieId, error } = idSchema.validate(params.id)

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }

  return MoviesService.getOne(movieId, userId)
})
