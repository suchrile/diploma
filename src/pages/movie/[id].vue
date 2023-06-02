<template>
  <div v-if="movie" class="movie-page">
    <MoviePageHeader :movie="movie" />
    <MovieVideos v-if="movie.videos.trailers.length || movie.videos.teasers.length" :videos="movie.videos" class="movie-page__videos" />
    <MoviePageDetails :movie="movie" class="movie-page__details" />
    <FactsView v-if="movie.facts" :facts="movie.facts" class="movie-page__facts" />
    <MoviePagePersons v-if="movie.persons.length" :persons="movie.persons" class="movie-page__persons" />
    <MoviePageSequelsAndPrequels v-if="movie.sequelsAndPrequels.length" :movies="movie.sequelsAndPrequels" class="movie-page__sequels-and-prequels" />
    <MoviePageSimilar v-if="movie.similarMovies.length" :movies="movie.similarMovies" class="movie-page__similar" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { setTitle } = useHeader()

const movie = ref()

onMounted(async () => {
  await nextTick()
  await fetchMovie()
})

onBeforeUnmount(() => {
  setTitle('')
})

const fetchMovie = async () => {
  const { data } = await useFetch('/api/movies/' + route.params.id)
  if (data.value) {
    console.log(data.value)
    movie.value = data.value
    setTitle(movie.value.name)
  }
}
definePageMeta({
  header: true,
  footer: true
})
useHead({
  title: movie.value?.name
})
</script>

<style scoped lang="scss">
.movie-page {
  padding: 12px 0 40px;
  &__videos {
    margin-top: 25px;
  }
  &__details {
    margin-top: 25px;
  }
  &__facts {
    margin-top: 20px;
  }
  &__persons {
    margin-top: 20px;
  }
  &__sequels-and-prequels {
    margin-top: 20px;
  }
  &__similar {
    margin-top: 20px;
  }
}
</style>
