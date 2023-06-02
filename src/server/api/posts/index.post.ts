import PostsService from '../../services/posts.service'
import { postCreateSchema } from '../../schemas/posts.schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { value: dto, error } = postCreateSchema.validate(body)

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }

  return PostsService.create(dto)
})
