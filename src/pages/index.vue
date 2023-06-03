<template>
  <div class="feed-page">
    <div v-if="posts.length" class="feed-page__content">
      <h1 class="feed-page__title">
        Лента
      </h1>
      <InfinityScroll class="feed-page__list" @trigger="fetchData">
        <PostView v-for="(post, index) in posts" :key="post.id" v-model="posts[index]" />
      </InfinityScroll>
    </div>
    <LoaderView v-else-if="isLoading" class="feed-page__loader" />
  </div>
</template>

<script setup lang="ts">

const posts = ref([])
const page = ref(1)
const total = ref()
const isLoading = ref(false)

onMounted(async () => {
  await fetchData()
})

const fetchData = async () => {
  if (posts.value.length === total.value) { return }
  isLoading.value = true
  const { data } = await useApiFetch('/api/posts', { query: { page: page.value++ } })
  if (data) {
    total.value = data.total
    posts.value = [...posts.value, ...data.docs]
  }
  isLoading.value = false
}

definePageMeta({
  footer: true
})

useHead({
  title: 'Лента'
})

</script>

<style scoped lang="scss">
.feed-page {
  height: 100%;
  &__title {
    margin: 20px 0 10px;
  }
  &__list {
    padding-bottom: 30px;
  }
  &__loader {
    height: 100%;
  }
}
</style>
