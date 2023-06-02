<template>
  <div :class="{skeleton: !movie}" class="movie-card">
    <NuxtLink v-if="movie" :to="'/movie/'+ movie.id" class="movie-card__content">
      <div class="movie-card__image">
        <img :src="movie.poster?.url || imagePlaceholderUrl" :alt="movie.title">
      </div>
      <div class="movie-card__info movie-card-info">
        <h6 class="movie-card-info__title">
          {{ movie.name }}
        </h6>
        <span class="movie-card-info__details">{{ details }}</span>
        <div class="movie-card-info__ratings movie-card-info-ratings">
          <div v-if="movie.rating.imdb" class="movie-card-info-ratings__item">
            <span class="movie-card-info-ratings__item-name">IMDb</span>
            <span class="movie-card-info-ratings__item-score">{{ movie.rating.imdb.toFixed(1) }}</span>
          </div>
          <div v-if="movie.rating" class="movie-card-info-ratings__item">
            <span class="movie-card-info-ratings__item-name">Кинопоиск</span>
            <span class="movie-card-info-ratings__item-score">{{ movie.rating.kp.toFixed(1) }}</span>
          </div>
          <div v-if="movie.ratingMpaa" class="movie-card-info__age">
            18+
          </div>
        </div>
      </div>
      <IconView name="chevron-solid" :size="18" class="movie-card__icon" />
    </Nuxtlink>
  </div>
</template>

<script setup lang="ts">
import { imagePlaceholderUrl } from '~/consts'

const props = defineProps({
  movie: { type: Object, required: true }
})

const details = ref('')

watch(props, () => {
  setDetails()
})

onMounted(() => {
  setDetails()
})

const setDetails = () => {
  if (props.movie) {
    details.value = `${props.movie.genres[0].name}, ${props.movie.year}`
  }
}

</script>

<style scoped lang="scss">
.movie-card {
  min-height: 110px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  &__content {
    display: grid;
    grid-template-columns: 96px 1fr;
    color: #ffffff;
    text-decoration: none;
    position: relative;
  }
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
    padding: 12px 12px 10px;
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
    &-ratings {
      display: flex;
      gap: 6px;
      margin-top: 2px;
      &__item {
        display: flex;
        gap: 5px;
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
    &__age {
      padding: 5px 4px 5px 5px;
      font-size: 12px;
      line-height: 1;
      color: rgba(255, 255, 255, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 5px;
    }
  }
  &__icon {
    top: 50%;
    right: 15px;
    fill: #FF9E0B;
    transform: translateY(-50%);
    opacity: 0.8;
    position: absolute;
  }
}
</style>
