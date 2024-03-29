import joi from 'joi'
import { maxProfileDescriptionLength, minPasswordLength, usernameRegexp, usernameReservedWordsRegexp } from '../../consts'

export const usersIdSchema = joi.number().integer().positive()
export const usersUsernameSchema = joi.string()

export const usersCreateSchema = joi.object({
  username: joi.string().lowercase().regex(usernameRegexp).regex(usernameReservedWordsRegexp).required(),
  password: joi.string().min(minPasswordLength).required(),
  firstname: joi.string().required(),
  lastname: joi.string().optional()
}).required()

export const usersUpdateSchema = joi.object({
  id: usersIdSchema.required(),
  body: joi.object({
    firstname: joi.string().required(),
    lastname: joi.string().min(0).allow(null).optional(),
    description: joi.string().min(0).max(maxProfileDescriptionLength).allow(null).optional(),
    images: joi.object({
      avatarUrl: joi.string().allow(null).optional(),
      backgroundUrl: joi.string().allow(null).optional()
    }).optional()
  })
}).required()
