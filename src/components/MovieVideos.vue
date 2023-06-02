<template>
  <div v-if="videos.length" class="movie-videos">
    <h3 v-if="showHeading" class="movie-videos__title">
      Трейлеры и тизеры
    </h3>
    <div class="movie-videos__list">
      <iframe
        v-for="video in videos"
        :key="video.url"
        :src="video.url"
        allow="accelerometer; autoplay; encrypted-media; gyroscope"
        allowfullscreen
        class="movie-videos__item"
        :style="{ 'min-width': videos.length > 1 ? 'calc(100% - 30px)' : '100%' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  videos: { type: Array, required: true },
  showHeading: { type: Boolean, default: true }
})

const videos = [
  ...props.videos.trailers.filter(v => v.site === 'youtube' && v.url.includes('embed')),
  ...props.videos.teasers.filter(v => v.site === 'youtube' && v.url.includes('embed'))
]

</script>

<style  lang="scss">
.movie-videos {
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
  &__item {
    aspect-ratio: 16/9;
    border: none;
    border-radius: 8px;
    overflow: hidden;
  }
}
</style>
