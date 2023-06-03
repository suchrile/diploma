import FollowingService from '../../../services/following.service'
import { usersIdSchema } from '../../../schemas/users.schema'

export default defineEventHandler((event) => {
  const userId = event.context.user.id

  const query = getQuery(event)

  const { value: followableId, error } = usersIdSchema.required().validate(query.id)

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }

  return FollowingService.checkFollow(userId, followableId)
})
