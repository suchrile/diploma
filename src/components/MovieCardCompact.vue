<template>
  <NuxtLink :to="'/movie/' + movie.id" class="movie-card-compact">
    <div class="movie-card-compact__poster">
      <img :src="movie.poster?.url || imagePlaceholderUrl" :alt="movie.name || movie.enName || movie.alternativeName">
    </div>
    <h5 class="movie-card-compact__name">
      {{ movie.name || movie.enName || movie.alternativeName }}
    </h5>
  </NuxtLink>
</template>

<script setup lang="ts">
import { imagePlaceholderUrl } from '~/consts'

defineProps({
  movie: { type: Object, required: true }
})
</script>

<style scoped lang="scss">
.movie-card-compact {
  min-width: 120px;
  max-width: 120px;
  color: #ffffff;
  text-decoration: none;
  &__poster {
    width: 100%;
    aspect-ratio: 1/1.4;
    border-radius: 8px;
    overflow: hidden;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__name {
    margin: 8px 0 0;
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
