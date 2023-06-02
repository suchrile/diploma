<template>
  <div class="post-view-footer-actions">
    <button :class="{active: post.isLiked}" class="post-view-footer-actions__item post-view-footer-action" @click="toggleLike">
      <IconView name="heart-regular" :size="21" class="post-view-footer-action__icon" />
      <span class="post-view-footer-action__label">{{ post.likesCount }}</span>
    </button>
    <NuxtLink :to="'/post/' + post.id" class="post-view-footer-actions__item post-view-footer-action">
      <IconView name="comment-regular" :size="21" class="post-view-footer-action__icon" />
      <span class="post-view-footer-action__label">{{ post.commentsCount }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  post: { type: Object, required: true }
})
const emit = defineEmits(['like', 'unlike'])

const toggleLike = () => {
  props.post.isLiked ? emit('unlike') : emit('like')
}
</script>

<style scoped lang="scss">
.post-view-footer-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  & .post-view-footer-action {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 14px;
    border: none;
    outline: none;
    appearance: none;
    text-decoration: none;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.1);
    transition: background-color 0.15s ease;
    &.active {
      animation: gelatine 0.5s ease;
      background-color: rgba(255, 69, 58, 0.2);
      & i {
        fill: rgb(255, 69, 58);
      }
    }
    &__icon {
      fill: rgba(255, 255, 255, 0.7);
      transition: fill 0.15s ease;
    }
    &__label {
      font-size: 15px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.75);
    }
  }
}

@keyframes gelatine {
  from, to { transform: scale(1, 1); }
  25% { transform: scale(0.9, 1.1); }
  50% { transform: scale(1.1, 0.9); }
  75% { transform: scale(0.95, 1.05); }
}
</style>
