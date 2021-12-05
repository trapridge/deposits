import { test } from 'tap'
import {
  build,
  testInput,
  testInputWithMinimalData,
  testInputWithMissingDay,
  testInputWithNonAlternatingEventTypes,
  testInputWithNonAlternatingEventTypes2,
  testInputWithOddEventsCount,
  testInputWithOverSpanningHours,
  testInputWithOverSpanningHours2,
  testInputWithStartingClose,
} from '../helper'

test('empty input fails input validation', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/opening-hours',
    method: 'POST',
    payload: undefined,
  })

  t.equal(res.statusCode, 400)
})

test('missing day fails input validation', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/opening-hours',
    method: 'POST',
    payload: testInputWithMissingDay,
  })

  t.equal(res.statusCode, 400)
})

test('odd number of events fails input validation', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/opening-hours',
    method: 'POST',
    payload: testInputWithOddEventsCount,
  })

  t.same(JSON.parse(res.body), {
    statusCode: 500,
    error: 'Internal Server Error',
    message:
      'Invalid opening hours in request body. There must must be an even number of events',
  })
})

test("non-alternating 'open' and 'closed' events fails input validation", async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/opening-hours',
    method: 'POST',
    payload: testInputWithNonAlternatingEventTypes,
  })

  t.same(JSON.parse(res.body), {
    statusCode: 500,
    error: 'Internal Server Error',
    message:
      "Invalid opening hours in request body. 'open' and 'close' events must alternate",
  })
})

test("non-alternating 'open' and 'closed' events fails input validation (variation 2)", async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/opening-hours',
    method: 'POST',
    payload: testInputWithNonAlternatingEventTypes2,
  })

  t.same(JSON.parse(res.body), {
    statusCode: 500,
    error: 'Internal Server Error',
    message:
      "Invalid opening hours in request body. 'open' and 'close' events must alternate",
  })
})

test('input with hours spanning over more than two days fails input validation', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/opening-hours',
    method: 'POST',
    payload: testInputWithOverSpanningHours,
  })

  t.same(JSON.parse(res.body), {
    statusCode: 500,
    error: 'Internal Server Error',
    message:
      'Invalid opening hours in request body. Opening hours cannot span over more than two days',
  })
})

test('input with hours spanning over more than two days fails input validation (variation 2)', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/opening-hours',
    method: 'POST',
    payload: testInputWithOverSpanningHours2,
  })

  t.same(JSON.parse(res.body), {
    statusCode: 500,
    error: 'Internal Server Error',
    message:
      'Invalid opening hours in request body. Opening hours cannot span over more than two days',
  })
})

test('converts minimal valid test input to human-readable output', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/opening-hours',
    method: 'POST',
    payload: testInputWithMinimalData,
  })

  const expected = `Monday: Closed
Tuesday: Closed
Wednesday: Closed
Thursday: Closed
Friday: Closed
Saturday: Closed
Sunday: Closed
`

  t.equal(res.body, expected)
})

test('converts valid test input to human-readable output', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/opening-hours',
    method: 'POST',
    payload: testInput,
  })

  const expected = `Monday: Closed
Tuesday: 10 AM - 6 PM
Wednesday: Closed
Thursday: 10:30 AM - 6 PM
Friday: 10 AM - 1 AM
Saturday: 10 AM - 1 AM
Sunday: 12 PM - 9 PM
`

  t.equal(res.body, expected)
})

test("converts valid test input with starting 'close' event to human-readable output", async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/opening-hours',
    method: 'POST',
    payload: testInputWithStartingClose,
  })

  const expected = `Monday: Closed
Tuesday: 10 AM - 6 PM
Wednesday: Closed
Thursday: 10:30 AM - 6 PM
Friday: 10 AM - 1 AM
Saturday: 10 AM - 1 AM
Sunday: 12 PM - 9 PM, 9:03 PM - 10 AM
`

  t.equal(res.body, expected)
})
