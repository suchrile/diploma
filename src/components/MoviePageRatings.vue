<template>
  <div class="movie-page-header-ratings">
    <span v-if="ratingMpaa === 'r'" class="movie-page-header-ratings__age">18+</span>
    <div v-if="rating.imdb" class="movie-page-header-ratings__item">
      <span class="movie-page-header-ratings__item-name">IMDb</span>
      <span class="movie-page-header-ratings__item-score">{{ rating.imdb.toFixed(1) }}</span>
    </div>
    <div v-if="rating.kp" class="movie-page-header-ratings__item">
      <span class="movie-page-header-ratings__item-name">Кинопоиск</span>
      <span class="movie-page-header-ratings__item-score">{{ rating.kp.toFixed(1) }}</span>
    </div>
    <div v-if="rating.filmCritics" class="movie-page-header-ratings__item">
      <span class="movie-page-header-ratings__item-name">Мировые критики</span>
      <span class="movie-page-header-ratings__item-score">{{ rating.filmCritics.toFixed(1) }}</span>
    </div>
    <div v-if="rating.russianFilmCritics" class="movie-page-header-ratings__item">
      <span class="movie-page-header-ratings__item-name">Российские критики</span>
      <span class="movie-page-header-ratings__item-score">{{ Math.round(rating.russianFilmCritics * 10) / 10 }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  rating: { type: Object, required: true }
})

</script>

<style scoped lang="scss">
.movie-page-header-ratings {
  display: flex;
  gap: 8px;
  margin: 0 -15px;
  padding: 10px 15px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  &__item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 12px 17px;
    font-size: 15px;
    font-weight: 500;
    white-space: nowrap;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.1);
    &-name {
      opacity: 0.85;
    }
    &-score {
      font-size: 16px;
      font-weight: 700;
      color: #FF9E0B;
    }
  }
}
</style>
