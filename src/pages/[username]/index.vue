<template>
  <div v-if="profile" class="profile-page">
    <ProfileHeader :profile="profile" @follow="follow" @unfollow="unfollow" />
    <InfinityScroll class="profile-page__posts" @trigger="fetchPosts">
      <PostView v-for="(post, index) in posts" :key="post.id" v-model="posts[index]" />
    </InfinityScroll>
  </div>

  <UiNotFound v-else-if="!isLoading" style="min-height: 100%" />
</template>

<script setup lang="ts">
const route = useRoute()
const { profile, follow, unfollow, fetchProfile } = useProfile()
const { posts, fetchUserPosts } = usePosts()

const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  await fetchProfile(String(route.params.username))
  isLoading.value = false

  useHead({ title: profile.value?.username })
})

const fetchPosts = () => {
  fetchUserPosts(profile.value.id)
}

definePageMeta({
  footer: true
})

</script>

<style scoped lang="scss">
.profile-page {
  padding-bottom: 30px;
  &__posts {
    margin-top: 10px;
  }
}
.page-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}
</style>
