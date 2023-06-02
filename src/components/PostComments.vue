<template>
  <div class="post-comments">
    <h3 class="post-comments__title">
      Комментарии ({{ comments.length }})
    </h3>
    <div v-if="comments.length" class="post-comments__list">
      <PostComment v-for="comment in comments" :key="comment.id" :comment="comment" class="post-comments__item" />
    </div>
    <div v-else class="post-comments__empty">
      Ваш комментарий будет первым
    </div>
    <PostCommentsInput v-model="input" @submit="add" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Number, required: true }
})
const emit = defineEmits(['update:modelValue'])

const input = ref('')
const comments = ref([])

onMounted(async () => {
  await fetchComments()
})

const add = async () => {
  const { data } = await useApiFetch(`/api/posts/${props.modelValue.id}/comments`, {
    method: 'POST',
    body: { text: input.value }
  })
  if (data) {
    input.value = ''
    comments.value.unshift(data)
    emit('update:modelValue', { ...props.modelValue, commentsCount: props.modelValue.commentsCount + 1 })
  }
}

const fetchComments = async () => {
  const { data } = await useApiFetch<Object[]>(`/api/posts/${props.modelValue.id}/comments`)
  if (data && data.length) {
    comments.value = data.reverse()
  }
}

</script>

<style scoped lang="scss">
.post-comments {
  &__title {
    margin: 0 0 15px;
  }
  &__empty {
    padding: 70px 15px;
    text-align: center;
    opacity: 0.5;
  }
}
</style>
