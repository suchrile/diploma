<template>
  <div class="not-found">
    <div class="not-found__content">
      <GifView name="magnifying-glass" class="not-found__image" />
      <h1 class="not-found__text">
        {{ text }}
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: { type: String, default: 'Страница не найдена' }
})
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  &__content {
    padding-bottom: 50px;
    text-align: center;
  }
  &__text {
    margin: 30px 0 0;
    font-size: 21px;
    font-weight: 600;
    opacity: 0.8;
  }
}
</style>
