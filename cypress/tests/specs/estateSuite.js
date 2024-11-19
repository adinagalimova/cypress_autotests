const { login } = require('./login');
const { kaspiPay } = require('./kaspiPay');
const { userPathEstate } = require('./userPathEstate');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

const clients = DataUtils.filterClients(JSONLoader.testClients, { isUnderSixtyYearsOld: true });
const { holder, insured } = DataUtils.createRandomClientsStructures(clients);

describe('Estate test suite:', () => {
  login();
  userPathEstate(holder, insured);
  kaspiPay();
});
