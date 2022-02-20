import { test } from 'tap'
import { build } from '../helper'

test('add valid deposit', async (t) => {
  const expectedDeposit = {
    id: 4,
    userId: 1,
    amount: 100,
  }

  const app = await build(t)
  const res = await app.inject({
    url: '/api/deposits',
    method: 'POST',
    payload: { userId: 1, amount: 100 },
  })

  t.equal(res.statusCode, 201)
  t.same(JSON.parse(res.body), expectedDeposit)
})

test('add invalid deposit - format', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/api/deposits',
    method: 'POST',
    payload: { userId: 1, amountttt: 100 },
  })

  t.equal(res.statusCode, 400)
})

test('add invalid deposit - unknown user', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/api/deposits',
    method: 'POST',
    payload: { userId: 10, amount: 100 },
  })

  t.equal(res.statusCode, 400)
})
