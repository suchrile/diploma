<template>
  <div v-if="facts.length" class="facts-view">
    <h3 class="facts-view__title">
      Факты
    </h3>
    <ul class="facts-view__content">
      <li v-for="fact in cleanFacts.slice(0, shownFactsLength)" :key="fact" class="facts-view__item">
        <span v-html="fact" />
      </li>
    </ul>
    <div class="facts-view__show-more">
      <button v-if="facts.length > 3" @click="toggleCollapsed">
        {{ shownFactsLength < facts.length ? 'Показать еще' : 'Скрыть' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { removeHtml } from '~/utils'

const props = defineProps({
  facts: { type: Array, default: () => [] }
})

const cleanFacts = ref([])
const shownFactsLength = ref(0)

onMounted(() => {
  cleanFacts.value = props.facts?.map(f => removeHtml(f.value)) || []
  shownFactsLength.value = cleanFacts.value.slice(0, 3).length
})

const toggleCollapsed = () => {
  if (shownFactsLength.value < cleanFacts.value.length) {
    shownFactsLength.value = shownFactsLength.value + 3
  } else {
    shownFactsLength.value = 3
  }
}

</script>

<style scoped lang="scss">
.facts-view {
  &__title {
    margin: 0 0 15px;
  }
  &__content {
    padding: 0 0 0 20px;
  }
  &__item {
    font-size: 20px;
    color: #FF9E0B;
    line-height: 1;
    &:not(:last-child) {
      margin-bottom: 15px;
    }
    & span {
      font-size: 16px;
      line-height: 1.3;
      color: #ffffff;
      opacity: 0.9;
    }
  }
  &__show-more {
    display: flex;
    justify-content: flex-end;
    & button {
      padding: 4px 8px;
      font-size: 16px;
      font-weight: 500;
      color: #FF9E0B;
      border: none;
      background: transparent;
      user-select: none;
    }
  }
}
</style>
