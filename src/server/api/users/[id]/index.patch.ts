import UsersService from '../../../services/users.service'
import { usersUpdateSchema } from '../../../schemas/users.schema'

export default defineEventHandler(async (event) => {
  const params = event.context.params!
  const body = await readBody(event)

  const { value, error } = usersUpdateSchema.validate({ id: params.id, body })

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }

  const { id, body: dto } = value

  return UsersService.update(id, dto)
})
