<template>
  <div class="post-comment">
    <div class="post-comment__wrapper">
      <NuxtLink :to="'/' + comment.author.username" class="post-comment__avatar">
        <img :src="comment.author.images.avatarUrl" :alt="comment.author.username">
      </NuxtLink>
      <div class="post-comment__content">
        <NuxtLink :to="'/' + comment.author.username" class="post-comment__author">
          {{ comment.author.username }}
        </NuxtLink>
        <span class="post-comment__text">{{ comment.text }}</span>
        <small class="post-comment__date">{{ formatDate(comment.createdAt) }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  comment: { type: Object, required: true }
})

</script>

<style scoped lang="scss">
.post-comment {
  padding: 7px 0;
  &__wrapper {
    display: grid;
    grid-template-columns: 38px 1fr;
    gap: 12px;
  }
  &__avatar {
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__author {
    display: block;
    width: fit-content;
    padding: 0 0 4px;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    text-decoration: none;
  }
  &__text {
    font-size: 15px;
  }
  &__date {
    display: block;
    width: fit-content;
    margin-top: 7px;
    opacity: 0.5;
  }
}
</style>
