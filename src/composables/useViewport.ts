export const useViewport = () => {
  const useScrollY = () => useState('viewport_scroll_y', () => 0)

  const setScrollY = () => {
    const scrollY = useScrollY()
    scrollY.value = window.scrollY
  }

  onMounted(() => {
    window.addEventListener('scroll', setScrollY)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', setScrollY)
  })

  return { useScrollY }
}
