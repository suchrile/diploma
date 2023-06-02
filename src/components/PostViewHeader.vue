<template>
  <div class="post-view-header">
    <PostViewHeaderAvatars :authors="authors" />
    <PostViewHeaderAuthorNames :authors="authors" />
  </div>
</template>

<script setup lang="ts">

defineProps({
  authors: { type: Object, required: true }
})

</script>

<style scoped lang="scss">
.post-view-header {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
