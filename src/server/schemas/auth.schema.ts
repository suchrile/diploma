import joi from 'joi'

export const authLoginSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required()
}).required()
