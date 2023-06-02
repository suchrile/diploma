<template>
  <div :style="{'margin-bottom': images.length === 1 && '15px'}" class="post-view-gallery">
    <Swiper
      :slides-per-view="1"
      :space-between="15"
      :pagination="{ clickable: true }"
      :modules="modules"
      class="post-view-gallery__slider"
    >
      <SwiperSlide v-for="(image, index) in images" :key="image.id" class="post-view-gallery__slide">
        <img :src="image.url" :alt="'Изображение ' + index">
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'

const modules = [Pagination]

defineProps({
  images: { type: Array, default: () => [] }
})
</script>

<style  lang="scss">
.post-view-gallery {
  margin: 0 -15px;
  &__slide {
    aspect-ratio: 1/1;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .swiper-pagination {
    margin-top: 10px;
    position: relative;
  }
  .swiper-pagination-bullet {
    background-color: #ffffff;
  }
}
</style>
