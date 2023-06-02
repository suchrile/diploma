<template>
  <div>
    <h1>Feed</h1>
    <InfinityScroll class="feed-page__list" @trigger="fetchData">
      <PostView v-for="(post, index) in posts" :key="post.id" v-model="posts[index]" />
    </InfinityScroll>
  </div>
</template>

<script setup lang="ts">

const posts = ref([])
const page = ref(1)
const total = ref()

const fetchData = async () => {
  if (posts.value.length === total.value) { return }
  const { data } = await useApiFetch('/api/posts', { query: { page: page.value++ } })
  total.value = data.total
  posts.value = [...posts.value, ...data.docs]
}

definePageMeta({
  footer: true
})

</script>

<style scoped lang="scss">
.feed-page {
  &__list {
    padding-bottom: 30px;
  }
}
</style>
