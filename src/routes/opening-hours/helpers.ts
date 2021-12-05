/* istanbul ignore next */
export const getAmPmHours = (unixTime: number = 0): string => {
  const str = new Date(unixTime * 1000).toLocaleString('en-US', {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
  return str.replace(':00', '')
}
