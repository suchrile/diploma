<template>
  <div class="post-view-footer">
    <div class="post-view-footer__actions-and-rating">
      <PostViewFooterActions :post="post" @like="emit('like')" @unlike="emit('unlike')" />
      <PostViewFooterRating :value="post.movieRating" />
    </div>
    <span class="post-view-footer__date">{{ formatDate(post.createdAt) }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  post: { type: Object, required: true }
})
const emit = defineEmits(['like', 'unlike'])

</script>

<style scoped lang="scss">
.post-view-footer {
  &__actions-and-rating {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__date {
    display: block;
    margin-top: 15px;
    font-size: 14px;
    opacity: 0.6;
  }
}
</style>
