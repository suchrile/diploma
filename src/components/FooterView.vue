<template>
  <footer class="footer">
    <div class="footer__container">
      <RouterLink
        v-for="link in links"
        :key="link.url"
        :to="link.url"
        :class="{active: link.name === route.name}"
        class="footer__link footer-link"
      >
        <IconView :name="link.icon" :size="20" class="footer-link__icon" />
        <span class="footer-link__name">{{ link.label }}</span>
      </RouterLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
const route = useRoute()
const { useUserData } = useUser()
const user = useUserData()

const links = ref([
  { label: 'Лента', name: 'index', url: '/', icon: 'house-chimney-regular' },
  { label: 'Рандом', name: 'random', url: '/random', icon: 'dice-regular' },
  { label: 'Пост', name: 'new-post', url: '/new-post', icon: 'plus-regular' },
  { label: 'Поиск', name: 'search', url: '/search', icon: 'magnifying-glass-regular' },
  { label: 'Профиль', name: 'username', url: `/${user.value.username}`, icon: 'user-large-regular' }
])
</script>

<style scoped lang="scss">
.footer {
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 58px;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px);
  position: fixed;
  z-index: 1;
  &__container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
  }
  &-link {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    color: #ffffff;
    text-decoration: none;
    opacity: 0.55;
    &__name {
      font-size: 13px;
    }
    &.active {
      opacity: 1;
      color: #FF9E0B;
      & i {
        fill: #FF9E0B;
      }
    }
  }
}
</style>
