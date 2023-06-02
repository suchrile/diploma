import UsersRepository from './users.repository'
import { prisma } from './index'

class FollowingRepository {
  private readonly _repository
  private readonly _usersRepository

  constructor () {
    this._repository = prisma.usersOnUsers
    this._usersRepository = UsersRepository
  }

  create (followerId: number, followableId: number) {
    return prisma.$transaction([
      this._repository.create({ data: { followerId, followableId } }),
      this._usersRepository.incrementField(followerId, 'followingCount'),
      this._usersRepository.incrementField(followableId, 'followersCount')
    ])
  }

  findRelation (followerId: number, followableId: number) {
    return this._repository.findUnique({ where: { followerId_followableId: { followerId, followableId } } })
  }

  findManyFollowers (followableId: number) {
    return this._repository.findMany({ where: { followableId }, include: { follower: true } })
  }

  findManyFollowing (followerId: number) {
    return this._repository.findMany({ where: { followerId }, include: { followable: true } })
  }

  delete (followerId: number, followableId: number) {
    return prisma.$transaction([
      this._repository.delete({ where: { followerId_followableId: { followerId, followableId } } }),
      this._usersRepository.decrementField(followerId, 'followingCount'),
      this._usersRepository.decrementField(followableId, 'followersCount')
    ])
  }
}

export default new FollowingRepository()
