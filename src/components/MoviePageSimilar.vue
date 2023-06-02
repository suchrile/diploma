<template>
  <div class="movie-page-similar">
    <h3 class="movie-page-similar__title">
      Похожие картины
    </h3>
    <div class="movie-page-similar__list">
      <MovieCardCompact v-for="movie in movies" :key="movie.id" :movie="movie" class="movie-page-similar__item" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  movies: { type: Array, default: () => [] }
})
</script>

<style scoped lang="scss">
.movie-page-similar {
  &__title {
    margin: 0 0 16px;
  }
  &__list {
    display: flex;
    gap: 15px;
    margin: 0 -15px;
    padding: 0 15px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
