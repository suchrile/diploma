class UsersTransformer {
  removeSensitive (user) {
    delete user.password
    return user
  }
}

export default new UsersTransformer()
