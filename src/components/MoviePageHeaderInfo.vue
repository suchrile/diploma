<template>
  <div class="movie-page-header-info">
    <div class="movie-page-header-info__poster">
      <img :src="movie.poster.url" :alt="movie.name">
    </div>
    <div class="movie-page-header-info__info movie-page-header-info-content">
      <div class="movie-page-header-info-content__names">
        <h1 class="movie-page-header-info-content__name-ru">
          {{ movie.name }}
        </h1>
        <h2 v-if="movie.alternativeName" class="movie-page-header-info-content__name-en">
          {{ movie.alternativeName }}
        </h2>
      </div>
      <div class="movie-page-header-info-content__details">
        <span class="movie-page-header-info-content__year">{{ movie.year }}</span>
        <span class="movie-page-header-info-content__genres">{{ getMovieGenresFormatted() }}</span>
        <span class="movie-page-header-info-content__duration">{{ getDuration() }}</span>
      </div>
    </div>
    <span v-if="movie.ratingMpaa === 'r'" class="movie-page-header-info__mpaa">18+</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  movie: { type: Object, required: true }
})

const getMovieGenresFormatted = () => {
  return props.movie.genres.slice(0, 2).map(g => g.name).join(', ')
}
const getDuration = () => {
  if (props.movie.seasonsInfo.length) {
    const info = props.movie.seasonsInfo.reduce((acc, info) => {
      acc.seasons = acc.seasons + 1
      acc.episodes = acc.episodes + info.episodesCount
      return acc
    }, { seasons: 0, episodes: 0 })
    return `${info.seasons} сезонов, ${info.episodes} серий`
  } else {
    return `${props.movie.movieLength || 0} мин. / ${getMovieDurationFormatted()}`
  }
}
const getMovieDurationFormatted = () => {
  const movieLength = props.movie.movieLength
  const minutes = movieLength % 60
  const hours = (movieLength - minutes) / 60
  return (hours < 10 ? '0' : '') + String(hours) + ':' + (minutes < 10 ? '0' : '') + String(minutes)
}

</script>

<style scoped lang="scss">
.movie-page-header-info {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 15px;
  position: relative;
  &__poster {
    width: 100%;
    border-radius: 12px;
    aspect-ratio: 1/1.45;
    overflow: hidden;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px 0;
    &__name-ru {
      margin: 0;
      font-size: 20px;
    }
    &__name-en {
      margin: 8px 0 0;
      font-size: 17px;
      font-weight: 500;
      opacity: 0.5;
    }
    &__details {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
  }
  &__mpaa {
    right: 0;
    bottom: 8px;
    padding: 4px 3.5px 4px 5px;
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    color: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    position: absolute;
  }
}
</style>
