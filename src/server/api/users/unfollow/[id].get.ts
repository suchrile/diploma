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

  const params = event.context.params!

  const { value: followableId, error } = usersIdSchema.required().validate(params.id)

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }

  if (user.id === followableId) {
    throw createError({
      statusCode: 400,
      message: 'Вы не можете отписаться сами от себя'
    })
  }

  return FollowingService.unfollow(user.id, followableId)
})
