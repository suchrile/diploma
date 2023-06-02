<template>
  <UiOverlay :visible="visible" :title="title" class="new-post-add-movie-overlay" @update:visible="emit('update:visible', $event)">
    <div class="new-post-add-movie-overlay__container">
      <SearchField class="new-post-add-movie-overlay__search" @search="fetchResults" />
      <SearchResults :target="target" :results="results" emit-on-click class="new-post-add-movie-overlay__results" @choose="emit('choose', $event)" />
    </div>
  </UiOverlay>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: { type: Boolean, default: false },
  target: { type: String, default: 'movies' },
  title: { type: String, default: '' }
})
const emit = defineEmits(['update:visible', 'choose'])

const results = ref(null)

const fetchResults = async (query: string) => {
  const { data } = await useApiFetch<Object[]>('/api/' + props.target, { query: { query } })
  if (data) {
    results.value = data.docs
  }
}

</script>

<style scoped lang="scss">
.new-post-add-movie-overlay {
  &__container {
    height: calc(100% - 65px - 55px - 10px);
  }
  &__search {
    margin-top: 10px;
    padding: 0 15px;
  }
  &__results {
    height: 100%;
    margin-top: 25px;
    padding: 0 15px;
    overflow-y: scroll;
  }
}
</style>
