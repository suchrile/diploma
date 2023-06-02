<template>
  <div class="loader-ring">
    <div />
    <div />
    <div />
    <div />
  </div>
</template>

<style scoped lang="scss">
.loader-ring {
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    margin: 3px;
    border: 2.5px solid;
    border-radius: 50%;
    animation: loader-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #ffffff transparent transparent transparent;
  }
  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }
}

@keyframes loader-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
