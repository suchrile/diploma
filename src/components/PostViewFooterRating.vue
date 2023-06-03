<template>
  <div class="post-view-footer-rating">
    <IconView name="star-solid" class="post-view-footer-rating__icon" />
    <span class="post-view-footer-rating__score">{{ value }} / 10</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  value: { type: Number, required: true }
})
</script>

<style scoped lang="scss">
.post-view-footer-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  &__icon {
    fill: #FF9E0B;
  }
  &__score {
    font-size: 18px;
    font-weight: 600;
    line-height: 1;
  }
}
</style>
