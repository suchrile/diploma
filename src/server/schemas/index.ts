import joi from 'joi'

export const idSchema = joi.number().integer().positive()
export const usernameSchema = joi.string()

export const paginationSchema = joi.object({
  page: joi.number().integer().positive().optional(),
  limit: joi.number().integer().positive().optional()
})
