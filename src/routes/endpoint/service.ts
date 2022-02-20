import { ItemsObjType } from './types'

const generateResponse = (
  body: ItemsObjType,
): string => {
  return JSON.stringify(body)
}

export const processOpeningHours = (body: ItemsObjType) => {
  return generateResponse(body)
}
