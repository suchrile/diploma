<template>
  <div class="search-results">
    <div v-if="results && results.length" class="search-results__container">
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
    <UiNotFound v-else-if="results && !results.length" text="Ничего не найдено" class="search-results__not-found" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { PersonCard, SearchMovieCard, UserCard } from '#components'

const props = defineProps({
  target: { type: String, default: 'movies' },
  results: { type: [Object, null] as PropType<object[] | null>, required: true },
  emitOnClick: { type: Boolean, default: false }
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
  &__not-found {
    height: calc(100% - 100px);
    padding-bottom: 100px;
  }
}
</style>
