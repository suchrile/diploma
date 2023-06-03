<template>
  <div class="post-comment" @click="handleDeleteClick">
    <div class="post-comment__wrapper">
      <NuxtLink :to="'/' + comment.author.username" class="post-comment__avatar">
        <img :src="comment.author.images?.avatarUrl || getAvatarPlaceholder(comment.author.username)" :alt="comment.author.username">
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
const props = defineProps({
  comment: { type: Object, required: true }
})
const emit = defineEmits(['delete'])

const { useUserData } = useUser()
const user = useUserData()

const handleDeleteClick = () => {
  if (props.comment.author.username !== user.value.username) { return }
  const confirmed = confirm('Вы уверены, что хотите удалить этот комментарий?')
  if (confirmed) {
    emit('delete', props.comment.id)
  }
}

</script>

<style scoped lang="scss">
.post-comment {
  padding: 7px 0;
  &__wrapper {
    display: grid;
    grid-template-columns: 38px 1fr;
    gap: 12px;
    padding-right: 50px;
    position: relative;
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
