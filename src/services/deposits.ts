import { Static, Type } from '@sinclair/typebox'

export const AddDepositDto = Type.Object(
  {
    userId: Type.Integer(),
    amount: Type.Number(),
  },
  { additionalProperties: false },
)

export const DepositDto = Type.Object(
  {
    id: Type.Integer(),
    userId: Type.Integer(),
    amount: Type.Number(),
  },
  { additionalProperties: false },
)

export type AddDepositDtoT = Static<typeof AddDepositDto>
export type DepositDtoT = Static<typeof DepositDto>

// in-memory "db table" with initial "migrated" data
let id = 1
let deposits: DepositDtoT[] = [
  {
    id: id++,
    userId: 1,
    amount: 100,
  },
  {
    id: id++,
    userId: 2,
    amount: 50,
  },
  {
    id: id++,
    userId: 1,
    amount: -75,
  },
]

export const getBalance = (userId: number): number =>
  deposits.reduce((balance, deposit) => {
    if (deposit.userId === userId) {
      return (balance += deposit.amount)
    }
    return balance
  }, 0)

export const addDeposit = ({ userId, amount }: AddDepositDtoT): DepositDtoT => {
  deposits = [
    ...deposits,
    {
      id: id++,
      userId,
      amount,
    },
  ]
  return deposits[deposits.length - 1]
}
