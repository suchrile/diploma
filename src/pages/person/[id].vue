<template>
  <div class="person-page">
    <LoaderView v-if="isLoading" />
    <div v-else-if="person" class="person-page__content">
      <PersonPageHeader :person="person" />
      <PersonPageDetails :person="person" class="person-page__details" />
      <FactsView :facts="person.facts" class="person-page__facts" />
      <PersonPageMovies :movies="person.movies" class="person-page__movies" />
    </div>
    <UiNotFound v-else />
  </div>
</template>

<script setup lang="ts">

const route = useRoute()
const { setTitle } = useHeader()

const person = ref()
const isLoading = ref(false)

onMounted(async () => {
  await fetchPerson()
  setTitle(person.value.name)
})

const fetchPerson = async () => {
  isLoading.value = true
  const { data } = await useApiFetch('/api/persons/' + route.params.id)
  if (data) {
    person.value = data
  }
  isLoading.value = false
}

definePageMeta({
  header: true,
  footer: true
})

</script>

<style scoped lang="scss">
.person-page {
  height: 100%;
  &__content {
    padding: 15px 0 50px;
  }
  &__details {
    margin-top: 20px;
  }
  &__facts {
    margin-top: 20px;
  }
  &__movies {
    margin-top: 20px;
  }
}
</style>
