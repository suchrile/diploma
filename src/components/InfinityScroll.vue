<template>
  <div class="infinity-scroll">
    <slot />
    <div ref="trigger" class="infinity-scroll-trigger" />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

const props = defineProps({
  threshold: { type: Number, default: 0.5 },
  loading: { type: Boolean, default: false }
})
const emit = defineEmits(['trigger'])

const trigger = ref()
const observer: Ref<IntersectionObserver | null> = ref(null)

onMounted(() => {
  observer.value = new IntersectionObserver(handleIntersect, { threshold: props.threshold })
  observer.value?.observe(trigger.value)
})
onBeforeUnmount(() => {
  observer.value?.unobserve(trigger.value)
})

const handleIntersect = (entries: IntersectionObserverEntry[]) => {
  if (!props.loading && entries[0].isIntersecting) {
    emit('trigger')
  }
}
</script>

<style scoped>

</style>
