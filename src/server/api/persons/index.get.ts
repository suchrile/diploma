import KinopoiskService from '../../services/kinopoisk.service'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  return KinopoiskService.searchPersons(String(query.query))
})
