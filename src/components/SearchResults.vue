<template>
  <div class="search-results">
    <LoaderView v-if="loading" class="search-results__loader" />
    <div v-else-if="results && results.length" class="search-results__container">
      <Component
        :is="ResultItemComponent"
        v-for="entity in results"
        :key="entity.id"
        :user="entity"
        :movie="entity"
        :person="entity"
        :emit-on-click="emitOnClick"
        class="search-results__item"
        @click="emit('choose', entity)"
      />
    </div>
    <UiNotFound v-else-if="results && !results.length" text="Ничего не найдено" class="search-results__empty" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { PersonCard, SearchMovieCard, UserCard } from '#components'

const props = defineProps({
  target: { type: String, default: 'movies' },
  results: { type: [Object, null] as PropType<object[] | null>, required: true },
  emitOnClick: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }
})
const emit = defineEmits(['choose'])

const ResultItemComponent = computed(() => {
  if (props.target === 'movies') {
    return SearchMovieCard
  } else if (props.target === 'persons') {
    return PersonCard
  } else if (props.target === 'users') {
    return UserCard
  }
})

</script>

<style  lang="scss">
.search-results {
  height: 100%;
  &__container {
    padding-bottom: 50px;
  }
  &__item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
  &__loader {
    height: calc(100% - 100px);
  }
  &__empty {
    height: calc(100% - 100px);
  }
}
</style>
