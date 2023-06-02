<template>
  <div class="search-page">
    <div class="search-page__content">
      <SearchField class="search-page__header" @search="search" />
      <SearchPageTabs class="search-page__tabs" />
      <SearchResults :target="searchTarget" :results="results[searchTarget]" class="search-page__results" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const results = ref({
  users: null,
  movies: null,
  series: null,
  persons: null
})

const searchTarget = computed(() => route.query.target)

const search = async (query: string) => {
  const { data } = await useApiFetch<Object[]>('/api/' + searchTarget.value, { query: { query: query.toLowerCase() } })
  if (data) {
    results.value[searchTarget.value] = data.docs ? data.docs : data
  }
}

definePageMeta({
  footer: true
})

</script>

<style scoped lang="scss">
.search-page {
  height: 100%;
  &__content {
    height: 100%;
  }
  &__header {
    padding-top: 15px;
  }
  &__tabs {
    margin-top: 10px;
  }
  &__results {
    height: calc(100% - 138px);
    margin: 25px -15px 0;
    padding: 0 15px;
    overflow-y: scroll;
  }
}
</style>
