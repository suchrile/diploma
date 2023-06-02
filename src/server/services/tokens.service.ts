import TokensRepository from '../repositories/tokens.repository'

class TokensService {
  private readonly _repository

  constructor () {
    this._repository = TokensRepository
  }

  create (userId: number, token: string) {
    return this._repository.create(userId, token)
  }

  findOne (token: string) {
    return this._repository.findOne(token)
  }

  deleteOne (token: string) {
    return this._repository.deleteOne(token)
  }
}

export default new TokensService()
