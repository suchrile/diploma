<template>
  <div class="followers-page">
    <div v-if="followers.length" class="followers-page__content">
      <UserCard v-for="follower in followers" :key="follower.username" :user="follower" />
    </div>
    <LoaderView v-else-if="isLoading" class="followers-page__loader" />
    <div v-else class="followers-page__empty">
      Подписчиков пока нет
    </div>
  </div>
</template>

<script setup lang="ts">

const route = useRoute()
const { setTitle } = useHeader()

const followers = ref([])
const isLoading = ref(true)

onMounted(async () => {
  setTitle('Подписчики')
  await fetchFollowers()
})

const fetchFollowers = async () => {
  isLoading.value = true
  const { data } = await useApiFetch(`/api/users/${route.params.username}/followers`)
  if (data) {
    followers.value = data
  }
  isLoading.value = false
}

definePageMeta({
  header: true,
  footer: true
})

</script>

<style scoped lang="scss">
.followers-page {
  height: 100%;
  &__content {
    padding: 10px 0 50px;
    & div:not(:last-child) {
      margin-bottom: 8px;
    }
  }
  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 15px;
    font-size: 17px;
    opacity: 0.5;
  }
}
</style>
