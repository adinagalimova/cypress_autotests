const moment = require('moment');
const mainPage = require('../pageObjects/mainPage');
const OGPOPage = require('../pageObjects/OGPOPage');
const JSONLoader = require('../../main/utils/data/JSONLoader');

describe('OGPO smoke test:', () => {
  it('OGPO user path:', { scrollBehavior: false }, () => {
    let beginDate;
    let endDate;

    mainPage.clickOGPOButton();
    OGPOPage.pageIsDisplayed();

    OGPOPage.juridicalSwitchIsChecked().should('be.false');
    OGPOPage.IPSwitchIsChecked().should('be.false');
    OGPOPage.residentSwitchIsChecked().should('be.true');
    OGPOPage.inputIIN(JSONLoader.testData.clientIIN);
    OGPOPage.clickSearchClientButton();
    OGPOPage.getLastNameElement().should('have.value', JSONLoader.testData.clientLastName);
    OGPOPage.getFirstNameElement().should('have.value', JSONLoader.testData.clientFirstName);
    OGPOPage.getOrSetMiddleNameElement(JSONLoader.testData.clientMiddleName).should('have.value', JSONLoader.testData.clientMiddleName);
    OGPOPage.getDateOfBirthElement().should('have.value', JSONLoader.testData.clientDateOfBirth);
    OGPOPage.getSexText().should('be.equal', JSONLoader.testData.clientSex);
    OGPOPage.getDocumentTypeText().should('be.equal', JSONLoader.testData.clientDocumentType);
    OGPOPage.getDocumentNumberElement().should('have.value', JSONLoader.testData.clientDocumentNumber);
    OGPOPage.getDocumentIssueDateElement().should('have.value', JSONLoader.testData.clientDocumentIssueDate);
    OGPOPage.inputAddress();
    OGPOPage.inputEmail();
    OGPOPage.inputPhone();
    OGPOPage.insuredSwitchIsChecked().should('be.true');
    OGPOPage.clickInsuredSwitch();
    OGPOPage.PDLSwitchIsChecked().should('be.false');
    OGPOPage.clickSaveButton();
    OGPOPage.clickNextButton();

    OGPOPage.juridicalSwitchIsChecked().should('be.false');
    OGPOPage.IPSwitchIsChecked().should('be.false');
    OGPOPage.residentSwitchIsChecked().should('be.true');
    OGPOPage.inputIIN(JSONLoader.testData.insuredClientIIN);
    OGPOPage.clickSearchClientButton();
    OGPOPage.getLastNameElement().should('have.value', JSONLoader.testData.insuredClientLastName);
    OGPOPage.getFirstNameElement().should('have.value', JSONLoader.testData.insuredClientFirstName);
    OGPOPage.getOrSetMiddleNameElement(JSONLoader.testData.insuredClientMiddleName).should('have.value', JSONLoader.testData.insuredClientMiddleName);
    OGPOPage.getDateOfBirthElement().should('have.value', JSONLoader.testData.insuredClientDateOfBirth);
    OGPOPage.getSexText().should('be.equal', JSONLoader.testData.insuredClientSex);
    OGPOPage.getDocumentTypeText().should('be.equal', JSONLoader.testData.insuredClientDocumentType);
    OGPOPage.getDocumentNumberElement().should('have.value', JSONLoader.testData.insuredClientDocumentNumber);
    OGPOPage.getDocumentIssueDateElement().should('have.value', JSONLoader.testData.insuredClientDocumentIssueDate);
    OGPOPage.getClassIDLabelText().should('be.equal', JSONLoader.testData.insuredClientClassID);
    OGPOPage.getDriverLicenceTypeText().should('be.equal', JSONLoader.testData.insuredClientDriverLicenceType);
    OGPOPage.getDriverLicenceNumberElement().should('have.value', JSONLoader.testData.insuredClientDriverLicenceNumber);
    OGPOPage.getDriverLicenceIssueDateElement().should('have.value', JSONLoader.testData.insuredClientDriverLicenceIssueDate);
    OGPOPage.experienceLessThan2YearsSwitchIsChecked().should('be.false');
    OGPOPage.pensionerSwitchIsChecked().should('be.false');
    OGPOPage.invalidSwitchIsChecked().should('be.false');
    OGPOPage.PDLSwitchIsChecked().should('be.false');
    OGPOPage.clickSaveButton();
    OGPOPage.clickNextButton();

    OGPOPage.inputVehicleData();
    OGPOPage.clickSearchVehicleButton();
    OGPOPage.inputVehicleDataWithDisabledVerification();
    OGPOPage.getCarRegDateElement().should('have.value', JSONLoader.testData.carRegDate);
    OGPOPage.getCarRegionText().should('be.equal', JSONLoader.testData.carRegion);
    OGPOPage.getCarVINElement().should('have.value', JSONLoader.testData.carVIN);
    OGPOPage.getCarTypeText().should('be.equal', JSONLoader.testData.carType);
    OGPOPage.getCarManufacturedYearText().should('be.equal', JSONLoader.testData.carManufacturedYear);
    OGPOPage.getCarEngineVolumeElement().should('have.value', JSONLoader.testData.carEngineVolume);
    OGPOPage.getCarMarkElement().should('have.value', JSONLoader.testData.carMark);
    OGPOPage.getCarModelElement().should('have.value', JSONLoader.testData.carModel);
    OGPOPage.clickSaveButton();
    OGPOPage.clickNextButton();

    OGPOPage.getPeriodText().should('be.equal', JSONLoader.testData.OGPOperiod);
    OGPOPage.inputRandomBeginDate();
    OGPOPage.getBeginDateTitle().then((title) => beginDate = title);
    OGPOPage.getEndDateTitle()
      .then((title) => {
        endDate = title;
        OGPOPage.calculateEndDate().should('be.equal', endDate);
      });
    OGPOPage.clickCalculatePremiumButton();
    OGPOPage.getNextButtonElement().should('be.enabled');
    OGPOPage.getSumToPay().then((sum) => cy.setLocalStorage('sumToPay', sum));
    OGPOPage.clickNextButton();

    const clientFullName = ''.concat(
      JSONLoader.testData.clientLastName, ' ',
      JSONLoader.testData.clientFirstName, ' ',
      JSONLoader.testData.clientMiddleName,
    );
    OGPOPage.getHolderText().should('be.equal', clientFullName);
    const insuredClientFullName = ''.concat(
      JSONLoader.testData.insuredClientLastName, ' ',
      JSONLoader.testData.insuredClientFirstName, ' ',
      JSONLoader.testData.insuredClientMiddleName,
    );
    OGPOPage.getListOfInsuredPeopleText().should('be.equal', insuredClientFullName);
    const carFullName = ''.concat(
      JSONLoader.testData.carMark, ', ',
      JSONLoader.testData.carModel, ', ',
      JSONLoader.testData.carNumber,
    );
    OGPOPage.getListOfCarsText().should('be.equal', carFullName);
    OGPOPage.getInsurancePeriodBeforeIssuingText().then((text) => {
      cy.wrap(`${beginDate} - ${endDate}`).should('be.equal', text);
    });
    OGPOPage.getInsurancePeriodBeforeIssuingText()
      .then((text) => cy.wrap(`${beginDate} - ${endDate}`).should('be.equal', text));
    OGPOPage.clickIssuePolicyButton();

    OGPOPage.getPolicyNumberText().should('contain', '901-');
    OGPOPage.getStatusText().should('be.equal', JSONLoader.testData.issuedStatus);
    OGPOPage.getSlicedCreationDate().should('be.equal', moment().format(JSONLoader.testData.datesFormatFrontEnd));
    OGPOPage.getInsurancePeriodAfterIssuingText().then((text) => {
      cy.wrap(`${beginDate} - ${endDate}`).should('be.equal', text);
    });
    OGPOPage.getInsurancePeriodAfterIssuingText()
      .then((text) => cy.wrap(`${beginDate} - ${endDate}`).should('be.equal', text));
    OGPOPage.getHolderText().should('be.equal', clientFullName);
    OGPOPage.getListOfInsuredPeopleText().should('be.equal', insuredClientFullName);
    OGPOPage.getListOfCarsText().should('be.equal', carFullName);
    OGPOPage.getPaymentCode()
      .then((code) => cy.setLocalStorage('paymentCode', code));
    OGPOPage.getPolicyNumberText().then((value) => cy.setLocalStorage('OGPOPolicyNumber', value));
    OGPOPage.getInsurancePeriodAfterIssuingText().then((value) => cy.setLocalStorage('OGPOPolicyInsurancePeriod', value));
  });
});
