<template>
  <div v-if="post" class="post-page">
    <PostView v-model="post" @delete="removePost" />
    <PostComments v-model="post" />
  </div>

  <UiNotFound v-else-if="!isLoading && !post" text="Пост не найден" class="post-page__not-found" />
</template>

<script setup lang="ts">
const route = useRoute()
const { setTitle } = useHeader()
const { useUserData } = useUser()
const user = useUserData()

const post = ref()
const isLoading = ref(true)

onMounted(async () => {
  await fetchPost()
})

const removePost = async () => {
  const { data } = await useApiFetch(`/api/posts/${post.value.id}`, { method: 'DELETE' })
  if (data) {
    await navigateTo('/' + user.value.username)
  }
}

const fetchPost = async () => {
  isLoading.value = true
  const postId = route.params.id
  const { data } = await useApiFetch('/api/posts/' + postId)
  if (data) {
    post.value = data
    setHeaderTitle()
  }
  isLoading.value = false
}

const setHeaderTitle = () => {
  const author = post.value.users.find(user => user.id === post.value.authorId)
  setTitle(`Пост ${author.username}`)
}

definePageMeta({
  header: true
})

</script>

<style scoped lang="scss">
.post-page {
  padding-bottom: 150px;
}
</style>
