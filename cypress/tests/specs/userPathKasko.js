const moment = require('moment');
const mainPage = require('../pageObjects/mainPage');
const kaskoStep1 = require('../pageObjects/kasko/kaskoStep1');
const kaskoStep2 = require('../pageObjects/kasko/kaskoStep2');
const kaskoStep3 = require('../pageObjects/kasko/kaskoStep3');
const kaskoStep4 = require('../pageObjects/kasko/kaskoStep4');
const kaskoStep5 = require('../pageObjects/kasko/kaskoStep5');
const kaskoStep6 = require('../pageObjects/kasko/kaskoStep6');
const JSONLoader = require('../../main/utils/data/JSONLoader');

describe('Kasko smoke test:', () => {
  it('Kasko user path:', { scrollBehavior: false }, () => {

    mainPage.clickKaskoButton();

    kaskoStep1.pageIsDisplayed();
    kaskoStep1.chooseAgentManager();
    kaskoStep1.chooseCarMark();
    kaskoStep1.chooseCarModel();
    kaskoStep1.inputCarManufacturedYear();
    kaskoStep1.inputCarEngineVolume();
    kaskoStep1.inputInsuranceSumTextbox();
    kaskoStep1.clickCalculateButton();
    let insuranceSum;
    kaskoStep1.getInsuranceSumText().then((insuranceSumValue) => insuranceSum = insuranceSumValue);
    kaskoStep1.additionalEquipmentSwitchIsChecked().should('be.false');
    kaskoStep1.usedAutoSwitchIsChecked().should('be.false');
    kaskoStep1.clickSaveButton();

    kaskoStep2.pageIsDisplayed();
    kaskoStep2.clickRandomTariff();

    kaskoStep3.pageIsDisplayed();
    kaskoStep3.inputIIN(JSONLoader.testData.clientIIN);
    kaskoStep3.clickSearchClientButton();
    let clientFirstAndLastName = JSONLoader.testData.clientLastName + ' ' + JSONLoader.testData.clientFirstName + ' ';
    kaskoStep3.getFullNameElement().should('contain.value', clientFirstAndLastName);
    kaskoStep3.getDocumentTypeText().should('be.equal', JSONLoader.testData.clientDocumentType);
    kaskoStep3.getDocumentNumberElement().should('have.value', JSONLoader.testData.clientDocumentNumber);
    kaskoStep3.getDocumentIssueDateElement().should('have.value', JSONLoader.testData.clientDocumentIssueDate);
    // kaskoStep3.getDocumentIssuedByElement().should('have.value', JSONLoader.testData.clientDocumentIssuedBy);
    kaskoStep3.inputAddress(JSONLoader.testData.clientAddress);
    kaskoStep3.inputPhone(JSONLoader.testData.clientPhoneForKASKO);
    kaskoStep3.inputEmail(JSONLoader.testData.clientEmail);
    kaskoStep3.randomlyClickPDLCheckbox();
    kaskoStep3.clickSaveButton();

    kaskoStep4.pageIsDisplayed();
    kaskoStep4.inputCarRegNum(JSONLoader.testData.carNumber);
    kaskoStep4.inputCarRegCertNum(JSONLoader.testData.carRegistration);
    kaskoStep4.clickSearchCarButton();
    kaskoStep4.getCarMarkElement().should('have.value', JSONLoader.testData.carMark);
    kaskoStep4.getCarModelElement().should('have.value', JSONLoader.testData.carModel);
    kaskoStep4.getCarManufacturedYearElement().should('have.value', JSONLoader.testData.carManufacturedYear);
    kaskoStep4.getCarVINElement().should('have.value', JSONLoader.testData.carVIN);
    kaskoStep4.getCarRegionText().should('be.equal', JSONLoader.testData.carRegion);
    kaskoStep4.getCarRegDateElement().should('have.value', JSONLoader.testData.carRegDate);
    kaskoStep4.getInsuranceSumText().then((insuranceSumValue) => cy.wrap(insuranceSumValue).should('be.equal', insuranceSum));
    kaskoStep4.clickSaveButton();

    kaskoStep5.pageIsDisplayed();
    kaskoStep5.clickNaturalPersonSwitch();
    kaskoStep5.inputIINBIN(JSONLoader.testData.clientIIN);
    kaskoStep5.clickSearchBeneficiaryButton();
    kaskoStep5.getBeneficiaryFullNameElement().should('contain.value', clientFirstAndLastName);
    kaskoStep5.clickSaveButton();

    kaskoStep6.pageIsDisplayed();
    kaskoStep6.chooseInsurancePeriod();
    kaskoStep6.getPremiumElement().then((premium) => cy.setLocalStorage('premium', premium));
    kaskoStep6.choosePaymentType();
    kaskoStep6.clickSaveButton();
  });
});
