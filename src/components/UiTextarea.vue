<template>
  <textarea
    ref="textarea"
    :value="modelValue"
    :rows="autoResize ? (rows ? rows : 1) : (rows || 5)"
    :maxLength="maxLength"
    :placeholder="placeholder"
    :disabled="disabled"
    :style="{ height }"
    class="ui-textarea"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  rows: { type: Number, default: 0 },
  disabled: { type: Boolean, default: false },
  autoResize: { type: Boolean, default: false },
  maxHeight: { type: Number, default: 116 },
  maxLength: { type: Number, default: null }
})
const emit = defineEmits(['update:modelValue'])

const textarea = ref()
const height = ref()

const handleInput = async (event) => {
  emit('update:modelValue', event.target.value)

  if (props.autoResize) {
    height.value = 'auto'
    await nextTick()
    const scrollHeight = textarea.value.scrollHeight
    if (scrollHeight <= props.maxHeight) {
      height.value = scrollHeight + 'px'
    } else {
      height.value = props.maxHeight + 'px'
    }
  }
}
</script>

<style scoped>
.ui-textarea {
  width: 100%;
  padding: 12px 15px;
  font-size: 17px;
  color: #ffffff;
  outline: none;
  border: none;
  resize: none;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.15);
  box-sizing: border-box;
  transition: opacity 0.1s ease-in-out;
  &[disabled] {
    opacity: 0.6;
  }
}
</style>
