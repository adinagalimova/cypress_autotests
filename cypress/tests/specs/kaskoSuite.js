const { login } = require('./login');
const { kaspiPay } = require('./kaspiPay');
const { userPathKasko } = require('./userPathKasko');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

const clients = DataUtils.filterClients(JSONLoader.testClients);
const { holder } = DataUtils.createRandomClientsStructures(clients);
const car = DataUtils.createRandomCarStructure(JSONLoader.testCars);
const  {loginManager , passwordManager} = Cypress.env().manager_credentials;

describe('Kasko test suite', () => {
  login(loginManager, passwordManager);
  userPathKasko(holder, car);
  kaspiPay();
});
