<template>
  <div class="movie-card" @click="handleClick">
    <div class="movie-card__image">
      <img :src="movie.poster || 'https://yastatic.net/s3/kinopoisk-frontend/common-static/img/projector-logo/placeholder.svg'" :alt="movie.name || movie.enName || movie.alternativeName">
    </div>
    <div class="movie-card__info movie-card-info">
      <h6 class="movie-card-info__title">
        {{ movie.name || movie.enName || movie.alternativeName }}
      </h6>
      <span class="movie-card-info__details">{{ details }}</span>
      <div class="movie-card-info__rating">
        <span class="movie-card-info__rating-name">Кинопоиск</span>
        <span class="movie-card-info__rating-score">{{ movie.rating.toFixed(1) }}</span>
      </div>
    </div>
    <IconView v-if="!emitOnClick" name="chevron-regular" :size="19" class="movie-card__icon" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  movie: { type: Object, required: true },
  emitOnClick: { type: Boolean, default: false }
})
const emit = defineEmits(['click'])

const details = ref(`${props.movie.genres[0]}, ${props.movie.year}`)

const handleClick = async () => {
  if (props.emitOnClick) {
    emit('click')
  } else {
    await navigateTo('/movie/' + props.movie.id)
  }
}

</script>

<style scoped lang="scss">
.movie-card {
  display: grid;
  grid-template-columns: 96px 1fr;
  color: #ffffff;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
  &__image {
    width: 100%;
    min-height: 100%;
    aspect-ratio: 1/1.15;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px 15px 10px;
    position: relative;
    overflow: hidden;
    &__title {
      height: 34px;
      margin: 0;
      font-size: 15px;
      overflow: hidden;
    }
    &__details {
      font-size: 15px;
    }
    &__rating {
      display: flex;
      gap: 5px;
      width: fit-content;
      padding: 5px 10px;
      font-size: 13px;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.10);
      &-name {
        font-weight: 500;
        opacity: 0.8;
      }
      &-score {
        font-weight: 700;
        color: #FF9E0B;
      }
    }
  }
  &__icon {
    top: 50%;
    right: 20px;
    fill: #FF9E0B;
    transform: translateY(-50%);
    position: absolute;
  }
}
</style>
