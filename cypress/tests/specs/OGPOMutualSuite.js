const { login } = require('./login');
const { kaspiPay } = require('./kaspiPay');
const { userPathOGPO } = require('./userPathOGPO');
const { userPathMutual } = require('./userPathMutual');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

const clients = DataUtils.filterClients(JSONLoader.testClients);
console.log(clients);
const { holder, insured } = DataUtils.createRandomHolderAndInsuredStructures(clients);
const car = DataUtils.createRandomCarStructure(JSONLoader.testCars);

describe('OGPO & Mutual test suite:', () => {
  login();
  userPathOGPO(holder, insured, car);
  kaspiPay();
  userPathMutual(holder, insured, car);
  kaspiPay();
});
