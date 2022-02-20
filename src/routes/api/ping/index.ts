import { FastifyPluginAsync } from 'fastify'
// import { ItemsObj, ItemsObjType } from './types'

// import { validateRequest } from './pre-handlers'
// import { processOpeningHours } from './service'
// import { Type } from '@sinclair/typebox'

const endpoint: FastifyPluginAsync = async (
  fastify,
  opts,
): Promise<void> => {
  fastify.get(
    '/',
    {
      // schema: { body: ItemsObj, response: Type.String },
      // preHandler: async (request) => validateRequest(request.body),
    },
    async (request) => 'pong',
  )
}

export default endpoint

