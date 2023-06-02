export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const currentDate = new Date()
  const diff = Math.floor((currentDate.getTime() - date.getTime()) / 1000) // Разница в секундах

  if (diff < 60) {
    return 'только что'
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60)
    return `${minutes} ${getMinutesText(minutes)} назад`
  } else if (diff < 7200) {
    return 'час назад'
  } else if (diff < 14400) {
    const hours = Math.floor(diff / 3600)
    return `${hours} ${getHoursText(hours)} назад`
  } else if (checkIfSameDate(date, currentDate)) {
    const formattedTime = getTimeString(date)
    return `сегодня в ${formattedTime}`
  } else if (checkIfSameDate(date, new Date(currentDate.getTime() - 24 * 60 * 60 * 1000))) {
    const formattedTime = getTimeString(date)
    return `вчера в ${formattedTime}`
  } else if (checkIfSameDate(date, new Date(currentDate.getTime() - 48 * 60 * 60 * 1000))) {
    const formattedTime = getTimeString(date)
    return `позавчера в ${formattedTime}`
  } else if (diff < 31536000) {
    const formattedDate = formatDateWithoutYear(date)
    const formattedTime = getTimeString(date)
    return `${formattedDate} в ${formattedTime}`
  } else {
    const formattedDate = formatDateWithYear(date)
    const formattedTime = getTimeString(date)
    return `${formattedDate} в ${formattedTime}`
  }
}

const checkIfSameDate = (date1: Date, date2: Date) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear()

const getMinutesText = (minutes: number) => {
  if (minutes === 1) {
    return 'минуту'
  } else if (minutes >= 2 && minutes <= 4) {
    return 'минуты'
  } else {
    return 'минут'
  }
}

const getHoursText = (hours: number) => {
  if (hours === 1) {
    return 'час'
  } else if (hours >= 2 && hours <= 4) {
    return 'часа'
  } else {
    return 'часов'
  }
}

const getTimeString = (date: Date) => {
  return new Date(date).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatDateWithoutYear = (date: Date) => {
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' })
}

const formatDateWithYear = (date: Date) => {
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}
