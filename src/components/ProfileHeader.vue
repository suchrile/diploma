<template>
  <div class="profile-header">
    <ProfileHeaderImages :profile="profile" />
    <ProfileHeaderInfo :name="name" :username="profile.username" :description="profile.description" />
    <ProfileHeaderInfoAction :followed="profile.isFollowing" @follow="emit('follow')" @unfollow="emit('unfollow')" />
    <ProfileHeaderStats :stats="stats" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  profile: { type: Object, required: true }
})
const emit = defineEmits(['follow', 'unfollow'])

const name = `${props.profile.firstname} ${props.profile.lastname || ''}`

const stats = computed(() => ({
  followers: { label: 'подписчики', value: props.profile.followersCount },
  following: { label: 'подписки', value: props.profile.followingCount },
  favourites: { label: 'избранное', value: props.profile.favouritesCount },
  wishlist: { label: 'желаемое', value: props.profile.wishlistCount },
  posts: { label: 'посты', value: props.profile.postsCount }
}))
</script>

<style scoped lang="scss">
.profile-header {
  padding-bottom: 20px;
  position: relative;
  &::after {
    content: '';
    left: -15px;
    bottom: 0;
    width: 100vw;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.2);
    position: absolute;
  }
}
</style>
