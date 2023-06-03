<template>
  <div class="wishlist-page">
    <LoaderView v-if="isLoading" />
    <div v-else-if="wishlist.length" class="wishlist-page__content">
      <InfinityScroll class="wishlist-page__content" @trigger="loadWishlist">
        <MovieCard v-for="movie in wishlist" :key="movie.id" :movie="movie.movie" />
      </InfinityScroll>
    </div>
    <div v-else class="wishlist-page__empty">
      Тут пока пусто
    </div>
  </div>
</template>

<script setup lang="ts">

const route = useRoute()
const { setTitle } = useHeader()
const { wishlist, fetchWishlist, isLoading } = useWishlist()

onMounted(async () => {
  setTitle('Желаемое')
  await loadWishlist()
})

const loadWishlist = async () => {
  await fetchWishlist(String(route.params.username))
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
    & .movie-card:not(:last-child) {
      margin-bottom: 8px;
    }
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
