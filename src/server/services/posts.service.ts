import PostsRepository from '../repositories/posts.repository'
import CloudinaryService from './cloudinary.service'
import KinopoiskService from './kinopoisk.service'

class PostsService {
  private readonly _repository
  private readonly _cloudinaryService
  private readonly _kinopoiskService

  constructor () {
    this._repository = PostsRepository
    this._cloudinaryService = CloudinaryService
    this._kinopoiskService = KinopoiskService
  }

  async create (dto) {
    const images = []
    if (dto.images.length) {
      for (const image of dto.images) {
        const uploadedImage = await this._cloudinaryService.upload(image.url, '/posts')
        images.push({ publicId: uploadedImage.public_id, url: uploadedImage.secure_url })
      }
    }

    const [post] = await this._repository.create({
      authorId: dto.authorId,
      movieId: dto.movieId,
      text: dto.text,
      movieRating: dto.movieRating,
      users: dto.users,
      images
    })

    return post
  }

  update (id: number, dto) {
    return this._repository.update(id, dto)
  }

  async findOne (postId: number, userId: number) {
    const post = await this._repository.findOne(postId)
    const movie = await this._kinopoiskService.getMovieById(post.movieId)
    const likeRecord = await this._repository.findLikeRecord(postId, userId)
    return { ...post, movie, isLiked: !!likeRecord }
  }

  async findMany ({ authorId, userId, page = 1, limit = 3 }) {
    const [posts, total] = await this._repository.findMany({ authorId, page: page - 1, limit: +limit })
    const postIds = []
    const postMoviesIds = []
    posts.forEach((p) => {
      postIds.push(p.id)
      postMoviesIds.push(p.movieId)
    })
    const movies = await this._kinopoiskService.getMoviesByIds(postMoviesIds)
    const likeRecords = await this._repository.findLikeRecords(postIds, userId)
    const mapped = posts.map(post => ({
      ...post,
      movie: movies.find(m => m.id === post.movieId),
      isLiked: !!likeRecords.find(r => r.postId === post.id && r.userId === userId)
    }))
    return {
      docs: mapped,
      page: +page,
      limit: +limit,
      total
    }
  }

  deleteOne (id: number) {
    return this._repository.deleteOne(id)
  }

  like (postId: number, userId: number) {
    return this._repository.createLike(postId, userId)
  }

  unlike (postId: number, userId: number) {
    return this._repository.removeLike(postId, userId)
  }

  async createComment (postId: number, authorId: number, text: string) {
    const [comment] = await this._repository.createComment(postId, authorId, text)
    return comment
  }

  getComments (postId: number) {
    return this._repository.findComments(postId)
  }
}

export default new PostsService()
