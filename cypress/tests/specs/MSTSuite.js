const { login } = require('./login');
const { kaspiPay } = require('./kaspiPay');
const { userPathMST } = require('./userPathMST');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Randomizer = require('../../main/utils/random/randomizer');

const clients = DataUtils.filterClients(JSONLoader.testClients);
const randomInsuredIndex = Randomizer.getRandomInteger(clients.length - 1);
let randomHolderIndex;
do {
  randomHolderIndex = Randomizer.getRandomInteger(clients.length - 1);
} while (randomHolderIndex === randomInsuredIndex);

describe('MST test suite:', () => {
  login();
  userPathMST(clients[randomHolderIndex], clients[randomInsuredIndex]);
  kaspiPay();
});
