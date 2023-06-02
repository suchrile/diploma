import UsersService from '../../../services/users.service'

export default defineEventHandler((event) => {
  const params = event.context.params

  return UsersService.findFollowing(params.id)
})
