<template>
  <div class="person-page-header">
    <div class="person-page-header__photo">
      <img :src="person.photo || imagePlaceholderUrl" :alt="person.name || person.enName">
    </div>

    <div class="person-page-header__content">
      <div class="person-page-header__names">
        <h1 class="person-page-header__name-ru">
          {{ person.name }}
        </h1>
        <h2 v-if="person.enName" class="person-page-header__name-en">
          {{ person.enName }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { imagePlaceholderUrl } from '~/consts'

defineProps({
  person: { type: Object, required: true }
})
</script>

<style scoped lang="scss">
.person-page-header {
  display: grid;
  grid-template-columns: 146px 1fr;
  gap: 15px;
  &__photo {
    aspect-ratio: 1/1.35;
    border-radius: 12px;
    overflow: hidden;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 0;
  }
  &__name-ru {
    margin: 0;
    font-size: 22px;
  }
  &__name-en {
    margin: 8px 0 0;
    font-size: 17px;
    font-weight: 500;
    opacity: 0.5;
  }
}
</style>
