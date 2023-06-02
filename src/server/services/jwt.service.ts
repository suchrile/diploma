/* eslint-disable import/default, import/no-named-as-default-member */

import jwt from 'jsonwebtoken'
import UsersRepository from '../repositories/users.repository'
import TokensService from './tokens.service'

class JwtService {
  private readonly _accessTokenSecret
  private readonly _refreshTokenSecret
  private readonly _refreshTokensRepository
  private readonly _usersRepository

  constructor () {
    const config = useRuntimeConfig()
    this._accessTokenSecret = config.jwtAccessTokenSecret
    this._refreshTokenSecret = config.jwtRefreshTokenSecret
    this._refreshTokensRepository = TokensService
    this._usersRepository = UsersRepository
  }

  async generateTokens (userId: number) {
    const accessToken = this.generateAccessToken(userId)
    const refreshToken = await this.generateRefreshToken(userId)
    return { accessToken, refreshToken }
  }

  generateAccessToken (userId: number) {
    return jwt.sign({ userId }, this._accessTokenSecret, {
      expiresIn: '15m'
    })
  }

  async generateRefreshToken (userId: number) {
    const token = jwt.sign({ userId }, this._refreshTokenSecret, {
      expiresIn: '30d'
    })
    await this._refreshTokensRepository.create(userId, token)
    return token
  }

  async refreshAccessToken (refreshToken: string) {
    const tokenRecord = await this._refreshTokensRepository.findOne(
      refreshToken
    )
    if (!tokenRecord) {
      throw new Error('Refresh token not found')
    }
    const decodedRefreshToken = this.decodeRefreshToken(tokenRecord.token)
    if (
      !decodedRefreshToken ||
      typeof decodedRefreshToken !== 'object' ||
      !decodedRefreshToken.userId
    ) {
      throw new Error('Invalid refresh token')
    }
    const user = await this._usersRepository.findOneById(
      decodedRefreshToken.userId
    )
    if (!user) {
      throw new Error('User not found')
    }
    return this.generateAccessToken(user.id)
  }

  removeRefreshToken (refreshToken: string) {
    return this._refreshTokensRepository.deleteOne(refreshToken)
  }

  decodeAccessToken (accessToken: string) {
    return jwt.verify(accessToken, this._accessTokenSecret)
  }

  decodeRefreshToken (refreshToken: string) {
    return jwt.verify(refreshToken, this._refreshTokenSecret)
  }
}

export default new JwtService()
