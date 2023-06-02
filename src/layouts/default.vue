<template>
  <div class="default-layout">
    <HeaderView v-if="route.meta.header" />
    <div class="default-layout-view" :style="layoutStyle">
      <slot />
    </div>
    <FooterView v-if="route.meta.footer" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const layoutStyle = computed(() => {
  const showHeader = route.meta.header
  const showFooter = route.meta.footer
  return { height: `calc(100% ${showHeader ? '- var(--header-height)' : ''} ${showFooter ? '- var(--footer-height)' : ''})` }
})

</script>

<style>
.default-layout {
  height: 100%;
}
.default-layout-view {
  padding: 0 15px;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
