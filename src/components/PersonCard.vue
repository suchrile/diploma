<template>
  <NuxtLink :to="'/person/' + person.id" class="person-card">
    <div class="person-card__image">
      <img :src="person.photo || imagePlaceholderUrl" :alt="person.name || person.enName">
    </div>
    <div class="person-card__info person-card-info">
      <h5 class="person-card-info__ru-name">
        {{ person.name }}
      </h5>
      <h6 class="person-card-info__eng-name">
        {{ person.enName }}
      </h6>
    </div>
    <IconView name="chevron-regular" :size="19" class="person-card__icon" />
  </NuxtLink>
</template>

<script setup lang="ts">
import { imagePlaceholderUrl } from '~/consts'

defineProps({
  person: { type: Object, required: true }
})
</script>

<style scoped lang="scss">
.person-card {
  display: grid;
  grid-template-columns: 86px 1fr;
  gap: 15px;
  color: #ffffff;
  text-decoration: none;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
  &__image {
    width: 100%;
    min-height: 100%;
    aspect-ratio: 1/1.2;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-info {
    padding: 20px 0;
    &__ru-name {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }
    &__eng-name {
      margin: 8px 0 0;
      font-size: 15px;
      font-weight: 500;
      opacity: 0.6;
    }
  }
  &__icon {
    top: 50%;
    right: 20px;
    fill: #FF9E0B;
    transform: translateY(-50%);
    position: absolute;
  }
}
</style>
