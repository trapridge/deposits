import { build } from '../helper'
import { test } from 'tap'

test('add user and deposits', async (t) => {
  const app = await build(t)
  let res = await app.inject({
    url: '/api/users',
    method: 'POST',
    payload: { email: 'test@test.com' },
  })

  res = await app.inject({
    url: '/api/users',
    method: 'GET',
  })

  t.equal(res.statusCode, 200)
  t.same(JSON.parse(res.body), [
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
  ])

  res = await app.inject({
    url: '/api/deposits',
    method: 'POST',
    payload: { userId: 1, amount: -100 },
  })

  res = await app.inject({
    url: '/api/deposits',
    method: 'POST',
    payload: { userId: 3, amount: 33 },
  })

  res = await app.inject({
    url: '/api/users',
    method: 'GET',
  })

  t.equal(res.statusCode, 200)
  t.same(JSON.parse(res.body), [
    {
      id: 1,
      email: 'alice@example.com',
      balance: -75,
    },
    {
      id: 2,
      email: 'bob@example.com',
      balance: 50,
    },
    {
      id: 3,
      email: 'test@test.com',
      balance: 33,
    },
  ])
})
