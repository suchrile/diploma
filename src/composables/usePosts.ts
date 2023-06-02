export const usePosts = () => {
  const posts = ref([])
  const page = ref(1)
  const limit = ref(10)
  const total = ref()
  const isLoading = ref(false)

  const fetchUserPosts = async (userId: number) => {
    if (posts.value.length === total.value) { return }
    isLoading.value = true
    const { data } = await useApiFetch<Object>('/api/posts', {
      query: {
        authorId: userId,
        page: page.value++,
        limit: limit.value
      }
    })
    if (data) {
      posts.value.push(...data.docs)
      total.value = data.total
    }
    isLoading.value = false
  }

  return { posts, fetchUserPosts, isLoading }
}
