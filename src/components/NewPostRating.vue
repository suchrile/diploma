<template>
  <div class="new-post-rating">
    <IconView
      v-for="value in stars"
      :key="value"
      name="star-regular"
      :size="28"
      :style="{fill: value <= modelValue ? '#FF9E0B' : 'rgba(255, 255, 255, 0.3)'}"
      class="new-post-rating__star"
      @click="emit('update:modelValue', value)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: { type: Number, default: 1 }
})
const emit = defineEmits(['update:modelValue'])

const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

</script>

<style scoped lang="scss">
.new-post-rating {
  display: flex;
  justify-content: space-between;
  &__star {
    transition: fill 0.2s ease-in-out;
  }
}
</style>
