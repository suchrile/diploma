<template>
  <div class="signup-page">
    <div class="signup-page__content">
      <h1 class="signup-page__title">
        Регистрация
      </h1>
      <form @submit.prevent="submit">
        <UiInput v-model.trim="signupData.firstname" :disabled="isLoading" :error="v$.firstname.$error && v$.firstname.$errors[0].$message" placeholder="Ваше имя" />
        <UiInput v-model.trim="signupData.username" :disabled="isLoading" :error="v$.username.$error && v$.username.$errors[0].$message" placeholder="Имя пользователя" />
        <UiInput v-model.trim="signupData.password" type="password" :disabled="isLoading" :error="v$.password.$error && v$.password.$errors[0].$message" placeholder="Пароль" />
        <UiInput v-model.trim="signupData.passwordConfirmation" type="password" :disabled="isLoading" :error="v$.passwordConfirmation.$error && v$.passwordConfirmation.$errors[0].$message" placeholder="Повторите пароль" />
        <p v-if="error" class="signup-page__error">
          Имя пользователя занято
        </p>
        <UiButtonLarge type="submit" :loading="isLoading" class="signup-page__button">
          Зарегистрироваться
        </UiButtonLarge>
      </form>
      <div class="signup-page__login">
        <span>Есть аккаунт?</span>
        <NuxtLink to="/login">
          Войти
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { minLength, sameAs, required, helpers, maxLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { minPasswordLength, usernameRegexp, usernameReservedWordsRegexp } from '~/consts'

const { signup, useAuthLoading } = useAuth()

const signupData = reactive({
  firstname: '',
  username: '',
  password: '',
  passwordConfirmation: ''
})
const error = ref()
const isLoading = useAuthLoading()

const rules = computed(() => ({
  firstname: { required: helpers.withMessage('Введите Ваше имя', required) },
  username: {
    username: helpers.withMessage('Некорректное имя пользователя', helpers.regex(usernameRegexp)),
    minLength: helpers.withMessage('Минимальная длина – 3 символа', minLength(3)),
    maxLength: helpers.withMessage('Максимальная длина – 20 символа', maxLength(20)),
    reservedWord: helpers.withMessage('Зарезервированное слово', helpers.regex(usernameReservedWordsRegexp)),
    required: helpers.withMessage('Введите имя пользователя', required)
  },
  password: {
    minLength: helpers.withMessage(`Минимальная длина – ${minPasswordLength} символов`, minLength(minPasswordLength)),
    required: helpers.withMessage('Введите пароль', required)
  },
  passwordConfirmation: {
    sameAs: helpers.withMessage('Пароли не совпадают', sameAs(signupData.password)),
    required: helpers.withMessage('Введите пароль еще раз', required)
  }
}))
const v$ = useVuelidate(rules, signupData)

const submit = async () => {
  const isValid = await v$.value.$validate()
  if (isValid) {
    error.value = await signup({
      firstname: signupData.firstname,
      username: signupData.username,
      password: signupData.password
    })
  }
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
  &__error {
    color: #ff453a;
  }
}
</style>
