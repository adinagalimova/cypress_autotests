const { login } = require('./login');
const { kaspiPay } = require('./kaspiPay');
const { userPathMST } = require('./userPathMST');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

const clients = DataUtils.filterClients(JSONLoader.testClients, { isUnderSixtyYearsOld: true });
const { holder, insured } = DataUtils.createRandomClientsStructures(clients);
const {loginManager , passwordManager} = Cypress.env().manager_credentials;

describe('MST test suite:', () => {
  login(loginManager, passwordManager);
  userPathMST(holder, insured);
  kaspiPay();
});
