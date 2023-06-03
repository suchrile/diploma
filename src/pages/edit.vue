<template>
  <div v-if="userData" class="edit-page">
    <div class="edit-page__content">
      <div class="edit-page__images">
        <div class="edit-page__background" @click="backgroundInput.click()">
          <img :src="images.backgroundUrl || userData.images?.backgroundUrl || userBackgroundPlaceholderUrl" :alt="'Фон ' + userData.username">
          <input
            ref="backgroundInput"
            accept="image/*"
            type="file"
            hidden
            :disabled="isLoading"
            @change="handleImageUpload($event, 'background')"
          >
        </div>
        <div class="edit-page__avatar" @click="avatarInput.click()">
          <img :src="images.avatarUrl || userData.images?.avatarUrl || getAvatarPlaceholder(userData.username)" :alt="'Аватар ' + userData.username">
          <input
            ref="avatarInput"
            type="file"
            accept="image/*"
            hidden
            :disabled="isLoading"
            @change="handleImageUpload($event, 'avatar')"
          >
        </div>
      </div>

      <UiInput v-model="userData.firstname" :disabled="isLoading" placeholder="Имя" class="edit-page__field" />
      <UiInput v-model="userData.lastname" :disabled="isLoading" placeholder="Фамилия" class="edit-page__field" />
      <UiTextarea
        v-model="userData.description"
        :max-length="maxProfileDescriptionLength"
        :rows="4"
        :disabled="isLoading"
        placeholder="Описание профиля"
        class="edit-page__field"
      />
    </div>

    <div class="edit-page__actions">
      <UiButtonLarge :loading="isLoading" class="edit-page__save" @click="submit">
        Сохранить
      </UiButtonLarge>
      <UiButtonLarge tinted class="edit-page__logout" @click="logout">
        Выйти
      </UiButtonLarge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { maxProfileDescriptionLength, userBackgroundPlaceholderUrl } from '~/consts'

const { logout } = useAuth()
const { useUserData, updateUser } = useUser()
const { setTitle } = useHeader()

const backgroundInput = ref()
const avatarInput = ref()

const userData = useUserData()
const images = ref({})
const isLoading = ref(false)

onMounted(() => {
  setTitle('Профиль')
})

const handleImageUpload = (event: InputEvent, inputName: 'background' | 'avatar') => {
  const target = event.target as HTMLInputElement
  const files = target.files as FileList
  for (const file of files) {
    const reader = new FileReader()
    reader.onload = (event) => {
      const url = event.target!.result
      if (inputName === 'background') {
        images.value.backgroundUrl = url
      } else {
        images.value.avatarUrl = url
      }
    }
    reader.readAsDataURL(file)
  }
  if (inputName === 'background') {
    backgroundInput.value.value = null
  } else {
    avatarInput.value.value = null
  }
}

const submit = async () => {
  isLoading.value = true
  await updateUser({
    ...userData.value,
    images: images.value
  })
  await navigateTo('/' + userData.value.username)
}

definePageMeta({
  header: true
})
useHead({
  title: 'Профиль'
})
</script>

<style scoped lang="scss">
.edit-page {
  min-height: 100%;
  position: relative;
  &__content {
    padding: 0 0 150px;
  }
  &__images {
    margin: 0 -15px 65px;
    position: relative;
  }
  &__background {
    width: 100vw;
    height: 120px;
  }
  &__avatar {
    content: "";
    left: 20px;
    bottom: 0;
    width: 90px;
    height: 90px;
    border: 5px solid #000000;
    border-radius: 50%;
    transform: translateY(50%);
    position: absolute;
  }
  &__background,
  &__avatar {
    overflow: hidden;
    background-color: #000000;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__field:not(:last-child) {
    margin-bottom: 10px;
  }
  &__actions {
    left: 0;
    bottom: 15px;
    width: 100%;
    position: absolute;
  }
  &__logout {
    margin-top: 10px;
  }
}
</style>
