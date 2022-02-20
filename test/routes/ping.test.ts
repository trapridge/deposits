import { test } from 'tap'
import { build } from '../helper'

test('ping pong', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/api/ping',
  })
  t.equal(res.payload, 'pong')
})
