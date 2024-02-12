const loginPage = require('../pageObjects/loginPage');
const mainPage = require('../pageObjects/mainPage');
const NodeEvents = require('../../support/nodeEvents');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const { userPathOGPO} = require('./userPathOGPO');

userPathOGPO(function login() {
    it('Login into ADP:', { scrollBehavior: false }, () => {
        cy.open('/');
        loginPage.pageIsDisplayed().should('be.true');
        loginPage.fillLoginAndPassword();
        loginPage.clickSubmitButton();
        mainPage.pageIsDisplayed().should('be.true');
    });
});