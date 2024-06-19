const { login } = require('./login');
const { kaspiPay } = require('./kaspiPay');
const { userPathOGPO } = require('./userPathOGPO');
const { userPathMutual } = require('./userPathMutual');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Randomizer = require('../../main/utils/random/randomizer');

const clients = DataUtils.filterClients(JSONLoader.testClients);
const cars = JSONLoader.testCars;
const randomInsuredIndex = Randomizer.getRandomInteger(clients.length - 1);
let randomHolderIndex;
do {
  randomHolderIndex = Randomizer.getRandomInteger(clients.length - 1);
} while (randomHolderIndex === randomInsuredIndex);
const randomCarIndex = Randomizer.getRandomInteger(cars.length - 1);

describe('OGPO & Mutual test suite:', () => {
  login();
  userPathOGPO(clients[randomHolderIndex], clients[randomInsuredIndex], cars[randomCarIndex]);
  kaspiPay();
  userPathMutual(clients[randomHolderIndex], clients[randomInsuredIndex], cars[randomCarIndex]);
  kaspiPay();
});
