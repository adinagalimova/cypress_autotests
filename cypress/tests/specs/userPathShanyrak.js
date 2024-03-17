const mainPage = require('../pageObjects/mainPage');
const shanyrakPage = require('../pageObjects/shanyrakPage');
const JSONLoader = require('../../main/utils/data/JSONLoader');

describe('Shanyrak smoke test:', () => {    
    it('Shanyrak client path:', { scrollBehavior: false }, () => {
        mainPage.clickShanyrakButton();

        shanyrakPage.pageIsDisplayed().should('be.true');
        shanyrakPage.inputIIN();
        shanyrakPage.clickSearchClientButton();
        shanyrakPage.getFirstNameElement().should('have.value', JSONLoader.testData.clientFirstName);
        shanyrakPage.getLastNameElement().should('have.value', JSONLoader.testData.clientLastName);
        shanyrakPage.getOrSetMiddleNameElement().should('have.value', JSONLoader.testData.clientMiddleName);
        shanyrakPage.getDocumentTypeText().should('be.equal', JSONLoader.testData.clientDocumentType);
        shanyrakPage.getDocumentNumberElement().should('have.value', JSONLoader.testData.clientDocumentNumber);
        shanyrakPage.getDocumentIssueDateElement().should('have.value', JSONLoader.testData.clientDocumentIssueDate);
        shanyrakPage.inputPhone();
        shanyrakPage.inputEmail();
        shanyrakPage.inputJuridicalAddress();

        shanyrakPage.chooseRegion();
        shanyrakPage.inputAddress();
        shanyrakPage.inputRandomBeginDate();
        let beginDate, endDate;
        shanyrakPage.getBeginDateTitle().then((title) => beginDate = title);
        shanyrakPage.getEndDateTitle().then((title) => {
            shanyrakPage.calculateEndDate().should('be.equal', title);
            endDate = title;
        });

        shanyrakPage.clickActiveUseSwitch();
        shanyrakPage.clickWithoutAccidentsSwitch();

        shanyrakPage.clickSaveButton();
        shanyrakPage.getAlertSpanElement().should('be.visible');
        shanyrakPage.clickIssuePolicyButton();
        shanyrakPage.clickDeclineSendKaspiPaymentButton();
        shanyrakPage.getPaymentCodeText().then((code) => {
            cy.setLocalStorage('sumToPay', JSONLoader.testData.shanyrakSumToPay);
            cy.setLocalStorage('paymentCode', code);
        });
    });
});