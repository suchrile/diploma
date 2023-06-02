<template>
  <div class="search-field">
    <div class="search-field__wrapper">
      <IconView name="magnifying-glass-regular" :size="19" class="search-field__icon" />
      <input
        v-model.trim="searchValue"
        type="text"
        placeholder="Поиск..."
        class="search-field__input"
        @keydown.enter="handleSubmit"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['search'])

const searchValue = ref('')

const handleSubmit = () => {
  if (searchValue.value) {
    emit('search', searchValue.value)
  }
}

</script>

<style scoped lang="scss">
.search-field {
  &__wrapper {
    position: relative;
  }
  &__icon {
    top: 50%;
    left: 14px;
    fill: rgba(255, 255, 255, 0.4);
    transform: translateY(-50%);
    position: absolute;
  }
  &__input {
    width: 100%;
    padding: 10px 15px 10px 45px;
    font-size: 17px;
    color: #ffffff;
    outline: none;
    border: none;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.15);
    box-sizing: border-box;
  }
}
</style>
