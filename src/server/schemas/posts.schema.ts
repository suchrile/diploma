import joi from 'joi'
import { usersIdSchema } from './users.schema'

export const postIdSchema = joi.number().integer().positive()

const postImagesSchema = joi.array().items(
  joi.object({
    tempId: joi.any().strip().optional(),
    url: joi.string().dataUri().required()
  })
)

export const postCreateSchema = joi.object({
  authorId: usersIdSchema.required(),
  movieId: joi.number().integer().positive().required(),
  text: joi.string().required(),
  movieRating: joi.number().integer().positive().required(),
  users: joi.array().items(usersIdSchema).required(),
  images: postImagesSchema.optional()
}).required()
