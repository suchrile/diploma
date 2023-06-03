<template>
  <div class="favourites-page">
    <LoaderView v-if="isLoading" />
    <div v-else-if="favourites.length" class="favourites-page__content">
      <InfinityScroll class="favourites-page__content" @trigger="loadFavourites">
        <MovieCard v-for="movie in favourites" :key="movie.id" :movie="movie.movie" />
      </InfinityScroll>
    </div>
    <div v-else class="favourites-page__empty">
      Тут пока пусто
    </div>
  </div>
</template>

<script setup lang="ts">

const route = useRoute()
const { setTitle } = useHeader()
const { favourites, fetchFavourites, isLoading } = useFavourites()

onMounted(async () => {
  setTitle('Избранное')
  await loadFavourites()
})

const loadFavourites = async () => {
  await fetchFavourites(String(route.params.username))
}

definePageMeta({
  header: true,
  footer: true
})

</script>

<style scoped lang="scss">
.favourites-page {
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
