<template>
  <div class="signup-page">
    <h1 class="signup-page__title">
      Регистрация
    </h1>
    <UiInput v-model="signupData.firstname" :disabled="isLoading" placeholder="Ваше имя" />
    <UiInput v-model="signupData.username" :disabled="isLoading" placeholder="Имя пользователя" />
    <UiInput v-model="signupData.password" type="password" :disabled="isLoading" placeholder="Пароль" />
    <UiInput v-model="signupData.passwordConfirmation" type="password" :disabled="isLoading" placeholder="Повторите пароль" />
    <UiButtonLarge :loading="isLoading" class="signup-page__button" @click="submit">
      Зарегистрироваться
    </UiButtonLarge>
    <div class="signup-page__login">
      <span>Есть аккаунт?</span>
      <NuxtLink to="/login">
        Войти
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">

const { signup, useAuthLoading } = useAuth()

const signupData = reactive({
  firstname: '',
  username: '',
  password: '',
  passwordConfirmation: ''
})
const isLoading = useAuthLoading()

const submit = async () => {
  await signup({
    firstname: signupData.firstname,
    username: signupData.username,
    password: signupData.password
  })
}

definePageMeta({
  layout: 'auth'
})

useHead({
  title: 'Регистрация'
})

</script>

<style scoped lang="scss">
.signup-page {
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
  &__login {
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
