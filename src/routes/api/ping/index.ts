import { FastifyPluginAsync } from 'fastify'

const endpoint: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', {}, async (request) => 'pong')
}

export default endpoint
