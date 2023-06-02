import FollowingRepository from '../repositories/following.repository'
import UsersService from './users.service'

class FollowingService {
  private readonly _repository
  private readonly _usersService

  constructor () {
    this._repository = FollowingRepository
    this._usersService = UsersService
  }

  follow (followerId: number, followableId: number) {
    return this._repository.create(followerId, followableId)
  }

  unfollow (followerId: number, followableId: number) {
    return this._repository.delete(followerId, followableId)
  }

  async checkFollow (followerId: number, followableId: number) {
    const relation = await this._repository.findRelation(followerId, followableId)
    return !!relation
  }

  findFollowers (followableId: number) {
    return this._repository.findManyFollowers(followableId)
  }

  findFollowing (followerId: number) {
    return this._repository.findManyFollowing(followerId)
  }
}

export default new FollowingService()
