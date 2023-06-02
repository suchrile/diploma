<template>
  <div v-if="results.length" class="search-page-results">
    <div v-for="result in results" :key="result.id" class="search-page-results__item">
      <div v-if="route.query.target === 'users'" class="search-page-results__users">
        <UserCard :user="result" class="search-page-results__item" />
      </div>
      <div v-else-if="route.query.target === 'movies'" class="search-page-results__movies">
        <SearchMovieCard v-for="movie in results" :key="movie.id" :movie="result" class="search-page-results__item" />
      </div>
      <div v-else-if="route.query.target === 'persons'" class="search-page-results__persons">
        <PersonCard :person="result" class="search-page-results__item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  results: { type: Array, default: () => [] }
})

const route = useRoute()

</script>

<style scoped lang="scss">
.search-page-results {
  &__item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>
