export const userBackgroundPlaceholderUrl = new URL('/assets/images/user-background-placeholder-1.png', import.meta.url).href
export const imagePlaceholderUrl = 'https://yastatic.net/s3/kinopoisk-frontend/common-static/img/projector-logo/placeholder.svg'

export const minPasswordLength = 8
export const maxProfileDescriptionLength = 100
export const maxPostUsersLength = 3
export const usernameRegexp = /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])[a-zA-Z0-9-_.]+$/
export const usernameReservedWordsRegexp = /^(?!post$|new-post$|random$|edit$|login$|signup$|search$|movie$|person$).+$/
