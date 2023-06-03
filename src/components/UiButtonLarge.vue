<template>
  <button :disabled="disabled" :class="{loading, tinted}" class="button-large">
    <UiLoaderRing class="button-large__loader" />
    <IconView v-if="icon" :name="icon" :size="20" />
    <span>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import icons from '@/assets/icons'

defineProps({
  icon: { type: String as PropType<keyof typeof icons>, default: '' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  tinted: { type: Boolean, default: false }
})

</script>

<style scoped lang="scss">
.button-large {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 48px;
  padding: 0 15px;
  font-weight: 600;
  color: #ffffff;
  outline: none;
  border: none;
  border-radius: 8px;
  background-color: #FF9E0B;
  appearance: none;
  -webkit-appearance: none;
  transition: background-color 0.1s ease-in-out;
  &__loader {
    display: none;
  }
  &:active {
    background-color: scale-color(#FF9E0B, $lightness: -15%);
  }
  &.loading {
    pointer-events: none;
    user-select: none;
    background-color: scale-color(#FF9E0B, $lightness: -15%);
    & i,
    & span {
      display: none;
    }
    .button-large__loader {
      display: unset;
    }
  }
  &.tinted {
    color: #FF9E0B;
    background-color: rgba(255, 255, 255, 0.15);
    & i {
      fill: #FF9E0B;
    }
  }
}
</style>
