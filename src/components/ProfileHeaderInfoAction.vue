<template>
  <div v-if="followed !== null" class="profile-header-action">
    <NuxtLink
      v-if="user.username === route.params.username"
      to="/edit"
      class="profile-header-action__edit"
    >
      Изменить
    </NuxtLink>
    <button v-else-if="!followed" class="profile-header-action__follow" @click="emit('follow')">
      Подписаться
    </button>
    <button v-else-if="followed" class="profile-header-action__unfollow" @click="emit('unfollow')">
      Отписаться
    </button>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  followed: { type: [Boolean, null] as PropType<boolean | null>, default: null }
})
const emit = defineEmits(['follow', 'unfollow'])

const route = useRoute()
const { useUserData } = useUser()

const user = useUserData()

</script>

<style lang="scss">
.profile-header-action {
  top: 140px;
  right: 10px;
  position: absolute;
  & a,
  & button {
    display: block;
    padding: 6px 20px 7px;
    border: none;
    border-radius: 6px;
    color: #ffffff;
    text-decoration: none;
  }
  &__edit {
    background-color: rgba(255, 255, 255, 0.15);
  }
  &__follow {
    background-color: #FF9E0B;
  }
  &__unfollow {
    background-color: rgba(255, 255, 255, 0.15);
  }
}
</style>
