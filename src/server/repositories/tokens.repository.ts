import { prisma } from './index'

class TokensRepository {
  private readonly _repository

  constructor () {
    this._repository = prisma.refreshToken
  }

  create (userId: number, token: string) {
    return this._repository.create({ data: { userId, token } })
  }

  findOne (token: string) {
    return this._repository.findUnique({ where: { token } })
  }

  deleteOne (token: string) {
    return this._repository.delete({ where: { token } })
  }
}

export default new TokensRepository()
