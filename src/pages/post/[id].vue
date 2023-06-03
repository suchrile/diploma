<template>
  <div class="post-page">
    <LoaderView v-if="isLoading" />
    <div v-else-if="post" class="post-page__content">
      <PostView v-model="post" show-delete-button @delete="deletePost" />
      <PostComments v-model="post" />
    </div>
    <UiNotFound v-else text="Пост не найден" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { setTitle } = useHeader()
const { useUserData } = useUser()
const user = useUserData()

const post = ref()
const isLoading = ref(false)

onMounted(async () => {
  await fetchPost()
})

const deletePost = async () => {
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
  height: 100%;
  &__content {
    padding-bottom: 150px;
  }
}
</style>
