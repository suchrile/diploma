<template>
  <header class="header-view">
    <div class="header-view__container">
      <button class="header-view__back" @click="router.back()">
        <IconView name="chevron-regular" :size="22" />
      </button>
      <span class="header-view__route-name">{{ title }}</span>
      <div class="header-view__actions" />
    </div>
  </header>
</template>

<script setup lang="ts">
const router = useRouter()
const { useTitle } = useHeader()
const title = useTitle()
</script>

<style scoped lang="scss">
.header-view {
  height: 46px;
  &__container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    top: 0;
    left: 0;
    width: calc(100vw - 30px);
    height: inherit;
    padding: 0 15px;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(20px);
    position: fixed;
    z-index: 100;
    body.layer & {
      background-color: transparent;
      backdrop-filter: unset;
    }
  }
  &__back {
    padding: 3px 0 0 6px;
    text-align: left;
    border: none;
    background: transparent;
    & i {
      fill: #FF9E0B;
      transform: rotate(180deg);
    }
  }
  &__route-name {
    font-size: 17px;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &__actions {
    text-align: right;
  }
}
</style>
