import FollowingService from '../../../services/following.service'
import { usersIdSchema } from '../../../schemas/users.schema'

export default defineEventHandler((event) => {
  const user = event.context.user

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const query = getQuery(event)

  const { value: followableId, error } = usersIdSchema.required().validate(query.id)

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }

  return FollowingService.checkFollow(user.id, followableId)
})
