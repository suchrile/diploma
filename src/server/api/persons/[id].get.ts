import KinopoiskService from '../../services/kinopoisk.service'
import { idSchema } from '../../schemas'

export default defineEventHandler((event) => {
  const params = event.context.params!

  const { value: personId, error } = idSchema.validate(params.id)

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }

  return KinopoiskService.getPerson(personId)
})
