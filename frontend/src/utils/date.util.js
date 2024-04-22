// Return a formatted date string from a datetime string
export function getDateString(datetimeString, separator = '-') {
  if (!datetimeString) return ''

  const yyyymmddString = datetimeString.split('T')[0]
  const [year, month, day] = yyyymmddString.split('-')
  return day + separator + month + separator + year
}

// Return a formatted datetime string from a datetime string
export function getDatetimeString(datetimeString, separator) {
  if (!datetimeString) return ''

  const yyyymmddString = datetimeString.split('T')[0]
  const hhmmssString = datetimeString.split('T')[1]?.split('.')[0]
  const [year, month, day] = yyyymmddString.split('-')
  return day + separator + month + separator + year + ' ' + hhmmssString
}
