<template>
  <div class="post-comments-form">
    <div class="post-comments-form__wrapper">
      <UiTextarea
        :model-value="modelValue"
        auto-resize
        placeholder="Ваш комментарий"
        class="post-comments-form__textarea"
        @update:model-value="emit('update:modelValue', $event)"
      />
      <button :disabled="!modelValue" class="post-comments-form__button" @click="emit('submit')">
        <IconView name="arrow-solid" :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue', 'submit'])

</script>

<style scoped lang="scss">
.post-comments-form {
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  position: fixed;
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 44px;
    align-items: center;
    gap: 10px;
    padding: 10px;
  }
  &__textarea {
    min-height: 44px;
    font-size: 16px;
    line-height: 1.3;
  }
  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/1;
    margin: 3px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background-color: #FF9E0B;
    transition: opacity 0.2s ease-in-out;
    &[disabled] {
      opacity: 0.5;
    }
  }
}
</style>
