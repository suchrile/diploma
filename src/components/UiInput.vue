<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    class="ui-input"
    @input="emit('update:modelValue', $event.target.value)"
  >
</template>

<script setup lang="ts">
defineProps({
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  modelValue: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
.ui-input {
  width: 100%;
  padding: 10px 15px;
  font-size: 17px;
  color: #ffffff;
  outline: none;
  border: none;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.15);
  box-sizing: border-box;
  transition: opacity 0.1s ease-in-out;
  &[disabled] {
    opacity: 0.6;
  }
}
</style>
