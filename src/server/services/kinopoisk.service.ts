class KinopoiskService {
  private readonly _baseApiUrl
  private readonly _apiKey

  constructor () {
    const config = useRuntimeConfig()
    this._baseApiUrl = config.kinopoiskApiUrl
    this._apiKey = config.kinopoiskApiKey
  }

  getMovieById (id: number) {
    return this._get('/v1.3/movie/' + id)
  }

  async getMoviesByIds (ids: string[]) {
    const movies = await this._get('/v1.3/movie', { id: ids })
    return movies.docs
  }

  getRandom () {
    return this._get('/v1.3/movie/random')
  }

  async getPerson (id: number) {
    const person = await this._get('/v1/person/' + id)
    const movies = await this._get('/v1.3/movie', {
      'persons.id': id,
      selectFields: ['id name enName alternativeName poster'],
      limit: 30
    })
    return { ...person, movies: movies.docs }
  }

  searchMovies (query: string) {
    return this._get('/v1.2/movie/search', { query })
  }

  searchPersons (query: string) {
    return this._get('/v1.2/person/search', { query })
  }

  private _get (request: string, query = {}) {
    return $fetch(this._baseApiUrl + request, {
      headers: { 'X-API-KEY': this._apiKey },
      query
    })
  }
}

export default new KinopoiskService()
