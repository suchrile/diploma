import UsersRepository from '../repositories/users.repository'
import UsersTransformer from '../transformers/users.transformer'
import { Pagination } from '../types'
import CloudinaryService from './cloudinary.service'
import KinopoiskService from './kinopoisk.service'

class UsersService {
  private readonly _repository
  private readonly _usersTransformer
  private readonly _cloudinaryService
  private readonly _kinopoiskService

  constructor () {
    this._repository = UsersRepository
    this._usersTransformer = UsersTransformer
    this._cloudinaryService = CloudinaryService
    this._kinopoiskService = KinopoiskService
  }

  async create (dto) {
    const user = await this._repository.create(dto)
    return this._usersTransformer.removeSensitive(user)
  }

  async update (id: number, dto) {
    let images
    if (dto.images) {
      const existingImages = await this._repository.findImagesById(id)
      images = {}
      if (dto.images.avatarUrl) {
        existingImages.avatarUrl && await this._cloudinaryService.remove(existingImages.avatarPublicId)
        const { public_id: publicId, secure_url: url } = await this._cloudinaryService.upload(dto.images.avatarUrl, '/users/avatars')
        images.avatarPublicId = publicId
        images.avatarUrl = url
      }
      if (dto.images.backgroundUrl) {
        existingImages?.backgroundUrl && await this._cloudinaryService.remove(existingImages.backgroundPublicId)
        const { public_id: publicId, secure_url: url } = await this._cloudinaryService.upload(dto.images.backgroundUrl, '/users/backgrounds')
        images.backgroundPublicId = publicId
        images.backgroundUrl = url
      }
    }
    const user = await this._repository.update(id, { ...dto, images })
    return this._usersTransformer.removeSensitive(user)
  }

  async findOneById (id: number) {
    const user = await this._repository.findOneById(id)
    return this._usersTransformer.removeSensitive(user)
  }

  async findOneByUsername (username: string, userId?: number) {
    const profile = await this._repository.findOneByUsername(username.toLowerCase())
    if (!userId) { return profile }
    const isFollowing = await this.checkFollow(userId, profile.id)
    return this._usersTransformer.removeSensitive({ ...profile, isFollowing })
  }

  findOneByUsernameForAuth (username: string) {
    return this._repository.findOneByUsernameForAuth(username)
  }

  async findMany (query: string, userId: number, { page = 1, limit = 20 }) {
    const [users, total] = await this._repository.findMany(query.toLowerCase(), { page, limit })
    const cleanUsers = users.reduce((acc, user) => {
      if (user.id === userId) { return acc }
      acc.push(this._usersTransformer.removeSensitive(user))
      return acc
    }, [])
    return {
      docs: cleanUsers,
      page,
      limit,
      total
    }
  }

  deleteOne (id: number) {
    return this._repository.deleteOne(id)
  }

  follow (followerId: number, followableId: number) {
    return this._repository.createFollowing(followerId, followableId)
  }

  unfollow (followerId: number, followableId: number) {
    return this._repository.deleteFollowing(followerId, followableId)
  }

  async checkFollow (followerId: number, followableId: number) {
    const relation = await this._repository.findFollowing(followerId, followableId)
    return !!relation
  }

  findFollowers (username: string) {
    return this._repository.findManyFollowers(username)
  }

  findFollowing (username: string) {
    return this._repository.findManyFollowing(username)
  }

  addToFavourites (userId: number, movieId: number) {
    return this._repository.createFavourite(userId, movieId)
  }

  async removeFromFavourites (userId: number, movieId: number) {
    const [favourite] = await this._repository.removeFavourite(userId, movieId)
    return favourite
  }

  async getFavourites (username: string, { page, limit }: Pagination) {
    const { favourites, _count } = await this._repository.findFavourites(username, { page, limit })
    const movieIds = favourites.map(f => f.movieId)
    const movies = await this._kinopoiskService.getMoviesByIds(movieIds)
    const mapped = favourites.map(f => ({ ...f, movie: movies.find(m => m.id === f.movieId) }))
    return { docs: mapped, page, limit, total: _count.favourites }
  }

  async addToWishlist (userId: number, movieId: number) {
    const [wishlist] = await this._repository.createWishlist(userId, movieId)
    return wishlist
  }

  async removeFromWishlist (userId: number, movieId: number) {
    const [wishlist] = await this._repository.removeWishlist(userId, movieId)
    return wishlist
  }

  async getWishlist (username: string, { page, limit = 15 }: Pagination) {
    const { wishlist, _count } = await this._repository.findWishlist(username, { page, limit })
    const movieIds = wishlist.map(el => el.movieId)
    const movies = await this._kinopoiskService.getMoviesByIds(movieIds)
    const mapped = wishlist.map(el => ({ ...el, movie: movies.find(m => m.id === el.movieId) }))
    return { docs: mapped, page, limit, total: _count.wishlist }
  }

  async checkIfMovieInFavourites (userId: number, movieId: number) {
    const record = await this._repository.findFavouritesRecord(userId, movieId)
    return !!record
  }

  async checkIfMovieInWishlist (userId: number, movieId: number) {
    const record = await this._repository.findWishlistRecord(userId, movieId)
    return !!record
  }
}

export default new UsersService()
