<template>
  <div class="random-page">
    <div v-if="isLoading" class="random-page__loading">
      <img src="@/assets/gifs/dice.gif" alt="Игральная кость">
    </div>

    <div v-else-if="!isLoading && movie" class="random-page__content">
      <MovieCard :movie="movie" />
      <MovieVideos :show-heading="false" :videos="movie.videos" class="random-page__videos" />
      <MovieDescription :short-description="movie.shortDescription" :description="movie.description" class="random-page__description" />
      <UiButtonLarge icon="dice-regular" class="random-page__button" @click="fetchMovie">
        Перебросить
      </UiButtonLarge>
    </div>
  </div>
</template>

<script setup lang="ts">

const { setTitle } = useHeader()

const movie = ref()
const isLoading = ref(true)

onMounted(async () => {
  setTitle('Случайная картина')
  await nextTick()
  await fetchMovie()
})

const fetchMovie = async () => {
  isLoading.value = true
  const { data } = await useApiFetch('/api/movies/random')
  if (data) {
    movie.value = data
  }
  isLoading.value = false
}

definePageMeta({
  header: true,
  footer: true
})

useHead({
  title: 'Случайная картина'
})

</script>

<style scoped lang="scss">
.random-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  &__content {
    width: 100%;
    padding: 20px 0;
  }
  &__videos {
    margin-top: 20px;
  }
  &__description {
    margin-top: 20px;
  }
  &__button {
    margin-top: 20px;
  }
  &__loading img {
    width: 150px;
    height: 150px;
  }
}
</style>
