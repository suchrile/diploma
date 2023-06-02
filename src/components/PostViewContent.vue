<template>
  <div class="post-view-content">
    <span class="post-view-content__text">{{ post.text }}</span>
    <PostViewGallery :images="post.images" class="post-view-content__gallery" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  post: { type: Object, required: true }
})
</script>

<style scoped lang="scss">
.post-view-content {
  &__text {
    display: block;
    margin: 10px 0;
    font-size: 16px;
  }
  &__gallery {
    margin-top: 15px;
  }
}
</style>
