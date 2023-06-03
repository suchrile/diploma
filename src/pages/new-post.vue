<template>
  <div class="new-post-page">
    <div class="new-post-page__movie">
      <h5 class="new-post-page__title">
        Картина
      </h5>
      <NewPostAddMovie @choose="postData.movieId = $event" />
      <small v-if="v$.movieId.$error" class="new-post-page__error">{{ v$.movieId.$errors[0].$message }}</small>
    </div>
    <div class="new-post-page__comment">
      <h5 class="new-post-page__title">
        Текст поста
      </h5>
      <UiTextarea v-model="postData.text" :rows="6" placeholder="Введите текст поста" />
      <small v-if="v$.text.$error" class="new-post-page__error">{{ v$.text.$errors[0].$message }}</small>
    </div>
    <div class="new-post-page__images">
      <h5 class="new-post-page__title">
        Медиа
      </h5>
      <NewPostImages v-model="postData.images" />
    </div>
    <div class="new-post-page__users">
      <h5 class="new-post-page__title">
        Пользователи
      </h5>
      <NewPostUsers @update:model-value="postData.users = $event" />
    </div>
    <div class="new-post-page__rating">
      <h5 class="new-post-page__title" style="margin-bottom: 15px;">
        Ваша оценка
      </h5>
      <NewPostRating v-model="postData.movieRating" />
    </div>
    <UiButtonLarge :loading="isLoading" class="new-post-page__publish" @click="submit">
      Опубликовать
    </UiButtonLarge>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'

const { setTitle } = useHeader()
const { useUserData } = useUser()
const user = useUserData()

const postData = reactive({
  movieId: null,
  text: '',
  movieRating: 1,
  images: [],
  users: []
})
const isLoading = ref(false)

const rules = reactive({
  movieId: { required: helpers.withMessage('Выберите картину', required) },
  text: { required: helpers.withMessage('Введите текст поста', required) }
})
const v$ = useVuelidate(rules, postData)

onMounted(() => {
  setTitle('Новый пост')
})

const submit = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) { return }
  isLoading.value = true
  const { data } = await useApiFetch('/api/posts', {
    method: 'POST',
    body: { ...postData, authorId: user.value.id }
  })
  if (data) {
    await navigateTo('/post/' + data.id)
  }
  isLoading.value = false
}

definePageMeta({
  header: true,
  footer: true
})

useHead({
  title: 'Новый пост'
})

</script>

<style scoped lang="scss">
.new-post-page {
  padding: 15px 0 50px;
  &__title {
    margin: 0 0 12px;
    font-size: 18px;
  }
  &__images,
  &__comment,
  &__rating,
  &__users {
    margin-top: 15px;
  }
  &__publish {
    margin-top: 35px;
  }
  &__error {
    display: block;
    margin-top: 8px;
    font-size: 14px;
    color: #ff453a;
  }
}
</style>
