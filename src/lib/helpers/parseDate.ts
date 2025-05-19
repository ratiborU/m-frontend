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

export const monthsDictionary2 = {
  '1': 'Январь',
  '2': 'Февраль',
  '3': 'Март',
  '4': 'Апрель',
  '5': 'Май',
  '6': 'Июнь',
  '7': 'Июль',
  '8': 'Август',
  '9': 'Сентябрь',
  '10': 'Октябрь',
  '11': 'Ноябрь',
  '12': 'Декабрь',
}

export const monthsDictionaryDays = {
  '0': 31,
  '1': 28,
  '2': 31,
  '3': 30,
  '4': 31,
  '5': 30,
  '6': 31,
  '7': 31,
  '8': 30,
  '9': 31,
  '10': 30,
  '11': 31,
}

export const parseDate = (inputDate: string) => {
  const date = new Date(inputDate);
  return `${date.getDate()} ${monthsDictionary[String(date.getMonth() + 1) as keyof typeof monthsDictionary]} ${date.getFullYear()}`
}

export const getLast30DaysDates = () => {
  const date = new Date();
  const newDates = [...Array(date.getDate())].map((x, i) => String(i + 1));
  const oldDates = [...Array(monthsDictionaryDays[String(date.getMonth() - 1) as keyof typeof monthsDictionaryDays] - date.getDate())].map((x, i) => String(date.getDate() + i + 1));
  return [...oldDates, ...newDates]
}

export const getLast12Monts = () => {
  const date = new Date();
  const newDates = [...Array(date.getMonth())].map((x, i) => monthsDictionary2[String(i + 2) as keyof typeof monthsDictionary2]);
  // console.log(newDates);
  const oldDates = [...Array(12 - date.getMonth())].map((x, i) => monthsDictionary2[String((date.getMonth() + i + 1) % 12 + 1) as keyof typeof monthsDictionary2]);
  // console.log(oldDates);
  return [...oldDates, ...newDates]
}