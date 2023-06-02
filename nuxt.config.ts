// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-nocheck

export default defineNuxtConfig({
  srcDir: 'src/',
  css: ['normalize.css', '@/assets/style.css'],
  runtimeConfig: {
    jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    kinopoiskApiUrl: process.env.KINOPOISK_API_URL,
    kinopoiskApiKey: process.env.KINOPOISK_API_KEY
  }
})
