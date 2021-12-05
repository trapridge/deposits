import { Static, Type } from '@sinclair/typebox'

export enum Day {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

const Event = Type.Object(
  {
    type: Type.Union([Type.Literal('open'), Type.Literal('close')]),
    value: Type.Integer({ minimum: 0, maximum: 86399 }),
  },
  { additionalProperties: false },
)

const Events = Type.Array(Event)

export const OpeningHoursSchema = Type.Object(
  {
    [Day.Monday]: Events,
    [Day.Tuesday]: Events,
    [Day.Wednesday]: Events,
    [Day.Thursday]: Events,
    [Day.Friday]: Events,
    [Day.Saturday]: Events,
    [Day.Sunday]: Events,
  },
  { additionalProperties: false },
)

export type EventType = Static<typeof Event>
export type OpeningHoursType = Static<typeof OpeningHoursSchema>
