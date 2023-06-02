<template>
  <Teleport to="body">
    <Transition name="overlay-slide">
      <div v-if="visible" class="ui-overlay">
        <div class="ui-overlay__header">
          <button class="ui-overlay__close" @click="emit('update:visible', false)">
            Закрыть
          </button>
          <h4 class="ui-overlay__title">
            {{ title }}
          </h4>
        </div>
        <div class="ui-overlay__content">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: '' }
})
const emit = defineEmits(['update:visible', 'show', 'hide'])

watch(props, () => {
  if (props.visible) {
    document.body.classList.add('layer')
    emit('show')
  } else {
    document.body.classList.remove('layer')
    emit('hide')
  }
})

</script>

<style scoped lang="scss">
.ui-overlay {
  top: 15px;
  left: 0;
  width: 100vw;
  height: calc(100% - 15px);
  border-radius: 12px 12px 0 0;
  background-color: #1c1c1c;
  overflow: hidden;
  position: absolute;
  z-index: 100;
  &__header {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    height: 55px;
    padding: 0 10px;
  }
  &__close {
    width: fit-content;
    padding: 8px 15px;
    font-size: 17px;
    border: none;
    outline: none;
    color: #FF9E0B;
    background-color: transparent;
  }
  &__title {
    margin: 0;
    font-size: 17px;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &__content {
    height: 100%;
  }
}

.overlay-slide-enter-active,
.overlay-slide-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.overlay-slide-enter-from,
.overlay-slide-leave-to {
  top: 100%;
}
</style>
