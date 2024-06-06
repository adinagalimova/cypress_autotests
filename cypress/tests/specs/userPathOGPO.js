const moment = require('moment');
const mainPage = require('../pageObjects/mainPage');
const OGPOStep1 = require('../pageObjects/OGPO/OGPOStep1');
const OGPOStep2 = require('../pageObjects/OGPO/OGPOStep2');
const OGPOStep3 = require('../pageObjects/OGPO/OGPOStep3');
const OGPOStep4 = require('../pageObjects/OGPO/OGPOStep4');
const OGPOStep5 = require('../pageObjects/OGPO/OGPOStep5');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.userPathOGPO = () => {
  it('OGPO user path:', { scrollBehavior: false }, () => {
    let beginDate;
    let endDate;
    mainPage.clickOGPOButton();

    OGPOStep1.pageIsDisplayed();
    OGPOStep1.juridicalSwitchIsChecked().should('be.false');
    OGPOStep1.IPSwitchIsChecked().should('be.false');
    OGPOStep1.residentSwitchIsChecked().should('be.true');
    OGPOStep1.inputIIN(JSONLoader.testData.clientIIN);
    OGPOStep1.clickSearchClientButton();
    OGPOStep1.getLastNameElement()
      .should('have.value', JSONLoader.testData.clientLastName);
    OGPOStep1.getFirstNameElement()
      .should('have.value', JSONLoader.testData.clientFirstName);
    OGPOStep1.getOrSetMiddleNameElement(JSONLoader.testData.clientMiddleName)
      .should('have.value', JSONLoader.testData.clientMiddleName);
    OGPOStep1.getDateOfBirthElement()
      .should('have.value', JSONLoader.testData.clientDateOfBirth);
    OGPOStep1.getSexText()
      .should('be.equal', JSONLoader.testData.clientSex);
    OGPOStep1.getDocumentTypeText()
      .should('be.equal', JSONLoader.testData.clientDocumentType);
    OGPOStep1.getDocumentNumberElement()
      .should('have.value', JSONLoader.testData.clientDocumentNumber);
    OGPOStep1.getDocumentIssueDateElement()
      .should('have.value', JSONLoader.testData.clientDocumentIssueDate);
    OGPOStep1.inputAddress();
    OGPOStep1.inputEmail();
    OGPOStep1.inputPhone();
    OGPOStep1.insuredSwitchIsChecked().should('be.true');
    OGPOStep1.clickInsuredSwitch();
    OGPOStep1.PDLSwitchIsChecked().should('be.false');
    OGPOStep1.clickSaveButton();
    OGPOStep1.clickNextButton();

    OGPOStep2.pageIsDisplayed();
    OGPOStep2.juridicalSwitchIsChecked().should('be.false');
    OGPOStep2.IPSwitchIsChecked().should('be.false');
    OGPOStep2.residentSwitchIsChecked().should('be.true');
    OGPOStep2.inputIIN(JSONLoader.testData.insuredClientIIN);
    OGPOStep2.clickSearchClientButton();
    OGPOStep2.getLastNameElement()
      .should('have.value', JSONLoader.testData.insuredClientLastName);
    OGPOStep2.getFirstNameElement()
      .should('have.value', JSONLoader.testData.insuredClientFirstName);
    OGPOStep2.getOrSetMiddleNameElement(JSONLoader.testData.insuredClientMiddleName)
      .should('have.value', JSONLoader.testData.insuredClientMiddleName);
    OGPOStep2.getDateOfBirthElement()
      .should('have.value', JSONLoader.testData.insuredClientDateOfBirth);
    OGPOStep2.getSexText()
      .should('be.equal', JSONLoader.testData.insuredClientSex);
    OGPOStep2.getDocumentTypeText()
      .should('be.equal', JSONLoader.testData.insuredClientDocumentType);
    OGPOStep2.getDocumentNumberElement()
      .should('have.value', JSONLoader.testData.insuredClientDocumentNumber);
    OGPOStep2.getDocumentIssueDateElement()
      .should('have.value', JSONLoader.testData.insuredClientDocumentIssueDate);
    OGPOStep2.getClassIDLabelText()
      .should('be.equal', JSONLoader.testData.insuredClientClassID);
    OGPOStep2.getDriverLicenceTypeText()
      .should('be.equal', JSONLoader.testData.insuredClientDriverLicenceType);
    OGPOStep2.getDriverLicenceNumberElement()
      .should('have.value', JSONLoader.testData.insuredClientDriverLicenceNumber);
    OGPOStep2.getDriverLicenceIssueDateElement()
      .should('have.value', JSONLoader.testData.insuredClientDriverLicenceIssueDate);
    OGPOStep2.experienceLessThan2YearsSwitchIsChecked().should('be.false');
    OGPOStep2.pensionerSwitchIsChecked().should('be.false');
    OGPOStep2.invalidSwitchIsChecked().should('be.false');
    OGPOStep2.PDLSwitchIsChecked().should('be.false');
    OGPOStep2.clickSaveButton();
    OGPOStep2.clickNextButton();

    OGPOStep3.pageIsDisplayed();
    OGPOStep3.inputVehicleData();
    OGPOStep3.clickSearchVehicleButton();
    OGPOStep3.inputVehicleDataWithDisabledVerification();
    OGPOStep3.getCarRegDateElement()
      .should('have.value', JSONLoader.testData.carRegDate);
    OGPOStep3.getCarRegionText()
      .should('be.equal', JSONLoader.testData.carRegion);
    OGPOStep3.getCarVINElement()
      .should('have.value', JSONLoader.testData.carVIN);
    OGPOStep3.getCarTypeText()
      .should('be.equal', JSONLoader.testData.carType);
    OGPOStep3.getCarManufacturedYearText()
      .should('be.equal', JSONLoader.testData.carManufacturedYear);
    OGPOStep3.getCarEngineVolumeElement()
      .should('have.value', JSONLoader.testData.carEngineVolume);
    OGPOStep3.getCarMarkElement()
      .should('have.value', JSONLoader.testData.carMark);
    OGPOStep3.getCarModelElement()
      .should('have.value', JSONLoader.testData.carModel);
    OGPOStep3.clickSaveButton();
    OGPOStep3.clickNextButton();

    OGPOStep4.pageIsDisplayed();
    OGPOStep4.getPeriodText()
      .should('be.equal', JSONLoader.testData.OGPOperiod);
    OGPOStep4.inputRandomBeginDate();
    OGPOStep4.getBeginDateTitle().then((title) => { beginDate = title; });
    OGPOStep4.getEndDateTitle()
      .then((title) => {
        endDate = title;
        OGPOStep4.calculateEndDate().should('be.equal', endDate);
      });
    OGPOStep4.clickCalculatePremiumButton();
    OGPOStep4.getNextButtonElement().should('be.enabled');
    OGPOStep4.getSumToPay()
      .then((sum) => cy.setLocalStorage('sumToPay', sum));
    OGPOStep4.clickNextButton();

    OGPOStep5.pageIsDisplayed();
    const clientFullName = `${JSONLoader.testData.clientLastName} ${
      JSONLoader.testData.clientFirstName} ${
      JSONLoader.testData.clientMiddleName}`;
    OGPOStep5.getHolderText().should('be.equal', clientFullName);
    const insuredClientFullName = `${JSONLoader.testData.insuredClientLastName} ${
      JSONLoader.testData.insuredClientFirstName} ${
      JSONLoader.testData.insuredClientMiddleName}`;
    OGPOStep5.getListOfInsuredPeopleText()
      .should('be.equal', insuredClientFullName);
    const carFullName = `${JSONLoader.testData.carMark}, ${
      JSONLoader.testData.carModel}, ${
      JSONLoader.testData.carNumber}`;
    OGPOStep5.getListOfCarsText().should('be.equal', carFullName);
    OGPOStep5.getInsurancePeriodBeforeIssuingText().then((text) => {
      cy.wrap(`${beginDate} - ${endDate}`).should('be.equal', text);
    });
    OGPOStep5.getInsurancePeriodBeforeIssuingText()
      .then((text) => cy.wrap(`${beginDate} - ${endDate}`)
        .should('be.equal', text));
    OGPOStep5.clickIssuePolicyButton();

    OGPOStep5.getPolicyNumberText().should('contain', JSONLoader.testData.OGPOPolicyCodeNumber);
    OGPOStep5.getStatusText()
      .should('be.equal', JSONLoader.testData.issuedStatus);
    OGPOStep5.getSlicedCreationDate()
      .should('be.equal', moment().format(JSONLoader.testData.datesFormatFrontEnd));
    OGPOStep5.getInsurancePeriodAfterIssuingText().then((text) => {
      cy.wrap(`${beginDate} - ${endDate}`).should('be.equal', text);
    });
    OGPOStep5.getInsurancePeriodAfterIssuingText()
      .then((text) => cy.wrap(`${beginDate} - ${endDate}`)
        .should('be.equal', text));
    OGPOStep5.getHolderText().should('be.equal', clientFullName);
    OGPOStep5.getListOfInsuredPeopleText()
      .should('be.equal', insuredClientFullName);
    OGPOStep5.getListOfCarsText().should('be.equal', carFullName);
    OGPOStep5.getPaymentCode()
      .then((code) => cy.setLocalStorage('paymentCode', code));
    OGPOStep5.getPolicyNumberText()
      .then((value) => cy.setLocalStorage('OGPOPolicyNumber', value));
    OGPOStep5.getInsurancePeriodAfterIssuingText()
      .then((value) => cy.setLocalStorage('OGPOPolicyInsurancePeriod', value));
  });
};
