import { Type } from '@sinclair/typebox'
import { FastifyPluginAsync } from 'fastify'
import { getBalance } from '../../../services/deposits'
import {
  addUser,
  AddUserDto,
  AddUserDtoT,
  getUsers,
  hasUserByEmail,
  UserDto,
  DepositDtoT,
} from '../../../services/users'

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify
    .get<{ Reply: DepositDtoT[] }>(
      '/',
      {
        schema: { response: { 200: Type.Array(UserDto) } },
      },
      async (request, reply) => {
        const users = getUsers()
        const usersWithBalances = users.map((user) => {
          const balance = getBalance(user.id)
          return {
            ...user,
            balance,
          }
        })
        reply.send(usersWithBalances)
      },
    )
    .post<{ Body: AddUserDtoT; Reply: DepositDtoT }>(
      '/',
      {
        schema: { body: AddUserDto, response: { 201: UserDto } },
        preHandler: async (request, reply) => {
          const userExists = hasUserByEmail(request.body.email)
          if (userExists) {
            reply.code(400).send()
          }
        },
      },
      async (request, reply) => {
        const user = addUser(request.body)
        reply.code(201).send(user)
      },
    )
}

export default users
