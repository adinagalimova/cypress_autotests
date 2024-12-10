const { login, loginUnderwriter} = require('./login');
const { managerPathQuote } = require('./managerPathQuote');
const { underwriterPathQuote } = require('./underwriterPathQuote');
const { managerPathQuoteForRevision } = require('./managerPathQuoteForRevision');
const { underwriterPathQuoteAfterRevision } = require('./underwriterPathQuoteAfterRevision');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

const clients = DataUtils.filterClients(JSONLoader.testClients, { isUnderSixtyYearsOld: true });
const { holder, beneficiary} = DataUtils.createRandomClientsStructures(clients);

describe('Quote test suite:', () => {
    login();
    managerPathQuote(holder, beneficiary);
    loginUnderwriter();
    underwriterPathQuote(holder, beneficiary);
    login();
    managerPathQuoteForRevision();
    loginUnderwriter();
    underwriterPathQuoteAfterRevision();
});
