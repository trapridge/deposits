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

const Item = Type.Object(
  {
    type: Type.Union([Type.Literal('win'), Type.Literal('lose')]),
    value: Type.Integer({ minimum: 0, maximum: 86399 }),
  },
  { additionalProperties: false },
)

const Items = Type.Array(Item)

export const ItemsObj = Type.Object(
  {
    ['test']: Items,
    ['test2']: Items,
  },
  { additionalProperties: false },
)

export type ItemType = Static<typeof Item>
export type ItemsObjType = Static<typeof ItemsObj>
