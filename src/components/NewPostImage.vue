<template>
  <div class="new-post-image">
    <img :src="src" :alt="alt">
  </div>
</template>

<script setup lang="ts">
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' }
})
</script>

<style scoped lang="scss">
.new-post-image {
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  line-height: 0;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
