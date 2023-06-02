<template>
  <LoaderView v-if="isLoading" class="person-page__loading" />
  <div v-else-if="person" class="person-page">
    <PersonPageHeader :person="person" />
    <PersonPageDetails :person="person" class="person-page__details" />
    <FactsView :facts="person.facts" class="person-page__facts" />
    <PersonPageMovies :movies="person.movies" class="person-page__movies" />
  </div>
</template>

<script setup lang="ts">

const route = useRoute()
const { setTitle } = useHeader()

const person = ref()
const isLoading = ref(true)

onMounted(async () => {
  await nextTick()
  await fetchPerson()
  setTitle(person.value.name)
})

const fetchPerson = async () => {
  isLoading.value = true
  const data = await $fetch('/api/persons/' + route.params.id)
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
  padding: 15px 0;
  &__details {
    margin-top: 20px;
  }
  &__facts {
    margin-top: 20px;
  }
  &__movies {
    margin-top: 20px;
  }
  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 48px);
  }
}
</style>
