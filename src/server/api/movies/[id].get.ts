import KinopoiskService from '../../services/kinopoisk.service'

export default defineEventHandler((event) => {
  const params = event.context.params!

  return KinopoiskService.getMovieById(Number(params.id))
})
