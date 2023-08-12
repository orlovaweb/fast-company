const displayMonth = (num) => {
  switch (num) {
    case 0:
      return "января";
    case 1:
      return "февраля";
    case 2:
      return "марта";
    case 3:
      return "апреля";
    case 4:
      return "мая";
    case 5:
      return "июня";
    case 6:
      return "июля";
    case 7:
      return "августа";
    case 8:
      return "сентября";
    case 9:
      return "октября";
    case 10:
      return "ноября";
    case 11:
      return "декабря";
    default:
      break;
  }
};
export default function displayDate(publishedTime) {
  const timeInterval = Date.now() - publishedTime;
  if (timeInterval < 60_000) {
    return "1 минуту назад";
  }
  if (timeInterval < 300_000) {
    return "5 минут назад";
  }
  if (timeInterval < 600_000) {
    return "10 минут назад";
  }
  if (timeInterval < 1_800_000) {
    return "30 минут назад";
  }
  const fullPublishedDate = new Date(Number(publishedTime));
  const publishedDay = new Date(Number(publishedTime));
  publishedDay.setHours(0, 0, 0, 0);
  const currentDay = new Date();
  currentDay.setHours(0, 0, 0, 0);
  if (publishedDay.getTime() === currentDay.getTime()) {
    // текущий день
    return `${fullPublishedDate.getHours()}:${fullPublishedDate.getMinutes()}`;
  }
  publishedDay.setDate(1);
  publishedDay.setMonth(1);
  currentDay.setDate(1);
  currentDay.setMonth(1);
  if (publishedDay.getTime() === currentDay.getTime()) {
    // текущий год

    return `${fullPublishedDate.getDate()} ${displayMonth(
      fullPublishedDate.getMonth()
    )}`;
  }
  return `${fullPublishedDate.getDate()} ${displayMonth(
    fullPublishedDate.getMonth()
  )} ${fullPublishedDate.getFullYear()}`;
}
