const { login } = require('./login');
const { userPathQuote } = require('./userPathQuote');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

const clients = DataUtils.filterClients(JSONLoader.testClients, { isUnderSixtyYearsOld: true });
const { holder, beneficiary} = DataUtils.createRandomClientsStructures(clients);

describe('Quote test suite:', () => {
    login();
    userPathQuote(holder, beneficiary);
});
