<template>
  <div class="post-view-header-author-names">
    <span v-for="(author, index) in authors" :key="author.username" class="post-view-header-author-names__item">
      <RouterLink :to="'/' + author.username">
        {{ author.username }}
      </RouterLink>
      <span v-if="index < authors.length - 1">{{ getAuthorNameSeparator(index) }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  authors: { type: Array, required: true }
})

const getAuthorNameSeparator = (index: number) => {
  return index < props.authors.length - 2 ? ', ' : ' и '
}
</script>

<style scoped lang="scss">
.post-view-header-author-names {
  &__item {
    font-size: 15px;
    & a {
      font-weight: 600;
      color: #ffffff;
      text-decoration: none;
    }
  }
}
</style>
