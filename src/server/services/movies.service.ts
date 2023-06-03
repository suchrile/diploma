import KinopoiskService from './kinopoisk.service'
import UsersService from './users.service'

class MoviesService {
  private readonly _kinopoiskService
  private readonly _usersService

  constructor () {
    this._kinopoiskService = KinopoiskService
    this._usersService = UsersService
  }

  async getOne (movieId: number, userId: number) {
    const movie = await this._kinopoiskService.getMovieById(movieId)
    const isMovieInWishlist = await this._usersService.checkIfMovieInWishlist(userId, movieId)
    const isMovieInFavourites = await this._usersService.checkIfMovieInFavourites(userId, movieId)
    return { ...movie, isInWishlist: isMovieInWishlist, isInFavourites: isMovieInFavourites }
  }
}

export default new MoviesService()
