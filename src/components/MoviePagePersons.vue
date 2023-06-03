<template>
  <div class="movie-page-persons">
    <h3 class="movie-page-persons__title">
      Актеры
    </h3>
    <div class="movie-page-persons__actors movie-page-persons-list">
      <PersonCardCompact v-for="actor in actors" :key="actor.id" :person="actor" class="movie-page-persons-list__item" />
    </div>

    <h3 class="movie-page-persons__title">
      Команда
    </h3>
    <div class="movie-page-persons__team movie-page-persons-list">
      <PersonCardCompact v-for="member in team" :key="member.id" :person="member" show-profession class="movie-page-persons-list__item" />
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  persons: { type: Array, required: true }
})

const sortPersons = (persons) => {
  const professionOrder = {
    director: 1,
    writer: 2,
    producer: 3,
    operator: 4,
    composer: 5,
    editor: 6,
    designer: 7,
    'voice-actor': 8
  }
  function getProfessionOrder (person) {
    const profession = person.enProfession
    if (profession in professionOrder) {
      return professionOrder[profession]
    } else {
      return Infinity // Все остальные значения будут сортироваться последними
    }
  }
  const sortedPersons = persons.sort((a, b) => getProfessionOrder(a) - getProfessionOrder(b))
  return sortedPersons
}

const actors = props.persons.filter(p => p.enProfession === 'actor')
const team = sortPersons(props.persons.filter(p => p.enProfession !== 'actor'))

</script>

<style scoped lang="scss">
.movie-page-persons {
  &__title {
    margin: 0 0 16px;
  }
  &-list {
    display: flex;
    gap: 15px;
    margin: 0 -15px;
    padding: 0 15px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__actors {
    margin-bottom: 25px;
  }
}
</style>
