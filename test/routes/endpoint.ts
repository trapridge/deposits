import { test } from 'tap'
import {
  build,
  testInput
} from '../helper'

test('empty input fails input validation', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/endpoint',
    method: 'POST',
    payload: testInput,
  })

  t.equal(res.statusCode, 200)
  t.equal(JSON.parse(res.body), testInput)
})

