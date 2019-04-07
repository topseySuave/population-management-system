[![CircleCI](https://circleci.com/gh/topseySuave/population-management-system.svg?style=svg)](https://circleci.com/gh/topseySuave/population-management-system)
[![codecov](https://codecov.io/gh/topseySuave/population-management-system/branch/master/graph/badge.svg)](https://codecov.io/gh/topseySuave/population-management-system)


# population-management-system
A simple API system for population management. Visit the hosted version [here](https://populationapi-m.herokuapp.com/)

### API Documentation
Visit [here](https://documenter.getpostman.com/view/2928491/S1EJYMg3) to see the documentation for this API

## How To Make it work
1. Install [`node`](https://nodejs.org/en/download/)
2. Install [`mongodb`](https://docs.mongodb.com/v3.2/installation/)
3. Clone the repository `git clone git@github.com:topseySuave/population-management-system.git`
4. Navigate to the project directory `cd ~/path/to/population-management-system`
5. Install all dependencies `npm install`
6. Configure Mongo
7. Add your environment variables to .env files
```
SERVER=127.0.0.1:27017
DATABASE_NAME=<DB Name>
DATABASE_TEST_NAME=<Test DB Name>
NODE_ENV=development
```
you can visit the [API docs](https://documenter.getpostman.com/view/2928491/S1EJYMg3) for reference on how to use the API.

8. Start the app `npm run dev`
9. Navigate to the API home `http://localhost:3000/api/v1/`

### To run the test script
```
npm test
```

### Other features are
#### Versioning:
##### The API routes and controllers are versioned for backward compactability
