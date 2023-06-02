<template>
  <div class="new-post-add-movie">
    <button v-if="!movie" class="new-post-add-movie__button" @click="isOverlayOpen = true">
      <IconView name="plus-regular" :size="40" />
    </button>
    <SearchMovieCard v-else :movie="movie" emit-on-click @click="removeMovie" />
    <NewPostSelectOverlay v-model:visible="isOverlayOpen" title="Выбор картины" @choose="setMovie" />
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['choose'])

const movie = ref()
const isOverlayOpen = ref(false)

const setMovie = (chosenMovie) => {
  isOverlayOpen.value = false
  emit('choose', chosenMovie.id)
  movie.value = chosenMovie
}

const removeMovie = () => {
  emit('choose', null)
  movie.value = null
}

</script>

<style scoped lang="scss">
.new-post-add-movie {
  &__button {
    width: 100%;
    height: 110px;
    border: none;
    outline: none;
    appearance: none;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.15);
    line-height: 0;
    & i {
      opacity: 0.5;
    }
  }
}
</style>
