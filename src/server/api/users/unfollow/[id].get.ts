import FollowingService from '../../../services/following.service'
import { usersIdSchema } from '../../../schemas/users.schema'

export default defineEventHandler((event) => {
  const userId = event.context.user.id

  const params = event.context.params!

  const { value: followableId, error } = usersIdSchema.required().validate(params.id)

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }

  if (userId === followableId) {
    throw createError({
      statusCode: 400,
      message: 'Вы не можете отписаться сами от себя'
    })
  }

  return FollowingService.unfollow(userId, followableId)
})
