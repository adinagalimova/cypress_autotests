const { login } = require('./login');
const { kaspiPay } = require('./kaspiPay');
const { userPathOGPO } = require('./userPathOGPO');
const { userPathMutual } = require('./userPathMutual');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

<<<<<<<<< Temporary merge branch 1
const clients = DataUtils.filterClients(JSONLoader.testClients, { hasDriverLicence: true });
const { holder, insured } = DataUtils.createRandomHolderAndInsuredStructures(clients);
=========
const clients = DataUtils.filterClients(JSONLoader.testClients);
const { holder, insured } = DataUtils.createRandomClientsStructures(clients);
>>>>>>>>> Temporary merge branch 2
const car = DataUtils.createRandomCarStructure(JSONLoader.testCars);
const { loginManager, passwordManager } = Cypress.env().manager_credentials;

describe('OGPO & Mutual test suite:', () => {
  login(loginManager, passwordManager);
  userPathOGPO(holder, insured, car);
  kaspiPay();
  userPathMutual(holder, insured, car);
  kaspiPay();
});
