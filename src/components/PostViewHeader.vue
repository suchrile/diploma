<template>
  <div class="post-view-header">
    <PostViewHeaderAvatars :authors="authors" />
    <PostViewHeaderAuthorNames :authors="authors" />
    <button v-if="showDeleteButton && movie.authorId === user.id" class="post-view-header__delete" @click="handleDeleteClick">
      <IconView name="trash-can-regular" :size="16" />
    </button>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  movie: { type: Object, required: true },
  showDeleteButton: { type: Boolean, default: false }
})
const emit = defineEmits(['delete'])

const { useUserData } = useUser()
const user = useUserData()

const authors = [...props.movie.users].sort((a, b) => a.id === props.movie.authorId ? -1 : b.id === props.movie.authorId ? 1 : 0)

const handleDeleteClick = () => {
  const confirmed = confirm('Вы уверены, что хотите удалить этот пост?')
  if (confirmed) {
    emit('delete')
  }
}

</script>

<style scoped lang="scss">
.post-view-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 50px;
  position: relative;
  &__delete {
    top: 50%;
    right: 0;
    width: 34px;
    aspect-ratio: 1/1;
    padding: 0;
    border: none;
    outline: none;
    border-radius: 50%;
    line-height: 0;
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-50%);
    position: absolute;
    & i {
      fill: #ff453a;
    }
  }
}
</style>
