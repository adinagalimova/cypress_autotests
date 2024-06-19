const { login } = require('./login');
const { kaspiPay } = require('./kaspiPay');
const { userPathKasko } = require('./userPathKasko');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Randomizer = require('../../main/utils/random/randomizer');

const clients = DataUtils.filterClients(JSONLoader.testClients);
const randomClientIndex = Randomizer.getRandomInteger(clients.length - 1);

describe('Kasko test suite', () => {
  login();
  userPathKasko(clients[randomClientIndex]);
  kaspiPay();
});
