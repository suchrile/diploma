<template>
  <div class="movie-page-header">
    <MoviePageHeaderInfo :movie="movie" class="movie-page-header__info" />
    <MoviePageRatings v-if="Object.keys(movie.rating).length" :rating="movie.rating" class="movie-page-header__ratings" />
    <div class="movie-page-header__actions">
      <UiButtonLarge icon="heart-regular" :tinted="movie.isInWishlist" class="movie-page-header__button" @click="handleWishlistButtonClick">
        {{ movie.isInWishlist ? 'В желаемом' : 'В желаемое' }}
      </UiButtonLarge>
      <UiButtonLarge icon="bookmark-regular" :tinted="movie.isInFavourites" class="movie-page-header__button" @click="handleFavouritesButtonClick">
        {{ movie.isInFavourites ? 'В избранном' : 'В избранное' }}
      </UiButtonLarge>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  movie: { type: Object, required: true }
})
const emit = defineEmits(['add-to-wishlist', 'remove-from-wishlist', 'remove-from-favourites', 'add-to-favourites'])

const handleWishlistButtonClick = () => {
  props.movie.isInWishlist ? emit('remove-from-wishlist') : emit('add-to-wishlist')
}

const handleFavouritesButtonClick = () => {
  props.movie.isInFavourites ? emit('remove-from-favourites') : emit('add-to-favourites')
}

</script>

<style scoped lang="scss">
.movie-page-header {
  &__ratings {
    margin-top: 6px;
  }
  &__actions {
    display: flex;
    gap: 10px;
    margin-top: 12px;
  }
}
</style>
