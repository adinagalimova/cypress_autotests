const mainPage = require('../pageObjects/mainPage');
const loginPage = require('../pageObjects/loginPage');

exports.login = () => {
  it('Login into ADP:', { scrollBehavior: false }, () => {
    cy.clearAllCookies();
    cy.open('/');
    loginPage.pageIsDisplayed().should('be.true');
    loginPage.fillLoginAndPassword();
    loginPage.clickSubmitButton();
    mainPage.pageIsDisplayed().should('be.true');
  });
};

exports.loginUnderwriter = () => {
  it('Login into ADP as an underwriter:', { scrollBehavior: false }, () => {
    mainPage.clickLogoutButton();
    cy.clearAllCookies();
    cy.open('/');
    loginPage.pageIsDisplayed().should('be.true');
    loginPage.fillLoginAndPasswordForUnderwriter();
    loginPage.clickSubmitButton();
    mainPage.pageIsDisplayed().should('be.true');
  });
}
