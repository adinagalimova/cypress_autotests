const mainPage = require('../pageObjects/mainPage');
const mainMenu = require('../pageObjects/mainMenu');
const NodeEvents = require('../../support/nodeEvents');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

describe('Payment', () => {
    it('Pay with Kaspi:', { scrollBehavior: false }, () => {
        let sumToPay;
        cy.getLocalStorage('sumToPay').then((sum) => sumToPay = sum);
        cy.getLocalStorage('paymentCode').then((paymentCode) => {
            NodeEvents.payWithKaspi({ sumToPay, paymentCode }).then((responses) => {
                responses.forEach((response) => cy.wrap(response.status).should('be.equal', 200));
                DataUtils.XMLToJSON(responses.pop().data).then((convertedResponse) => {
                    cy.wrap(convertedResponse.comment.pop())
                    .should('contain', JSONLoader.testData.responsePaid);
                });
            });
        });
        mainMenu.clickMainPageButton();
        mainPage.pageIsDisplayed().should('be.true');
    });
});