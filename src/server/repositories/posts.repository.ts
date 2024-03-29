import { Pagination } from '../types'
import UsersRepository from './users.repository'
import { prisma } from './index'

class PostsRepository {
  private readonly _repository
  private readonly _likesRepository
  private readonly _commentsRepository
  private readonly _usersRepository

  constructor () {
    this._repository = prisma.post
    this._likesRepository = prisma.postLike
    this._commentsRepository = prisma.postComment
    this._usersRepository = UsersRepository
  }

  create (dto) {
    const userIdsToConnect = dto.users.map(uid => ({ id: uid }))
    return prisma.$transaction([
      this._repository.create({
        data: {
          author: { connect: { id: dto.authorId } },
          movieId: dto.movieId,
          text: dto.text,
          movieRating: dto.movieRating,
          users: { connect: [{ id: dto.authorId }, ...userIdsToConnect] },
          images: { createMany: { data: dto.images } }
        },
        select: { id: true }
      }),
      this._usersRepository.incrementField(dto.authorId, 'postsCount')
    ])
  }

  update (id: number, images) {
    return this._repository.update({
      where: { id },
      data: {
        images: { createMany: { data: images } }
      }
    })
  }

  findOne (id: number) {
    return this._repository.findUnique({
      where: { id },
      include: {
        users: {
          select: { id: true, username: true, images: { select: { avatarUrl: true } } }
        },
        images: {
          select: { id: true, url: true, publicId: true }
        }
      }
    })
  }

  async findPostsOfFollowing (userId: number, { page, limit }: Pagination) {
    const user = await this._usersRepository.findOneById(userId)
    const following = await this._usersRepository.findManyFollowing(user.username)
    const followingIds = following.map(u => u.id)
    return prisma.$transaction([
      this._repository.findMany({
        where: { authorId: { in: [userId, ...followingIds] } },
        include: { users: { select: { id: true, username: true, images: { select: { avatarUrl: true } } } }, images: true },
        take: limit,
        skip: page && limit && (page - 1) * limit,
        orderBy: { createdAt: 'desc' }
      }),
      this._repository.count({ where: { authorId: { in: [userId, ...followingIds] } } })
    ])
  }

  findMany ({ authorId, page, limit }) {
    return prisma.$transaction([
      this._repository.findMany({
        where: { authorId },
        include: { users: { select: { id: true, username: true, images: { select: { avatarUrl: true } } } }, images: true },
        take: limit,
        skip: page && limit && (page - 1) * limit,
        orderBy: { createdAt: 'desc' }
      }),
      this._repository.count({ where: { authorId } })
    ])
  }

  delete (postId: number, userId: number) {
    return prisma.$transaction([
      this._repository.delete({ where: { id: postId } }),
      this._usersRepository.decrementField(userId, 'postsCount')
    ])
  }

  createLike (postId: number, userId: number) {
    return prisma.$transaction([
      this._likesRepository.create({ data: { postId, userId } }),
      this.incrementField(postId, 'likesCount')
    ])
  }

  removeLike (postId: number, userId: number) {
    return prisma.$transaction([
      this._likesRepository.delete({ where: { postId_userId: { postId, userId } } }),
      this.decrementField(postId, 'likesCount')
    ])
  }

  findLikeRecord (postId: number, userId: number) {
    return this._likesRepository.findUnique({ where: { postId_userId: { postId, userId } } })
  }

  findLikeRecords (postIds: number[], userId: number) {
    return this._likesRepository.findMany({ where: { postId: { in: postIds }, userId } })
  }

  createComment (postId: number, authorId: number, text: string) {
    return prisma.$transaction([
      this._commentsRepository.create({
        data: { postId, authorId, text },
        select: {
          id: true,
          author: { select: { username: true, images: { select: { avatarUrl: true } } } },
          text: true,
          createdAt: true
        }
      }),
      this.incrementField(postId, 'commentsCount')
    ])
  }

  removeComment (commentId: number, postId: number) {
    return prisma.$transaction([
      this._commentsRepository.delete({ where: { id: commentId } }),
      this.decrementField(postId, 'commentsCount')
    ])
  }

  findComments (postId: number) {
    return this._commentsRepository.findMany({
      where: { postId },
      select: {
        id: true,
        author: { select: { username: true, images: { select: { avatarUrl: true } } } },
        text: true,
        createdAt: true
      }
    })
  }

  findComment (id: number) {
    return this._commentsRepository.findUnique({ where: { id } })
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
}

export default new PostsRepository()
