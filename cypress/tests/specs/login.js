const mainPage = require('../pageObjects/mainPage');
const loginPage = require('../pageObjects/loginPage');

exports.login = (login, password) => {
  it('Login into ADP:', { scrollBehavior: false }, () => {
    cy.clearAllCookies();
    cy.open('/');
    loginPage.pageIsDisplayed().should('be.true');
    loginPage.fillLoginAndPassword(login, password);
    loginPage.clickSubmitButton();
    mainPage.pageIsDisplayed().should('be.true');
  });
};
