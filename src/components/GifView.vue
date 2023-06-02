<template>
  <div class="gif-view">
    <img :src="getImageUrl()" :alt="name" :style="{ width: size + 'px' }">
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: { type: String, default: 'popcorn' },
  size: { type: Number, default: 110 }
})

const getImageUrl = () => {
  return new URL(`/assets/gifs/${props.name}.gif`, import.meta.url).href
}

</script>

<style scoped lang="scss">
.gif-view {
  & img {
    aspect-ratio: 1/1;
    object-fit: cover;
  }
}
</style>
