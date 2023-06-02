import UsersService from '../../services/users.service'

export default defineEventHandler((event) => {
  const userId = event.context.user.id

  return UsersService.findOneById(userId)
})
