<template>
  <div class="person-page-details">
    <h3 class="person-page-details__title">
      О персоне
    </h3>
    <ul class="person-page-details__list">
      <li v-for="detail in details" :key="detail.label">
        <div v-if="detail.value" class="person-page-details__item person-page-details-item">
          <span class="person-page-details-item__label">{{ detail.label }}</span>
          <span class="person-page-details-item__value">{{ detail.value }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  person: { type: Object, required: true }
})

const getDateFormatted = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}
const getAge = () => {
  const age = props.person.age
  let yearsString = 'лет'
  if (age % 10 === 1 && age % 100 !== 11) {
    yearsString = 'год'
  } else if (
    (age % 10 === 2 && age % 100 !== 12) ||
      (age % 10 === 3 && age % 100 !== 13) ||
      (age % 10 === 4 && age % 100 !== 14)
  ) {
    yearsString = 'года'
  }
  return `${age} ${yearsString}`
}

const details = ref([
  { label: 'Возраст', value: props.person.age && getAge() },
  { label: 'Рост', value: props.person.growth && props.person.growth + ' см' },
  { label: 'Карьера', value: props.person.profession.map(p => p.value).join(', ') },
  { label: 'Дата рождения', value: props.person.birthday && getDateFormatted(props.person.birthday) },
  { label: 'Место рождения', value: props.person.birthPlace && props.person.birthPlace.map(p => p.value).join(', ') },
  { label: 'Дата смерти', value: props.person.death && getDateFormatted(props.person.death) },
  { label: 'Место смерти', value: props.person.deathPlace && props.person.deathPlace.map(p => p.value).join(', ') }
])

</script>

<style scoped lang="scss">
.person-page-details {
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
