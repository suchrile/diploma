export const useHeader = () => {
  const useTitle = () => useState('header_title', () => '')

  const setTitle = (title: string) => {
    const headerTitle = useTitle()
    headerTitle.value = title
  }

  return { useTitle, setTitle }
}
