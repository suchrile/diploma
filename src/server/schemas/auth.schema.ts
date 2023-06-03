import joi from 'joi'

export const authLoginSchema = joi.object({
  username: joi.string().lowercase().required(),
  password: joi.string().required()
}).required()
