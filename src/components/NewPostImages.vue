<template>
  <div class="new-post-images">
    <div class="new-post-images__list">
      <button class="new-post-images__add" @click="input.click()">
        <IconView name="plus-regular" :size="40" />
      </button>
      <TransitionGroup name="list">
        <NewPostImage
          v-for="image in modelValue"
          :key="image.tempId"
          :src="image.url"
          :alt="image.tempId"
          class="new-post-images__item"
          @click="deleteImage(image.tempId)"
        />
      </TransitionGroup>
    </div>

    <input
      ref="input"
      type="file"
      accept="image/*"
      multiple
      hidden
      @change="handleImagesUpload"
    >
  </div>
</template>

<script setup lang="ts">
import { v4 as uuid } from 'uuid'

const props = defineProps({
  modelValue: { type: Array, default: () => [] }
})
const emit = defineEmits(['update:modelValue'])

const input = ref()

const handleImagesUpload = (event: InputEvent) => {
  const target = event.target as HTMLInputElement
  const files = target.files as FileList
  for (const file of files) {
    const reader = new FileReader()
    reader.onload = (event) => {
      const url = event.target!.result
      if (!props.modelValue.find(img => img.url === url)) {
        emit('update:modelValue', [...props.modelValue, { tempId: uuid(), url }])
      }
    }
    reader.readAsDataURL(file)
  }
  input.value.value = null
}
const deleteImage = (tempId: string) => {
  emit(
    'update:modelValue',
    props.modelValue.filter(img => img.tempId !== tempId)
  )
}
</script>

<style scoped lang="scss">
.new-post-images {
  &__list {
    display: flex;
    gap: 10px;
    margin: 0 -15px;
    padding: 0 15px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__item {
    min-width: 100px;
    max-width: 100px;
    height: 100px;
  }
  &__add {
    min-width: 100px;
    max-width: 100px;
    aspect-ratio: 1/1;
    border: none;
    outline: none;
    appearance: none;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.15);
    line-height: 0;
    & i {
      opacity: 0.5;
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
