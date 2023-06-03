import UsersService from '../../../services/users.service'
import { usersIdSchema } from '../../../schemas/users.schema'

export default defineEventHandler((event) => {
  const params = event.context.params!

  const { value: id, error } = usersIdSchema.validate(params.id)

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }

  return UsersService.deleteOne(id)
})
