<template>
  <div class="profile-header-info">
    <h1 class="profile-header-info__name">
      {{ name }}
    </h1>
    <span class="profile-header-info__username">@{{ username }}</span>
    <span class="profile-header-info__description">{{ description }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  username: { type: String, required: true },
  description: { type: String, default: null }
})

</script>

<style scoped lang="scss">
.profile-header-info {
  margin-top: 60px;
  &__name {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }
  &__username,
  &__description {
    display: block;
  }
  &__username {
    margin-top: 5px;
    opacity: 0.6;
  }
  &__description {
    margin: 15px 0 22px;
    opacity: 0.95;
  }
}
</style>
