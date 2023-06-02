import { prisma } from './index'

class UsersRepository {
  private readonly _repository
  private readonly _followingRepository
  private readonly _favouritesRepository
  private readonly _wishlistRepository

  constructor () {
    this._repository = prisma.user
    this._followingRepository = prisma.usersOnUsers
    this._favouritesRepository = prisma.userFavourite
    this._wishlistRepository = prisma.userWishlist
  }

  create (dto) {
    return this._repository.create({ data: dto })
  }

  update (id: number, dto) {
    return this._repository.update({
      where: { id },
      data: {
        images: {
          upsert: {
            update: dto.images,
            create: dto.images
          }
        }
      },
      include: { images: { select: { avatarUrl: true, backgroundUrl: true } } }
    })
  }

  findOneById (id: number) {
    return this._repository.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        firstname: true,
        lastname: true,
        description: true,
        images: { select: { avatarUrl: true, backgroundUrl: true } },
        followersCount: true,
        followingCount: true,
        postsCount: true,
        favouritesCount: true,
        viewedCount: true,
        wishlistCount: true
      }
    })
  }

  findOneByUsername (username: string) {
    return this._repository.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        firstname: true,
        lastname: true,
        description: true,
        images: { select: { avatarUrl: true, backgroundUrl: true } },
        followersCount: true,
        followingCount: true,
        postsCount: true,
        favouritesCount: true,
        viewedCount: true,
        wishlistCount: true
      }
    })
  }

  findOneByUsernameForAuth (username: string) {
    return this._repository.findUnique({
      where: { username },
      select: { id: true, password: true }
    })
  }

  findMany (query: string, { page, limit }) {
    return prisma.$transaction([
      this._repository.findMany({
        where: { username: { contains: query } },
        select: { username: true, firstname: true, lastname: true, images: { select: { avatarUrl: true } } },
        take: limit,
        skip: page - 1
      }),
      this._repository.count({ where: { username: { contains: query } } })
    ])
  }

  async findImagesById (id: number) {
    const user = await this._repository.findUnique({ where: { id }, select: { id: true, images: true } })
    return user?.images
  }

  deleteOne (id: number) {
    return this._repository.delete({ where: { id } })
  }

  incrementField (id: number, field: string) {
    return this._repository.update({
      where: { id },
      data: { [field]: { increment: 1 } }
    })
  }

  decrementField (id: number, field: string) {
    return this._repository.update({
      where: { id },
      data: { [field]: { decrement: 1 } }
    })
  }

  createFollowing (followerId: number, followableId: number) {
    return prisma.$transaction([
      this._followingRepository.create({ data: { followerId, followableId } }),
      this.incrementField(followerId, 'followingCount'),
      this.incrementField(followableId, 'followersCount')
    ])
  }

  findFollowing (followerId: number, followableId: number) {
    return this._followingRepository.findUnique({ where: { followerId_followableId: { followerId, followableId } } })
  }

  async findManyFollowers (username: string) {
    const user = await this._repository.findUnique({
      where: { username },
      select: {
        followers: {
          select: {
            followable: {
              select: { username: true, firstname: true, lastname: true, images: { select: { avatarUrl: true } } }
            }
          }
        }
      }
    })
    return user?.followers.map(f => f.followable)
  }

  async findManyFollowing (username: string) {
    const user = await this._repository.findUnique({
      where: { username },
      select: {
        following: {
          select: {
            follower: {
              select: { username: true, firstname: true, lastname: true, images: { select: { avatarUrl: true } } }
            }
          }
        }
      }
    })
    return user?.following.map(f => f.follower)
  }

  deleteFollowing (followerId: number, followableId: number) {
    return prisma.$transaction([
      this._followingRepository.delete({ where: { followerId_followableId: { followerId, followableId } } }),
      this.decrementField(followerId, 'followingCount'),
      this.decrementField(followableId, 'followersCount')
    ])
  }

  createFavourite (userId: number, movieId: number) {
    return this._favouritesRepository.create({ data: { userId, movieId } })
  }

  findFavourites (userId: number) {
    return this._favouritesRepository.findMany({ where: { userId } })
  }

  createWishlist (userId: number, movieId: number) {
    return this._wishlistRepository.create({ data: { userId, movieId } })
  }

  findWishlist (username: string) {
    return this._repository.findUnique({
      where: { username },
      select: { wishlist: true }
    })
  }
}

export default new UsersRepository()
