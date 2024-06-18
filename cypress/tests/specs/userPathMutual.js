const OGPOPage = require('../pageObjects/OGPO/OGPOStep5');
const mutualSteps = require('../pageObjects/mutual/mutualSteps');
const mutualStep1 = require('../pageObjects/mutual/mutualStep1');
const mutualStep2 = require('../pageObjects/mutual/mutualStep2');
const mutualStep3 = require('../pageObjects/mutual/mutualStep3');
const mutualStep4 = require('../pageObjects/mutual/mutualStep4');
const mutualStep5 = require('../pageObjects/mutual/mutualStep5');
const TimeUtils = require('../../main/utils/time/timeUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.userPathMutual = () => {
  it('Mutual user path:', { scrollBehavior: false }, () => {
    OGPOPage.clickMutualButton();
    OGPOPage.clickConfirmIssueMutualButton();

    mutualSteps.pageIsDisplayed();
    mutualSteps.clickHolderStepButton();
    mutualStep1.pageIsDisplayed();
    mutualStep1.juridicalSwitchIsChecked().should('be.false');
    mutualStep1.IPSwitchIsChecked().should('be.false');
    mutualStep1.residentSwitchIsChecked().should('be.true');
    mutualStep1.getIINText()
      .should('be.equal', JSONLoader.testData.clientIIN);
    mutualStep1.getLastNameText()
      .should('be.equal', JSONLoader.testData.clientLastName);
    mutualStep1.getFirstNameText()
      .should('be.equal', JSONLoader.testData.clientFirstName);
    mutualStep1.getMiddleNameText()
      .should('be.equal', JSONLoader.testData.clientMiddleName);
    mutualStep1.getDateOfBirthText()
      .should('be.equal', JSONLoader.testData.clientDateOfBirth);
    mutualStep1.getSexText()
      .should('be.equal', JSONLoader.testData.clientSex);
    mutualStep1.getDocumentTypeText()
      .should('be.equal', JSONLoader.testData.clientDocumentType);
    mutualStep1.getDocumentNumberText()
      .should('be.equal', JSONLoader.testData.clientDocumentNumber);
    mutualStep1.getDocumentIssueDateText()
      .should('be.equal', JSONLoader.testData.clientDocumentIssueDate);
    mutualStep1.getAddressText()
      .should('be.equal', JSONLoader.testData.clientAddress);
    mutualStep1.getEmailText()
      .should('be.equal', JSONLoader.testData.clientEmail);
    mutualStep1.getMobileNumberText()
      .should('be.equal', JSONLoader.testData.clientPhoneFormatted);
    mutualStep1.getIsPDLText()
      .should('be.equal', JSONLoader.testData.clientIsPDL);

    mutualSteps.clickInsuredStepButton();
    mutualStep2.pageIsDisplayed();
    mutualStep2.juridicalSwitchIsChecked().should('be.false');
    mutualStep2.IPSwitchIsChecked().should('be.false');
    mutualStep2.residentSwitchIsChecked().should('be.true');
    mutualStep2.getIINText()
      .should('be.equal', JSONLoader.testData.insuredClientIIN);
    mutualStep2.getLastNameText()
      .should('be.equal', JSONLoader.testData.insuredClientLastName);
    mutualStep2.getFirstNameText()
      .should('be.equal', JSONLoader.testData.insuredClientFirstName);
    mutualStep2.getMiddleNameText()
      .should('be.equal', JSONLoader.testData.insuredClientMiddleName);
    mutualStep2.getDateOfBirthText()
      .should('be.equal', JSONLoader.testData.insuredClientDateOfBirth);
    mutualStep2.getSexText()
      .should('be.equal', JSONLoader.testData.insuredClientSex);
    mutualStep2.getDocumentTypeText()
      .should('be.equal', JSONLoader.testData.insuredClientDocumentType);
    mutualStep2.getDocumentNumberText()
      .should('be.equal', JSONLoader.testData.insuredClientDocumentNumber);
    mutualStep2.getDocumentIssueDateText()
      .should('be.equal', JSONLoader.testData.insuredClientDocumentIssueDate);
    const insuredFullName = `${JSONLoader.testData.insuredClientLastName} ${
      JSONLoader.testData.insuredClientFirstName} ${
      JSONLoader.testData.insuredClientMiddleName}`;
    mutualStep2.getInsuredLastnameTabText()
      .should('be.equal', JSONLoader.testData.insuredClientLastName);
    mutualStep2.getClassIDText()
      .should('be.equal', JSONLoader.testData.insuredClientClassID);
    mutualStep2.getDriverLicenceTypeText()
      .should('be.equal', JSONLoader.testData.insuredClientDriverLicenceType);
    mutualStep2.getDriverLicenceNumberText()
      .should('be.equal', JSONLoader.testData.insuredClientDriverLicenceNumber);
    mutualStep2.getDriverLicenceIssueDateText()
      .should('be.equal', JSONLoader.testData.insuredClientDriverLicenceIssueDate);
    mutualStep2.experienceLessThan2YearsSwitchIsChecked()
      .should('be.false');
    mutualStep2.getIsPensionerText()
      .should('be.equal', JSONLoader.testData.insuredClientIsInvalid);
    mutualStep2.getIsInvalidText()
      .should('be.equal', JSONLoader.testData.insuredClientIsPensioner);
    mutualStep2.getIsPDLText()
      .should('be.equal', JSONLoader.testData.insuredClientIsPDL);

    mutualSteps.clickCarStepButton();
    mutualStep3.pageIsDisplayed();
    mutualStep3.getCarTabText()
      .should('be.equal', JSONLoader.testData.carNumber);
    mutualStep3.getCarRegNumText()
      .should('be.equal', JSONLoader.testData.carNumber);
    mutualStep3.getCarRegCertNumText()
      .should('be.equal', JSONLoader.testData.carRegistration);
    mutualStep3.getCarRegDateLabelText()
      .should('be.equal', JSONLoader.testData.carRegDate);
    mutualStep3.getCarRegionText()
      .should('be.equal', JSONLoader.testData.carRegion);
    mutualStep3.getCarVINText()
      .should('be.equal', JSONLoader.testData.carVIN);
    mutualStep3.getCarTypeText()
      .should('be.equal', JSONLoader.testData.carType);
    mutualStep3.getCarManufacturedYearText()
      .should('be.equal', JSONLoader.testData.carManufacturedYear);
    mutualStep3.getCarEngineVolumeText()
      .should('be.equal', JSONLoader.testData.carEngineVolume);
    mutualStep3.getCarMarkText()
      .should('be.equal', JSONLoader.testData.carMark);
    mutualStep3.getCarModelText()
      .should('be.equal', JSONLoader.testData.carModel);

    mutualSteps.clickOGPOPolicyStepButton();
    mutualStep4.pageIsDisplayed();
    cy.getLocalStorage('OGPOPolicyNumber')
      .then((storedValue) => mutualStep4.getOGPOPolicyNumberText()
        .should('be.equal', storedValue));
    mutualStep4.getOGPOPolicyStatusText()
      .should('be.equal', JSONLoader.testData.issuedStatus);
    const { startDate } = TimeUtils.getDatesInterval(
      ...JSONLoader.testData.timeIncrement,
      { startNextDay: false },
    );
    mutualStep4.getSlicedOGPOPolicyIssueDateText()
      .should('be.equal', startDate);
    cy.getLocalStorage('OGPOPolicyInsurancePeriod')
      .then((storedValue) => mutualStep4.getOGPOInsurancePeriodText()
        .should('be.equal', storedValue));
    const holderFullName = `${JSONLoader.testData.clientLastName} ${
      JSONLoader.testData.clientFirstName} ${
      JSONLoader.testData.clientMiddleName}`;
    mutualStep4.getOGPOHolderText()
      .should('be.equal', holderFullName);
    mutualStep4.getOGPOListOfInsuredPeopleText()
      .should('be.equal', insuredFullName);
    const listOfCars = `${JSONLoader.testData.carMark}, ${
      JSONLoader.testData.carModel}, ${
      JSONLoader.testData.carNumber}`;
    mutualStep4.getOGPOListOfCarsText()
      .should('be.equal', listOfCars);

    mutualSteps.clickIssueMutualPolicyStepButton();
    mutualStep5.pageIsDisplayed();
    mutualStep5.getStatusText()
      .should('be.equal', JSONLoader.testData.draftStatus);
    cy.getLocalStorage('OGPOPolicyInsurancePeriod')
      .then((storedValue) => mutualStep5.getInsurancePeriodText()
        .should('be.equal', storedValue));
    mutualStep5.getUnifiedCombinedLimitText()
      .should('be.equal', JSONLoader.testData.unifiedCombinedLimit);
    mutualStep5.getPremiumText()
      .should('be.equal', JSONLoader.testData.mutualPremium);
    mutualStep5.clickIssuePolicyButton();
    mutualStep5.getPolicyNumberText().should('contain', '219-');
    mutualStep5.getPaymentCode().then((code) => {
      cy.setLocalStorage('paymentCode', code);
      cy.setLocalStorage('sumToPay', JSONLoader.testData.mutualPremium);
    });
    cy.setLocalStorage('installmentPayment', false);
  });
};
