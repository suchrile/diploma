<template>
  <Transition name="app-loader-fade">
    <LoaderView v-if="isLoading" />
    <div v-else id="app">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { initAuth } = useAuth()
const isLoading = ref(true)

onMounted(async () => {
  const startTime = performance.now()
  await initAuth()
  const endTime = performance.now()
  const diff = endTime - startTime
  if (diff < 1000) {
    setTimeout(() => {
      isLoading.value = false
    }, 1000 - diff)
  }
})

useHead({
  titleTemplate: (title) => {
    if (title) {
      return `${title} – Diploma`
    } else {
      return 'Diploma'
    }
  }
})

</script>

<style scoped>
.app-loader-fade-enter-active,
.app-loader-fade-leave-active {
  width: 100vw;
  height: 100vh;
  transition: all 0.5s ease;
  position: absolute;
}
.app-loader-fade-leave-active {
  transition: all 0.25s ease;
}

.app-loader-fade-enter-from,
.app-loader-fade-leave-to{
  transform: scale(0.95);
  opacity: 0;
}
</style>
