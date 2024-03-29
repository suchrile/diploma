export const useProfile = () => {
  const profile = ref()
  const isLoading = ref(false)

  const follow = async () => {
    const { data } = await useApiFetch('/api/users/follow/' + profile.value.id)
    if (data) {
      profile.value.isFollowing = true
      profile.value.followersCount++
    }
  }

  const unfollow = async () => {
    const { data } = await useApiFetch('/api/users/unfollow/' + profile.value.id)
    if (data) {
      profile.value.isFollowing = false
      profile.value.followersCount--
    }
  }

  const fetchProfile = async (username: string) => {
    isLoading.value = true
    const { data } = await useApiFetch('/api/users/' + username)
    if (data) {
      profile.value = data
    }
    isLoading.value = false
  }

  return { profile, follow, unfollow, fetchProfile, isLoading }
}
