<template>
  <div class="profile-header-info-stats">
    <Component :is="stat.url ? NuxtLink : 'div'" v-for="(stat) in stats" :key="stat.name" :to="stat.url" class="profile-header-info-stats__item">
      <span class="profile-header-info-stats__item-value">{{ stat.value }}</span>
      <span class="profile-header-info-stats__item-name">{{ stat.label }}</span>
    </Component>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

defineProps({
  stats: { type: Object, required: true }
})
</script>

<style scoped lang="scss">
.profile-header-info-stats {
  display: flex;
  gap: 10px;
  margin: 0 -15px;
  padding: 0 15px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    min-width: 100px;
    padding: 9px 0;
    color: #ffffff;
    text-decoration: none;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.12);
    &-value {
      font-weight: 600;
      opacity: 0.9;
    }
    &-name {
      font-size: 13px;
      opacity: 0.7;
    }
  }
}
</style>
