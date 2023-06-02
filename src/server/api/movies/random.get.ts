import KinopoiskService from '../../services/kinopoisk.service'

export default defineEventHandler(() => {
  return KinopoiskService.getRandom()
})
