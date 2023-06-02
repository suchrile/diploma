<template>
  <div class="login-page">
    <h1 class="login-page__title">
      Вход
    </h1>
    <UiInput v-model.trim="authData.username" :disabled="isLoading" placeholder="Имя пользователя" />
    <UiInput v-model.trim="authData.password" type="password" :disabled="isLoading" placeholder="Пароль" />
    <UiButtonLarge :loading="isLoading" class="login-page__button" @click="submit">
      Войти
    </UiButtonLarge>
    <div class="login-page__signup">
      <span>Нет аккаунта?</span>
      <NuxtLink to="/signup">
        Создайте его
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">

const { login, useAuthLoading } = useAuth()

const authData = reactive({
  username: '',
  password: ''
})
const isLoading = useAuthLoading()

const submit = async () => {
  await login(authData)
}

definePageMeta({
  layout: 'auth'
})

useHead({
  title: 'Вход'
})

</script>

<style scoped lang="scss">
.login-page {
  padding: 20px 20px 40px 20px;
  &__title {
    margin: 0 0 20px;
  }
  & input:not(:last-of-type) {
    margin-bottom: 12px;
  }
  &__button {
    margin-top: 25px;
  }
  &__signup {
    margin-top: 30px;
    text-align: center;
    & span {
      margin-right: 2px;
    }
    & a {
      color: #FF9E0B;
      text-decoration: none;
    }
  }
}
</style>
