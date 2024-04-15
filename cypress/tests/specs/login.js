const mainPage = require('../pageObjects/mainPage');
const loginPage = require('../pageObjects/loginPage');

describe('Login', () => {
  it('Login into ADP:', { scrollBehavior: false }, () => {
    cy.clearAllCookies();
    cy.visit('/');
    loginPage.pageIsDisplayed().should('be.true');
    loginPage.fillLoginAndPassword();
    loginPage.clickSubmitButton();
    mainPage.pageIsDisplayed().should('be.true');
  });
});
