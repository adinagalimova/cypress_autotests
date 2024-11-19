const { login } = require('./login');
const { kaspiPay } = require('./kaspiPay');
const { userPathKasko } = require('./userPathKasko');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

const clients = DataUtils.filterClients(JSONLoader.testClients);
const { holder } = DataUtils.createRandomClientsStructures(clients);
const car = DataUtils.createRandomCarStructure(JSONLoader.testCars);

describe('Kasko test suite', () => {
  login();
  userPathKasko(holder, car);
  kaspiPay();
});
