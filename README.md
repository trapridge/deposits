# opening-hours-api

An API with a single endpoint (_POST /opening-hours_) that accepts opening hours data in one format and replies it in other. Tested on Node 14.9.0 and built with TypeScript and Fastify. All code relevant to the endpoint can be found in `src/routes/opening-hours` and `test/routes/opening-hours.test.ts`.

## Speculation about the input structure

IMHO, specifying the opening hours as a combination of opening time & duration instead of separate opening and closing events would be more convenient. E.g.

```javascript
{ "monday": [{ "open": 28800, "duration": 28800  }], ... } // 8 AM -> 4 PM
```

I think that calculating the closing time would take more effort, but it would be easier to parse and validate the hours in general. Also, it would allow (even if unlikely) openings that span over more than two days.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

### `npm run prettier`

Reformat code.

## License

MIT

## Credits

Idea by [Wolt](https://github.com/woltapp).
