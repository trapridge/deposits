import { Static, Type } from '@sinclair/typebox'

export const AddUserDto = Type.Object(
  {
    email: Type.String(),
  },
  { additionalProperties: false },
)

export const UserDto = Type.Object(
  {
    id: Type.Integer(),
    email: Type.String(),
    balance: Type.Optional(Type.Number()),
  },
  { additionalProperties: false },
)

export type AddUserDtoT = Static<typeof AddUserDto>
export type DepositDtoT = Static<typeof UserDto>

// in-memory "db table" with initial "migrated" data
let id = 1
let users: DepositDtoT[] = [
  {
    id: id++,
    email: 'alice@example.com',
  },
  {
    id: id++,
    email: 'bob@example.com',
  },
]

export const getUsers = (): DepositDtoT[] => users

export const addUser = (user: AddUserDtoT): DepositDtoT => {
  users = [
    ...users,
    {
      id: id++,
      email: user.email,
    },
  ]
  return users[users.length - 1]
}

export const hasUserById = (userId: number): boolean =>
  users.some((user) => user.id === userId)

export const hasUserByEmail = (email: string): boolean =>
  users.some((user) => user.email === email)
