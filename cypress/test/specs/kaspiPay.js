const mainPage = require('../pageObjects/mainPage');
const NodeEvents = require('../../support/nodeEvents');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const mainMenu = require('../pageObjects/mainMenu');

describe('Payment', () => {
    it('Pay with Kaspi:', { scrollBehavior: false }, () => {
        let sumToPay, paymentCode;
        cy.getLocalStorage('sumToPay').then((sum) => sumToPay = sum);
        cy.getLocalStorage('paymentCode').then((code) => paymentCode = code)
        .then((paymentCode) => {
            cy.logger(`DEBUG sumToPay: ${sumToPay}; paymentCode: ${paymentCode}`)
            NodeEvents.payWithKaspi({ sumToPay, paymentCode })
        })
        .then((response) => cy.wrap(response)
        .should('contain', JSONLoader.testData.responsePaid));
        mainMenu.clickHomeButton();
        mainPage.pageIsDisplayed().should('be.true');
    });
});