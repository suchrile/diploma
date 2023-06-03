import MoviesService from '../../services/movies.service'

export default defineEventHandler((event) => {
  const userId = event.context.user.id
  const params = event.context.params!

  return MoviesService.getOne(Number(params.id), userId)
})
