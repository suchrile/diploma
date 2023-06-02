<template>
  <div class="wishlist-page">
    <div v-if="wishlist.length" class="wishlist-page__content">
      <MovieCard v-for="movie in wishlist" :key="movie.id" :movie="movie" />
    </div>
    <LoaderView v-else-if="isLoading" class="wishlist-page__loader" />
    <div v-else class="wishlist-page__empty">
      Тут пока пусто
    </div>
  </div>
</template>

<script setup lang="ts">

const route = useRoute()
const { setTitle } = useHeader()

const wishlist = ref([])
const isLoading = ref(true)

onMounted(async () => {
  setTitle('Желаемое')
  await fetchFollowers()
})

const fetchFollowers = async () => {
  isLoading.value = true
  const { data } = await useApiFetch(`/api/users/${route.params.username}/wishlist`)
  if (data) {
    wishlist.value = data
  }
  isLoading.value = false
}

definePageMeta({
  header: true,
  footer: true
})

</script>

<style scoped lang="scss">
.wishlist-page {
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
