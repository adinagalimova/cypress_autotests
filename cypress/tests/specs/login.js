const loginPage = require('../pageObjects/loginPage');
const mainPage = require('../pageObjects/mainPage');

describe('Login', () => {
    it('Login into ADP:', { scrollBehavior: false }, () => {
        cy.clearAllCookies();
        cy.open('/');
        loginPage.pageIsDisplayed().should('be.true');
        loginPage.fillLoginAndPassword();
        loginPage.clickSubmitButton();
        mainPage.pageIsDisplayed().should('be.true');
    });
});