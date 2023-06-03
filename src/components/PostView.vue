<template>
  <div class="post-view">
    <PostViewHeader :movie="modelValue" class="post-view__header" @delete="emit('delete')" />
    <PostViewContent :post="modelValue" class="post-view__content" />
    <MovieCard :movie="modelValue.movie" class="post-view__movie-card" />
    <PostViewFooter :post="modelValue" class="post-view__footer" @like="like" @unlike="unlike" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Object, required: true }
})
const emit = defineEmits(['update:modelValue', 'delete'])

const like = async () => {
  const { data } = await useApiFetch(`/api/posts/${props.modelValue.id}/like`, { method: 'POST' })
  if (data) {
    emit('update:modelValue', {
      ...props.modelValue,
      isLiked: true,
      likesCount: props.modelValue.likesCount + 1
    })
  }
}

const unlike = async () => {
  const { data } = await useApiFetch(`/api/posts/${props.modelValue.id}/unlike`, { method: 'DELETE' })
  if (data) {
    emit('update:modelValue', {
      ...props.modelValue,
      isLiked: false,
      likesCount: props.modelValue.likesCount - 1
    })
  }
}

</script>

<style scoped lang="scss">
.post-view {
  padding: 10px 0;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
  &__footer {
    margin-top: 15px;
  }
}
</style>
