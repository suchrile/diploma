<template>
  <div v-if="shortDescription || description" class="movie-description">
    <div
      class="movie-description__content"
      :class="{collapsed: !isLongDescriptionShown}"
    >
      <p>
        {{ shortDescription || description }}
      </p>
      <p
        v-if="
          shortDescription
            &&
            description
            &&
            isLongDescriptionShown"
      >
        {{ description }}
      </p>
    </div>

    <div class="movie-description__show-more">
      <button v-if="shortDescription && description" @click="isLongDescriptionShown = !isLongDescriptionShown">
        {{ isLongDescriptionShown ? 'Свернуть' : 'Подробнее' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  shortDescription: { type: String, default: '' },
  description: { type: String, default: '' }
})

const isLongDescriptionShown = ref(false)

</script>

<style scoped lang="scss">
.movie-description {
  padding: 4px 0 14px;
  &__content.collapsed {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }
  & p {
    margin: 0;
    &:not(:first-child) {
      margin-top: 12px;
    }
  }
  &__show-more {
    display: flex;
    justify-content: flex-end;
    & button {
      margin-top: 6px;
      padding: 4px 8px;
      font-size: 16px;
      font-weight: 500;
      color: #FF9E0B;
      border: none;
      background: transparent;
      user-select: none;
    }
  }
}
</style>
