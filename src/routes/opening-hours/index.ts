import { FastifyPluginAsync } from 'fastify'
import { OpeningHoursSchema, OpeningHoursType } from './types'

import { validateEvents } from './pre-handlers'
import { processOpeningHours } from './service'
import { Type } from '@sinclair/typebox'

const openingHours: FastifyPluginAsync = async (
  fastify,
  opts,
): Promise<void> => {
  fastify.post<{ Body: OpeningHoursType }>(
    '/',
    {
      schema: { body: OpeningHoursSchema, response: Type.String },
      preHandler: async (request) => validateEvents(request.body),
    },
    async (request) => processOpeningHours(request.body),
  )
}

export default openingHours
