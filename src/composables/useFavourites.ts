export const useFavourites = () => {
  const favourites = ref([])
  const page = ref(1)
  const limit = ref(15)
  const total = ref()
  const isLoading = ref(false)
  const isLoadingMore = ref(false)

  const fetchFavourites = async (username: string) => {
    if (favourites.value.length === total.value) { return }
    favourites.value.length ? isLoadingMore.value = true : isLoading.value = true
    const { data } = await useApiFetch(`/api/users/${username}/favourites`, { query: { page: page.value++, limit: limit.value } })
    if (data) {
      favourites.value.push(...data.docs)
      total.value = data.total
    }
    isLoading.value = false
    isLoadingMore.value = false
  }

  const addToFavourites = async (movieId: number) => {
    const { data } = await useApiFetch('/api/users/favourites', { method: 'POST', query: { movieId } })
    if (data) {
      return true
    }
  }

  const removeFromFavourites = async (movieId: number) => {
    const { data } = await useApiFetch('/api/users/favourites', { method: 'DELETE', query: { movieId } })
    if (data) {
      return false
    }
  }

  return { favourites, fetchFavourites, addToFavourites, removeFromFavourites, isLoading }
}
