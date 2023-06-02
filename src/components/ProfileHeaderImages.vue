<template>
  <div class="profile-header-images">
    <div class="profile-header-images__background">
      <img :src="profile.images?.backgroundUrl || userBackgroundPlaceholderUrl" alt="Фоновое изображение профиля">
    </div>
    <div class="profile-header-images__avatar">
      <img :src="profile.images?.avatarUrl || getAvatarPlaceholder(profile.username)" alt="Изображение профиля">
    </div>
  </div>
</template>

<script setup lang="ts">
import { userBackgroundPlaceholderUrl } from '~/consts'

defineProps({
  profile: { type: Object, required: true }
})
</script>

<style scoped lang="scss">
.profile-header-images {
  margin: 0 -15px;
  position: relative;
  &__background {
    width: 100vw;
    height: 120px;
  }
  &__avatar {
    content: "";
    left: 15px;
    bottom: 0;
    width: 90px;
    height: 90px;
    border: 5px solid #000000;
    border-radius: 50%;
    transform: translateY(50%);
    position: absolute;
  }
  &__background,
  &__avatar {
    overflow: hidden;
    background-color: #000000;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
