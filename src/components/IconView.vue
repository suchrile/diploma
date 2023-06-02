<template>
  <i v-if="icon" class="icon-view">
    <svg xmlns="http://www.w3.org/2000/svg" :viewBox="icon.viewBox" :height="size" v-html="icon.code" />
  </i>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import icons from '@/assets/icons'

const props = defineProps({
  name: { type: String as PropType<keyof typeof icons>, required: true },
  size: { type: Number, default: 22 }
})

const icon = icons[props.name]

</script>

<style scoped lang="scss">
.icon-view {
  display: inline-flex;
  align-items: center;
  fill: #ffffff;
  line-height: 1;
}
</style>
