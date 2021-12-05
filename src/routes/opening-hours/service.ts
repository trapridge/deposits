import { Day, EventType, OpeningHoursType } from './types'
import { Circular, Node } from 'singlie'
import { getAmPmHours } from './helpers'

interface EventWithDay extends EventType {
  day?: keyof OpeningHoursType
}

const parseToList = (body: OpeningHoursType): Circular<EventWithDay> => {
  const eventsWithDays = Object.values(Day).flatMap((day) =>
    body[day as Day].map((event) => ({
      ...event,
      ...(event.type === 'open' ? { day } : {}),
    })),
  )
  return new Circular().append(...eventsWithDays)
}

const getDaysWithEvents = (body: OpeningHoursType): Day[] => {
  return (Object.keys(Day) as (keyof typeof Day)[]).reduce<Day[]>(
    (result, day) => {
      const dayHasOpenEvents = body[Day[day]].some(
        (event) => event.type === 'open',
      )
      return dayHasOpenEvents ? [...result, Day[day]] : result
    },
    [],
  )
}

const generateResponse = (
  daysWithEvents: Day[],
  list: Circular<EventWithDay>,
) => {
  const { head } = list
  let current = head as Node<EventWithDay> | null | undefined
  /* istanbul ignore if */
  if (current?.value.type === 'close') {
    current = current?.next
  }
  return (Object.keys(Day) as (keyof typeof Day)[]).reduce<string>(
    (result, day) => {
      if (!daysWithEvents.includes(Day[day])) {
        return (result += `${day}: Closed\n`)
      }
      let dailyEvents: string[] = []
      /* istanbul ignore next */
      while (current?.value.day === Day[day]) {
        dailyEvents = [
          ...dailyEvents,
          `${getAmPmHours(current?.value.value)} - ${getAmPmHours(
            current?.next?.value.value,
          )}`,
        ]
        current = current?.next?.next as Node<EventWithDay>
      }
      return (result += `${day}: ${dailyEvents.join(', ')}\n`)
    },
    '',
  )
}

export const processOpeningHours = (body: OpeningHoursType) => {
  const daysWithEvents = getDaysWithEvents(body)
  const eventList = parseToList(body)
  return generateResponse(daysWithEvents, eventList)
}
