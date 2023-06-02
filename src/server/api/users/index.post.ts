import UsersService from '../../services/users.service'
import { usersCreateSchema } from '../../schemas/users.schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { value: dto, error } = usersCreateSchema.validate(body)

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }

  return UsersService.create(dto)
})
