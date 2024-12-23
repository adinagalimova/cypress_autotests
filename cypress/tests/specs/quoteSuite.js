const { login } = require('./login');
const { managerPathQuote } = require('./managerPathQuote');
const { underwriterPathQuote } = require('./underwriterPathQuote');
const { managerPathQuoteForRevision } = require('./managerPathQuoteForRevision');
const { underwriterPathQuoteAfterRevision } = require('./underwriterPathQuoteAfterRevision');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

const clients = DataUtils.filterClients(JSONLoader.testClients, { isUnderSixtyYearsOld: true });
const { holder, beneficiary } = DataUtils.createRandomClientsStructures(clients);
const { loginManager, passwordManager } = Cypress.env().manager_credentials;
const { loginUnder, passwordUnder } = Cypress.env().underwriter_credentials;

describe('Quote test suite:', () => {
  login(loginManager, passwordManager);
  managerPathQuote(holder, beneficiary);
  login(loginUnder, passwordUnder);
  underwriterPathQuote(holder, beneficiary);
  login(loginManager, passwordManager);
  managerPathQuoteForRevision();
  login(loginUnder, passwordUnder);
  underwriterPathQuoteAfterRevision();
});
