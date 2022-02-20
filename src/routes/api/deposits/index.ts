import { FastifyPluginAsync } from 'fastify'
import {
  addDeposit,
  AddDepositDto,
  AddDepositDtoT,
  DepositDto,
  DepositDtoT,
} from '../../../services/deposits'
import { hasUserById } from '../../../services/users'

const deposits: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{ Body: AddDepositDtoT; Reply: DepositDtoT }>(
    '/',
    {
      schema: { body: AddDepositDto, response: { 201: DepositDto } },
      preHandler: async (request, reply) => {
        const userExists = hasUserById(request.body.userId)
        if (!userExists) {
          reply.code(400).send()
        }
      },
    },
    async (request, reply) => {
      const deposit = addDeposit(request.body)
      reply.code(201).send(deposit)
    },
  )
}

export default deposits
