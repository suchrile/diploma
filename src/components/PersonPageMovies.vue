<template>
  <div class="person-page-movies">
    <h3 class="person-page-movies__title">
      Участие в картинах
    </h3>
    <div class="person-page-movies__list">
      <MovieCardCompact v-for="movie in movies" :key="movie.id" :movie="movie" class="person-page-movies__item" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  movies: { type: Array, default: () => [] }
})
</script>

<style scoped lang="scss">
.person-page-movies {
  &__title {
    margin: 0 0 15px;
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
