export const useUser = () => {
  const useUserData = () => useState('user_data', () => null)

  const setUserData = (data) => {
    const userData = useUserData()
    userData.value = data && { ...data, images: data.images || {} }
  }

  const getUserData = async () => {
    const { data } = await useApiFetch('/api/users/me')
    if (data) {
      setUserData(data)
    }
  }

  const updateUser = async ({ firstname, lastname, description, images }) => {
    const user = useUserData().value
    if (user) {
      const { data } = await useApiFetch('/api/users/' + user.id, {
        method: 'PATCH',
        body: { firstname, lastname, description, images }
      })
      if (data) {
        setUserData(data)
      }
    }
  }

  return { useUserData, getUserData, setUserData, updateUser }
}
