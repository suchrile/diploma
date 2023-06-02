export default () => {
  const useAccessToken = () => useState<string | null>('access_token')
  const useAuthLoading = () => useState<boolean>('auth_loading', () => true)
  const route = useRoute()
  const { getUserData, setUserData } = useUser()

  const setToken = (token: string | null) => {
    const accessToken = useAccessToken()
    accessToken.value = token
  }

  const setIsAuthLoading = (value: boolean) => {
    const authLoading = useAuthLoading()
    authLoading.value = value
  }

  const signup = async (dto) => {
    setIsAuthLoading(true)
    try {
      const data = await $fetch<{ accessToken: string }>('/api/auth/signup', {
        method: 'POST',
        body: dto
      })
      setToken(data.accessToken)
      await getUserData()
      await navigateTo('/')
    } catch (error) {
      console.log(error)
    } finally {
      setIsAuthLoading(false)
    }
  }

  const login = async ({ username, password }: { username: string; password: string }) => {
    setIsAuthLoading(true)
    try {
      const data = await $fetch<{ accessToken: string }>('/api/auth/login', {
        method: 'POST',
        body: { username, password }
      })
      setToken(data.accessToken)
      await getUserData()
      await navigateTo('/')
    } catch (error) {
      console.log(error)
    } finally {
      setIsAuthLoading(false)
    }
  }

  const logout = async () => {
    await $fetch('/api/auth/logout')
    setToken(null)
    setUserData(null)
    await navigateTo('/login')
  }

  const refreshToken = async () => {
    const { accessToken } = await $fetch<{accessToken: string}>('/api/auth/refresh')
    setToken(accessToken)
  }

  const initAuth = async () => {
    setIsAuthLoading(true)
    try {
      await refreshToken()
      await getUserData()
      if (route.path.includes('login') || route.path.includes('signup')) {
        await navigateTo('/')
      }
    } catch (error) {
      if (!route.path.includes('login') && !route.path.includes('signup')) {
        await navigateTo({ path: '/login' })
      }
    } finally {
      setIsAuthLoading(false)
    }
  }

  return {
    login,
    signup,
    logout,
    initAuth,
    useAuthLoading,
    useAccessToken,
    refreshToken
  }
}
