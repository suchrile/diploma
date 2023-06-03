import UsersService from '../../../services/users.service'
import { stringSchema } from '../../../schemas'

export default defineEventHandler((event) => {
  const params = event.context.params!

  const { value: username, error } = stringSchema.validate(params.id)

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }

  return UsersService.findFollowing(username)
})
