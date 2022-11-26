const maxCarsOnPage = 7;
const maxWinnersOnPage = 10;

const millisecondInSecond = 1000;

const host = 'http://127.0.0.1:3000'

const randomCarsCount = 100;

const routes = {
  home: '/',
  garage: '/garage',
  winners: '/winners'
}

export default {
  maxCarsOnPage,
  maxWinnersOnPage,
  millisecondInSecond,
  host,
  randomCarsCount,
  routes
};