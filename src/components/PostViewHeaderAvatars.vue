<template>
  <div class="post-view-header-avatars">
    <div v-for="(author, index) in authors" :key="author.username" :style="{'z-index': authors.length - index}" class="post-view-header-avatars__item">
      <img :src="author.images?.avatarUrl || getAvatarPlaceholder(author.username)" :alt="'Аватар ' + author.username">
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  authors: { type: Array, default: () => [] }
})

</script>

<style scoped lang="scss">
.post-view-header-avatars {
  display: flex;
  &__item {
    width: 42px;
    height: 42px;
    border: 3.5px solid black;
    border-radius: 50%;
    overflow: hidden;
    box-sizing: border-box;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &:not(:first-child) {
      margin-left: -16px;
    }
  }
}
</style>
