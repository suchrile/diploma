export const useWishlist = () => {
  const wishlist = ref([])
  const page = ref(1)
  const limit = ref(15)
  const total = ref()
  const isLoading = ref(false)
  const isLoadingMore = ref(false)

  const fetchWishlist = async (username: string) => {
    if (wishlist.value.length === total.value) { return }
    wishlist.value.length ? isLoadingMore.value = true : isLoading.value = true
    const { data } = await useApiFetch(`/api/users/${username}/wishlist`, { query: { page: page.value++, limit: limit.value } })
    if (data) {
      wishlist.value.push(...data.docs)
      total.value = data.total
    }
    isLoading.value = false
    isLoadingMore.value = false
  }

  const addToWishlist = async (movieId: number) => {
    const { data } = await useApiFetch('/api/users/wishlist', { method: 'POST', query: { movieId } })
    if (data) {
      return true
    }
  }

  const removeFromWishlist = async (movieId: number) => {
    const { data } = await useApiFetch('/api/users/wishlist', { method: 'DELETE', query: { movieId } })
    if (data) {
      return false
    }
  }

  return { wishlist, fetchWishlist, addToWishlist, removeFromWishlist, isLoading }
}
