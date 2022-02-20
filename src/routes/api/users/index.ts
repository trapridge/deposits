import { FastifyPluginAsync } from 'fastify'
// import { ItemsObj, ItemsObjType } from './types'

// import { validateRequest } from './pre-handlers'
// import { processOpeningHours } from './service'
// import { Type } from '@sinclair/typebox'

/*

alice@example.com,0.1,BTC
bob@example.com,0.075,BTC
alice@example.com,-0.050,BTC

*/

let id = 1;

const userData = [{
    id: id++,
    email: 'alice@example.com',
  }, {
    id: id++,
    email: 'bob@example.com'
  }
]

const getUsers = () => userData;

const addUser = (user: { email: string }) => {
  return [...getUsers(), {
    id: id++,
    email: user.email
  }]
}

const users: FastifyPluginAsync = async (
  fastify,
  opts,
): Promise<void> => {
  fastify.get(
    '/',
    {
      // schema: { body: ItemsObj, response: Type.String },
      // preHandler: async (request) => validateRequest(request.body),
    },
    async (request) => getUsers(),
  ).post(
    '/',
    {
      // schema: { body: ItemsObj, response: Type.String },
      // preHandler: async (request) => validateRequest(request.body),
    },
    async (request) => {
      const users = addUser(request.body as any)
      return users[users.length - 1]
    },
  )
}

export default users

