<template>
  <div class="search-page-tabs">
    <div
      v-for="(tab) in tabs"
      :key="tab.name"
      class="search-page-tabs__item"
      :class="{ active: tab.name === activeTabName }"
      @click="setActiveTab(tab.name)"
    >
      {{ tab.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const tabs = [
  { name: 'movies', label: 'Картины' },
  { name: 'persons', label: 'Персоны' },
  { name: 'users', label: 'Аккаунты' }
]

const activeTabName = ref(tabs[0].name)

onMounted(() => {
  initActiveTab()
})

const setActiveTab = (tabName: string) => {
  activeTabName.value = tabName
  router.replace({ query: { ...route.query, target: tabName } })
}

const initActiveTab = () => {
  const tab = route.query.target
  if (tab) {
    setActiveTab(String(tab))
  } else {
    setActiveTab(tabs[0].name)
  }
}

</script>

<style scoped lang="scss">
.search-page-tabs {
  display: flex;
  justify-content: space-between;
  overflow-x: scroll;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  &::after,
  &__item::after {
    content: '';
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    position: absolute;
  }
  &::after {
    background-color: rgba(255, 255, 255, 0.15);
  }
  &__item {
    width: 100%;
    padding: 15px 0;
    text-align: center;
    opacity: 0.5;
    overflow: hidden;
    position: relative;
    &::after {
      opacity: 0;
      background-color: #ffffff;
      transition: opacity 0.2s ease-in-out;
    }
    &.active {
      opacity: 1;
      &::after {
        background-color: #FF9E0B;
        opacity: 1;
      }
    }
  }
}
</style>
