<template>
  <div class="user-card" @click="handleClick">
    <div class="user-card__image">
      <img :src="user.images?.avatarUrl || getAvatarPlaceholder(user.username)" :alt="user.username">
    </div>
    <div class="user-card__info user-card-info">
      <h5 class="user-card-info__name">
        {{ user.firstname }} {{ user.lastname }}
      </h5>
      <h6 class="user-card-info__username">
        @{{ user.username }}
      </h6>
    </div>

    <IconView v-if="!emitOnClick" name="chevron-regular" :size="18" class="user-card__icon" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  user: { type: Object, required: true },
  emitOnClick: { type: Boolean, default: false }
})

const emit = defineEmits(['click'])

const handleClick = async () => {
  if (props.emitOnClick) {
    emit('click')
  } else {
    await navigateTo('/' + props.user.username)
  }
}
</script>

<style scoped lang="scss">
.user-card {
  display: grid;
  grid-template-columns: 50px 1fr;
  align-items: center;
  gap: 14px;
  padding: 10px 14px;
  color: #ffffff;
  text-decoration: none;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  position: relative;
  &__image {
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    &__name {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }
    &__username {
      margin: 0;
      font-size: 14px;
      font-weight: 500;
      opacity: 0.6;
    }
  }
  &__icon {
    top: 50%;
    right: 20px;
    fill: #FF9E0B;
    transform: translateY(-50%);
    position: absolute;
  }
}
</style>
