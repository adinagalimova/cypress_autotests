const mainPage = require('../pageObjects/mainPage');
const mainMenu = require('../pageObjects/mainMenu');
const NodeEvents = require('../../support/nodeEvents');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

describe('Payment', () => {
    it('Pay with Kaspi:', { scrollBehavior: false }, () => {
        cy.getLocalStorage('paymentCode')
        .then((paymentCode) => cy.getLocalStorage('sumToPay')
        .then((sumToPay) => NodeEvents.payWithKaspi({ sumToPay, paymentCode })))
        .then(async (responses) => {
            responses.forEach((response) => cy.wrap(response.status).should('be.equal', 200));
            const convertedResponse = await DataUtils.XMLToJSON(responses.pop().data);
            cy.wrap(convertedResponse.comment.pop())
            .should('contain', JSONLoader.testData.responsePaid);
        });
        mainMenu.clickMainPageButton();
        mainPage.pageIsDisplayed().should('be.true');
    });
});