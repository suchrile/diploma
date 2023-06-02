import { hash, compare } from 'bcrypt'
import UsersTransformer from '../transformers/users.transformer'
import UsersService from './users.service'
import JwtService from './jwt.service'

class AuthService {
  protected readonly _jwtService
  protected readonly _usersService
  private readonly _usersTransformer

  constructor () {
    this._jwtService = JwtService
    this._usersService = UsersService
    this._usersTransformer = UsersTransformer
  }

  async signUp (dto) {
    const hashedPassword = await hash(dto.password, 7)
    await this._usersService.create({ ...dto, password: hashedPassword })
    return this.signIn({ username: dto.username, password: dto.password })
  }

  async signIn ({ username, password }) {
    const user = await this._usersService.findOneByUsernameForAuth(username)

    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Неправильное имя пользователя или пароль'
      })
    }

    const doesThePasswordMatch = await compare(password, user.password)

    if (!doesThePasswordMatch) {
      throw createError({
        statusCode: 401,
        message: 'Неправильное имя пользователя или пароль'
      })
    }

    const { accessToken, refreshToken } = await this._jwtService.generateTokens(user.id)

    return { accessToken, refreshToken }
  }

  signOut (refreshToken: string) {
    return this._jwtService.removeRefreshToken(refreshToken)
  }
}

export default new AuthService()
