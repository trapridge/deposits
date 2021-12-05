import { OpeningHoursType } from './types'

export const validateEvents = async (body: OpeningHoursType) => {
  const validationErrorPrefix = 'Invalid opening hours in request body. '
  const weekEvents = Object.values(body)

  const overSpanMessage =
    validationErrorPrefix + 'Opening hours cannot span over more than two days'
  for (let i = 0; i < weekEvents.length; i++) {
    const dayEvents = weekEvents[i]
    if (dayEvents.length === 0) {
      if (i === weekEvents.length - 1) {
        if (weekEvents[0].length > 0 && weekEvents[0][0].type !== 'open') {
          throw new Error(overSpanMessage)
        }
      } else {
        if (
          weekEvents[i + 1].length > 0 &&
          weekEvents[i + 1][0].type !== 'open'
        ) {
          throw new Error(overSpanMessage)
        }
      }
    }
  }

  const events = weekEvents.flat()
  if (events.length === 0) {
    return
  }

  if (events.length % 2 !== 0) {
    throw new Error(
      validationErrorPrefix + 'There must must be an even number of events',
    )
  }

  const alternatingErrorMessage =
    validationErrorPrefix + "'open' and 'close' events must alternate"
  const firstIsOpen = events[0].type === 'open'
  let i = 0
  for (const event of events) {
    const isEven = i % 2 === 0
    if (firstIsOpen) {
      if (
        (isEven && event.type !== 'open') ||
        (!isEven && event.type === 'open')
      ) {
        throw new Error(alternatingErrorMessage)
      }
    } else {
      if (
        (isEven && event.type === 'open') ||
        (!isEven && event.type !== 'open')
      ) {
        throw new Error(alternatingErrorMessage)
      }
    }
    i++
  }
}
