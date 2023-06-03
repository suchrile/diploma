<template>
  <div class="ui-input">
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="{invalid: invalid || error}"
      @input="emit('update:modelValue', $event.target.value)"
    >
    <small v-if="error" class="ui-input__error">{{ error }}</small>
  </div>
</template>

<script setup lang="ts">
import { PropType, Ref } from 'vue'

defineProps({
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  modelValue: { type: String, default: '' },
  invalid: { type: Boolean, default: false },
  error: { type: [String, Boolean] as PropType<string | boolean | Ref<string>>, default: false }
})
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
.ui-input {
  & input {
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
    &.invalid {
      border: 1px solid #ff453a;
    }
  }
  &__error {
    display: block;
    margin-top: 8px;
    font-size: 14px;
    color: #ff453a;
  }
}
</style>
