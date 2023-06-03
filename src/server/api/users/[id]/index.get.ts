import UsersService from '../../../services/users.service'
import { usersUsernameSchema } from '../../../schemas/users.schema'

export default defineEventHandler((event) => {
  const userId = event.context.user.id

  const params = event.context.params!

  const { value: username, error } = usersUsernameSchema.validate(params.id)

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }

  return UsersService.findOneByUsername(username, userId)
})
