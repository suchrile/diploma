<template>
  <div class="new-post-users">
    <div class="new-post-users__list">
      <button v-if="users.length < maxPostUsersLength" class="new-post-users__add" @click="isOverlayOpen = true">
        <IconView name="plus-regular" :size="26" />
      </button>
      <div v-for="user in users" :key="user.id" class="new-post-users__item" @click="removeUser(user.id)">
        <img :src="user.images?.avatarUrl || getAvatarPlaceholder(user.username)" :alt="user.username">
      </div>
    </div>
    <NewPostSelectOverlay v-model:visible="isOverlayOpen" title="Выбор пользователей" target="users" @choose="addUser" />
  </div>
</template>

<script setup lang="ts">
import { maxPostUsersLength } from '~/consts'

defineProps({
  modelValue: { type: Array, default: () => [] }
})
const emit = defineEmits(['update:modelValue'])

const users = ref([])
const isOverlayOpen = ref(false)

const addUser = (value) => {
  isOverlayOpen.value = false
  if (!users.value.find(u => u.id === value.id)) {
    users.value.push(value)
    const userIds = users.value.map(u => u.id)
    emit('update:modelValue', userIds)
  }
}

const removeUser = (userId: number) => {
  users.value = users.value.filter(u => u.id !== userId)
  const userIds = users.value.map(u => u.id)
  emit('update:modelValue', userIds)
}

</script>

<style scoped lang="scss">
.new-post-users {
  &__list {
    display: flex;
    gap: 8px;
    margin: 0 -15px;
    padding: 0 15px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__item {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.15);
    overflow: hidden;
    & img {
      width: 60px;
      aspect-ratio: 1/1;
      object-fit: cover;
    }
  }
  &__add {
    flex-shrink: 0;
    width: 60px;
    aspect-ratio: 1/1;
    border: none;
    outline: none;
    appearance: none;
    border-radius: 50%;
    line-height: 0;
    background-color: rgba(255, 255, 255, 0.15);
    & i {
      opacity: 0.5;
    }
  }
}
</style>
