<template>
  <div class="login-page">
    <div class="login-page__content">
      <h1 class="login-page__title">
        Вход
      </h1>
      <form @submit.prevent="submit">
        <UiInput v-model.trim="authData.username" :disabled="isLoading" :error="v$.username.$error && v$.username.$errors[0].$message" placeholder="Имя пользователя" />
        <UiInput v-model.trim="authData.password" type="password" :disabled="isLoading" :error="v$.password.$error && v$.password.$errors[0].$message" placeholder="Пароль" />
        <p v-if="error" class="login-page__error">
          Неправильное имя пользователя и/или пароль
        </p>
        <UiButtonLarge type="submit" :loading="isLoading" class="login-page__button">
          Войти
        </UiButtonLarge>
      </form>
      <div class="login-page__signup">
        <span>Нет аккаунта?</span>
        <NuxtLink to="/signup">
          Создайте его
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

const { login, useAuthLoading } = useAuth()

const authData = reactive({
  username: '',
  password: ''
})
const error = ref()
const isLoading = useAuthLoading()

const rules = reactive({
  username: { required: helpers.withMessage('Введите имя пользователя', required) },
  password: { required: helpers.withMessage('Введите пароль', required) }
})
const v$ = useVuelidate(rules, authData)

const submit = async () => {
  const isValid = await v$.value.$validate()
  if (isValid) {
    error.value = await login(authData)
  }
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
  width: 100%;
  &__content {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px 20px 40px 20px;
  }
  &__title {
    margin: 0 0 20px;
  }
  & .ui-input:not(:last-child) {
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
  &__error {
    color: #ff453a;
  }
}
</style>
