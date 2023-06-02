<template>
  <NuxtLink :to="'/person/' + person.id" class="movie-page-person-card">
    <div class="movie-page-person-card__photo">
      <img :src="person.photo" :alt="person.name || person.enName" loading="lazy">
    </div>
    <h5 class="movie-page-person-card__name">
      {{ person.name || person.enName }}
    </h5>
    <span v-if="showProfession" class="movie-page-person-card__profession">{{ person.profession }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  person: { type: Object, required: true },
  showProfession: { type: Boolean, default: false }
})
</script>

<style scoped lang="scss">
.movie-page-person-card {
  min-width: 120px;
  max-width: 120px;
  color: #ffffff;
  text-decoration: none;
  &__photo {
    width: 100%;
    aspect-ratio: 1/1.3;
    border-radius: 8px;
    overflow: hidden;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__name {
    margin: 7px 0 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.3;
  }
  &__profession {
    display: block;
    margin-top: 5px;
    font-size: 13px;
    opacity: 0.5;
  }
}
</style>
