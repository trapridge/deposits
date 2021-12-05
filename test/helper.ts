// This file contains code that we reuse between our tests.
import Fastify from 'fastify'
import fp from 'fastify-plugin'
import App from '../src/app'
import * as tap from 'tap'

export type Test = typeof tap['Test']['prototype']

// Fill in this config with all the configurations
// needed for testing the application
async function config() {
  return {}
}

// Automatically build and tear down our instance
async function build(t: Test) {
  const app = Fastify()

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  void app.register(fp(App), await config())

  await app.ready()

  // Tear down our app after we are done
  t.teardown(() => void app.close())

  return app
}

export { config, build }

export const testInput = {
  monday: [],
  tuesday: [
    {
      type: 'open',
      value: 36000,
    },
    {
      type: 'close',
      value: 64800,
    },
  ],
  wednesday: [],
  thursday: [
    {
      type: 'open',
      value: 37800,
    },
    {
      type: 'close',
      value: 64800,
    },
  ],
  friday: [
    {
      type: 'open',
      value: 36000,
    },
  ],
  saturday: [
    {
      type: 'close',
      value: 3600,
    },
    {
      type: 'open',
      value: 36000,
    },
  ],
  sunday: [
    {
      type: 'close',
      value: 3600,
    },
    {
      type: 'open',
      value: 43200,
    },
    {
      type: 'close',
      value: 75600,
    },
  ],
}

export const testInputWithStartingClose = {
  monday: [
    {
      type: 'close',
      value: 36000,
    },
  ],
  tuesday: [
    {
      type: 'open',
      value: 36000,
    },
    {
      type: 'close',
      value: 64800,
    },
  ],
  wednesday: [],
  thursday: [
    {
      type: 'open',
      value: 37800,
    },
    {
      type: 'close',
      value: 64800,
    },
  ],
  friday: [
    {
      type: 'open',
      value: 36000,
    },
  ],
  saturday: [
    {
      type: 'close',
      value: 3600,
    },
    {
      type: 'open',
      value: 36000,
    },
  ],
  sunday: [
    {
      type: 'close',
      value: 3600,
    },
    {
      type: 'open',
      value: 43200,
    },
    {
      type: 'close',
      value: 75600,
    },
    {
      type: 'open',
      value: 75800,
    },
  ],
}

export const testInputWithMissingDay = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
}

export const testInputWithOddEventsCount = {
  monday: [],
  tuesday: [
    {
      type: 'open',
      value: 43200,
    },
    {
      type: 'close',
      value: 3600,
    },
    {
      type: 'close',
      value: 75600,
    },
  ],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
}

export const testInputWithOverSpanningHours = {
  monday: [],
  tuesday: [
    {
      type: 'open',
      value: 43200,
    },
  ],
  wednesday: [],
  thursday: [
    {
      type: 'close',
      value: 75600,
    },
  ],
  friday: [],
  saturday: [],
  sunday: [],
}

export const testInputWithOverSpanningHours2 = {
  monday: [
    {
      type: 'close',
      value: 75600,
    },
  ],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [
    {
      type: 'open',
      value: 43200,
    },
  ],
  sunday: [],
}

export const testInputWithMinimalData = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
}

export const testInputWithNonAlternatingEventTypes = {
  monday: [
    {
      type: 'close',
      value: 3600,
    },
    {
      type: 'open',
      value: 75600,
    },
  ],
  tuesday: [
    {
      type: 'close',
      value: 3600,
    },
    {
      type: 'open',
      value: 43200,
    },
    {
      type: 'open',
      value: 43200,
    },
    {
      type: 'close',
      value: 75600,
    },
  ],
  wednesday: [
    {
      type: 'open',
      value: 43200,
    },
    {
      type: 'close',
      value: 75600,
    },
  ],
  thursday: [
    {
      type: 'open',
      value: 43200,
    },
    {
      type: 'close',
      value: 75600,
    },
  ],
  friday: [
    {
      type: 'open',
      value: 43200,
    },
    {
      type: 'close',
      value: 75600,
    },
  ],
  saturday: [
    {
      type: 'open',
      value: 43200,
    },
    {
      type: 'close',
      value: 75600,
    },
  ],
  sunday: [
    {
      type: 'open',
      value: 43200,
    },
    {
      type: 'close',
      value: 75600,
    },
  ],
}

export const testInputWithNonAlternatingEventTypes2 = {
  monday: [],
  tuesday: [
    {
      type: 'open',
      value: 43200,
    },
    {
      type: 'close',
      value: 3600,
    },
    {
      type: 'close',
      value: 75600,
    },
    {
      type: 'open',
      value: 43200,
    },
  ],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
}
