# js-tech-test

### Technology Choices

I decided to build the app with React, run the tests with Jest and use Webpack for module bundling. I considered using Redux for state management but decided it was overkill for a small app.
The reason I chose React is because I'm confident building apps with it and I like the component-based UI. I used Jest as I wanted to try using its snapshot-based component testing.

### What I would add/improve with more time

I spent two days on this test and tried to prioritise my tasks. As such, the app is essentially CSS-less as I wanted to focus my efforts on the code.
That being said, I would've liked to:
- Implement full CSS styling
- Add more than one unit test
- Utilise WebSocket responses to update the UI 
- Fix a small bug with the dropdown search component 
- Include loading spinners for ajax requests
- Learn Docker

------------------

### How to run the app

1) Install dependencies:

```javascript
npm install
```

2) Spin up the Docker container:

```javascript
docker-compose up
```

3) Start the app:

```javascript
npm start
```

4) Navigate to the following URL in the browser:

```javascript
localhost:9090
```

5) To run the unit test:

```javascript
npm test
```
