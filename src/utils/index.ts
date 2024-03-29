export const removeHtml = (value: string) => {
  return value.replace(/<[^>]*>/g, '')
}

export const getAvatarPlaceholder = (name: string) => {
  return `https://ui-avatars.com/api?name=${name}&bold=true&size=256&background=random&rounded=true`
}

export const capitalizeFirstCharacter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
