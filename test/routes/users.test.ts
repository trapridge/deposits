import { test } from 'tap'
import { build } from '../helper'

test('get users', async (t) => {
  const expectedUsers = [
    {
      id: 1,
      email: 'alice@example.com',
      balance: 25,
    },
    {
      id: 2,
      email: 'bob@example.com',
      balance: 50,
    },
  ]

  const app = await build(t)
  const res = await app.inject({
    url: '/api/users',
    method: 'GET',
  })

  t.equal(res.statusCode, 200)
  t.same(JSON.parse(res.body), expectedUsers)
})

test('add valid user', async (t) => {
  const expectedUser = {
    id: 3,
    email: 'test@test.com',
  }

  const app = await build(t)
  let res = await app.inject({
    url: '/api/users',
    method: 'POST',
    payload: { email: 'test@test.com' },
  })

  t.equal(res.statusCode, 201)
  t.same(JSON.parse(res.body), expectedUser)

  res = await app.inject({
    url: '/api/users',
    method: 'GET',
  })

  const expectedUsers = [
    {
      id: 1,
      email: 'alice@example.com',
      balance: 25,
    },
    {
      id: 2,
      email: 'bob@example.com',
      balance: 50,
    },
    {
      id: 3,
      email: 'test@test.com',
      balance: 0,
    },
  ]

  t.equal(res.statusCode, 200)
  t.same(JSON.parse(res.body), expectedUsers)
})

test('add invalid user - format', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/api/users',
    method: 'POST',
    payload: { emailll: 'new@example.com' },
  })

  t.equal(res.statusCode, 400)
})

test('add invalid user - duplicate', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/api/users',
    method: 'POST',
    payload: { email: 'alice@example.com' },
  })

  t.equal(res.statusCode, 400)
})
