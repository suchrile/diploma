<template>
  <div class="loader-view">
    <img src="@/assets/gifs/popcorn.gif" alt="Popcorn loader" :style="{ width: size + 'px' }">
  </div>
</template>

<script setup lang="ts">
defineProps({
  emoji: { type: String, default: 'popcorn' },
  size: { type: Number, default: 110 }
})
</script>

<style scoped lang="scss">
.loader-view {
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    aspect-ratio: 1/1;
    object-fit: cover;
  }
}
</style>
