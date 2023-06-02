import UsersService from '../../services/users.service'

export default defineEventHandler((event) => {
  const userId = event.context.user.id
  const query = getQuery(event)

  return UsersService.findMany(query.query, userId, { page: query.page, limit: query.limit })
})
