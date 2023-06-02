<template>
  <div class="movie-page-header">
    <MoviePageHeaderInfo :movie="movie" class="movie-page-header__info" />
    <MoviePageRatings v-if="Object.keys(movie.rating).length" :rating="movie.rating" class="movie-page-header__ratings" />
    <UiButtonLarge icon="bookmark-regular" class="movie-page-header__button">
      Добавить в избранное
    </UiButtonLarge>
  </div>
</template>

<script setup lang="ts">

defineProps({
  movie: { type: Object, required: true }
})

</script>

<style scoped lang="scss">
.movie-page-header {
  &__ratings {
    margin-top: 6px;
  }
  &__button {
    margin-top: 12px;
  }
}
</style>
