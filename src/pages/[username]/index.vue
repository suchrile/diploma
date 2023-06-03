<template>
  <div v-if="profile" class="profile-page">
    <ProfileHeader :profile="profile" @follow="follow" @unfollow="unfollow" />
    <InfinityScroll v-if="posts.length" class="profile-page__posts" @trigger="fetchPosts">
      <PostView v-for="(post, index) in posts" :key="post.id" v-model="posts[index]" @delete="deletePost(post.id)" />
    </InfinityScroll>
    <LoaderView v-else-if="isPostsLoading" class="profile-page__posts-loader" />
    <div v-else class="profile-page__empty">
      Постов пока нет
    </div>
  </div>
  <LoaderView v-else-if="isProfileLoading" />
  <UiNotFound v-else />
</template>

<script setup lang="ts">
import { capitalizeFirstCharacter } from '~/utils'

const route = useRoute()
const { profile, follow, unfollow, fetchProfile, isLoading: isProfileLoading } = useProfile()
const { posts, fetchUserPosts, isLoading: isPostsLoading } = usePosts()

onMounted(async () => {
  await fetchProfile(String(route.params.username))
  await fetchPosts()

  useHead({ title: capitalizeFirstCharacter(profile.value?.username) })
})

const deletePost = async (id: number) => {
  const { data } = await useApiFetch(`/api/posts/${id}`, { method: 'DELETE' })
  if (data) {
    posts.value = posts.value.filter(p => p.id !== id)
  }
}

const fetchPosts = () => {
  fetchUserPosts(profile.value.id)
}

definePageMeta({
  footer: true
})

</script>

<style scoped lang="scss">
.profile-page {
  height: 100%;
  &__posts {
    margin-top: 10px;
    padding-bottom: 50px;
  }
  &__posts-loader {
    height: calc(100% - 400px);
  }
  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 400px);
    padding: 0 15px;
    font-size: 17px;
    opacity: 0.5;
  }
}
</style>
