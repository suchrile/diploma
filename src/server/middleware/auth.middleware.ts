import UrlPattern from 'url-pattern'
import JwtService from '../services/jwt.service'

export default defineEventHandler((event) => {
  const endpoints = [
    '/api/users',
    '/api/users/:username',
    '/api/users/me',
    '/api/users/follow/:id',
    '/api/users/unfollow/:id',
    '/api/users/follow/check',
    '/api/posts',
    '/api/posts/:id',
    '/api/posts/:id/like',
    '/api/posts/:id/unlike',
    '/api/posts/:id/comments',
    '/api/movies',
    '/api/movies/:id'
  ]

  const isHandledByThisMiddleware = endpoints.some((endpoint) => {
    const url = String(event.req.url).split('?')[0]
    const pattern = new UrlPattern(endpoint)
    return pattern.match(url)
  })
  if (!isHandledByThisMiddleware) {
    return
  }

  const accessToken = event.req.headers.authorization?.split(' ')[1]

  if (accessToken) {
    try {
      const { userId } = JwtService.decodeAccessToken(accessToken)
      event.context.user = { id: userId }
    } catch {
      event.context.user = null
    }
  } else {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }
})
