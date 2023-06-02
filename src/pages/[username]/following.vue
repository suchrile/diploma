<template>
  <div class="following-page">
    <div v-if="following.length" class="following-page__content">
      <UserCard v-for="follower in following" :key="follower.username" :user="follower" />
    </div>
    <LoaderView v-else-if="isLoading" class="following-page__loader" />
    <div v-else class="following-page__empty">
      Подписок пока нет
    </div>
  </div>
</template>

<script setup lang="ts">

const route = useRoute()
const { setTitle } = useHeader()

const following = ref([])
const isLoading = ref(true)

onMounted(async () => {
  setTitle('Подписки')
  await fetchFollowers()
})

const fetchFollowers = async () => {
  isLoading.value = true
  const { data } = await useApiFetch(`/api/users/${route.params.username}/following`)
  if (data) {
    following.value = data
  }
  isLoading.value = false
}

definePageMeta({
  header: true,
  footer: true
})

</script>

<style scoped lang="scss">
.following-page {
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
