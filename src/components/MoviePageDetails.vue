<template>
  <div class="movie-page-details">
    <h3 class="movie-page-details__title">
      О картине
    </h3>
    <MovieDescription :short-description="movie.shortDescription" :description="movie.description" />
    <ul class="movie-page-details__list">
      <li v-for="detail in details" :key="detail.label">
        <div v-if="detail.value" class="movie-page-details__item movie-page-details-item">
          <span class="movie-page-details-item__label">{{ detail.label }}</span>
          <span class="movie-page-details-item__value">{{ detail.value }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

import { MovieTypes } from '~/enums'

const props = defineProps({
  movie: { type: Object, required: true }
})

const getCurrencyFormatted = (value: number, currency: string) => {
  return `${new Intl.NumberFormat().format(value)} ${currency}`
}
const getDateFormatted = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}
const getPersonsByProfession = (value: string) => {
  const persons = props.movie.persons.filter(p => p.enProfession === value)
  if (persons.length) {
    return persons.map(p => p.name || p.enName).join(', ')
  }
}
const getProductionYears = () => {
  if (props.movie.releaseYears?.length) {
    const years = []
    props.movie.releaseYears.forEach((year) => {
      const start = year.start
      const end = year.end || 'по н.в.'
      if (start === end) {
        years.push(start)
      } else {
        years.push(`${start} – ${end}`)
      }
    })
    return years.join(', ')
  } else {
    return props.movie.year
  }
}

const details = ref([
  { label: 'Тип', value: MovieTypes[props.movie.type] },
  { label: 'Слоган', value: props.movie.slogan },
  { label: 'Жанр', value: props.movie.genres.map(g => g.name).join(', ') },
  { label: 'Страна', value: props.movie.countries.map(c => c.name).join(', ') },
  { label: 'Год производства', value: getProductionYears() },
  { label: 'Режиссер', value: getPersonsByProfession('director') },
  { label: 'Сценарий', value: getPersonsByProfession('writer') },
  { label: 'Продюсер', value: getPersonsByProfession('producer') },
  { label: 'Композитор', value: getPersonsByProfession('composer') },
  { label: 'Бюджет', value: props.movie.budget?.value && getCurrencyFormatted(props.movie.budget.value, props.movie.budget.currency) },
  { label: 'Сборы в мире', value: props.movie.fees.world?.value && getCurrencyFormatted(props.movie.fees.world.value, props.movie.fees.world.currency) },
  { label: 'Сборы в России', value: props.movie.fees.russia?.value && getCurrencyFormatted(props.movie.fees.russia.value, props.movie.fees.russia.currency) },
  { label: 'Премьера в мире', value: props.movie.premiere?.world && getDateFormatted(props.movie.premiere.world) },
  { label: 'Премьера в России', value: props.movie.premiere?.russia && getDateFormatted(props.movie.premiere.russia) }
])

</script>

<style scoped lang="scss">
.movie-page-details {
  &__title {
    margin: 0 0 10px;
  }
  &__show-long-description {
    display: flex;
    justify-content: flex-end;
    & button {
      padding: 4px 8px;
      color: #FF9E0B;
      border: none;
      background: transparent;
    }
  }
  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  &-item {
    display: grid;
    grid-template-columns: 45% 1fr;
    gap: 10px;
    padding: 7px 0;
    &__label {
      opacity: 0.5;
    }
  }
}
</style>
