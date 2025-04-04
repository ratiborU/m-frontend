export const monthsDictionary = {
  '1': 'Января',
  '2': 'Февраля',
  '3': 'Марта',
  '4': 'Апреля',
  '5': 'Мая',
  '6': 'Июня',
  '7': 'Июля',
  '8': 'Августа',
  '9': 'Сентября',
  '10': 'Октября',
  '11': 'Ноября',
  '12': 'Декабря',
}

export const parseDate = (inputDate: string) => {
  const date = new Date(inputDate);
  return `${date.getDate()} ${monthsDictionary[String(date.getMonth() + 1) as keyof typeof monthsDictionary]} ${date.getFullYear()}`
}