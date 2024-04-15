const moment = require('moment');
const OGPOPage = require('../pageObjects/OGPOPage');
const mutualPage = require('../pageObjects/MutualPage');
const JSONLoader = require('../../main/utils/data/JSONLoader');

describe('Mutual smoke test:', () => {
  it('Mutual user path:', { scrollBehavior: false }, () => {
    OGPOPage.clickMutualButton();
    OGPOPage.clickConfirmIssueMutualButton();

    mutualPage.pageIsDisplayed();

    mutualPage.clickHolderStepButton();
    mutualPage.juridicalSwitchIsChecked().should('be.equal', false);
    mutualPage.IPSwitchIsChecked().should('be.equal', false);
    mutualPage.residentSwitchIsChecked().should('be.equal', true);
    mutualPage.getIINText().should('be.equal', JSONLoader.testData.clientIIN);
    mutualPage.getLastNameText().should('be.equal', JSONLoader.testData.clientLastName);
    mutualPage.getFirstNameText().should('be.equal', JSONLoader.testData.clientFirstName);
    mutualPage.getMiddleNameText().should('be.equal', JSONLoader.testData.clientMiddleName);
    mutualPage.getDateOfBirthText().should('be.equal', JSONLoader.testData.clientDateOfBirth);
    mutualPage.getSexText().should('be.equal', JSONLoader.testData.clientSex);
    mutualPage.getDocumentTypeText().should('be.equal', JSONLoader.testData.clientDocumentType);
    mutualPage.getDocumentNumberText().should('be.equal', JSONLoader.testData.clientDocumentNumber);
    mutualPage.getDocumentGivenDateText().should('be.equal', JSONLoader.testData.clientDocumentIssueDate);
    mutualPage.getAddressText().should('be.equal', JSONLoader.testData.clientAddress);
    mutualPage.getEmailText().should('be.equal', JSONLoader.testData.clientEmail);
    mutualPage.getMobileNumberText().should('be.equal', JSONLoader.testData.clientPhoneFormatted);
    mutualPage.getIsPDLText().should('be.equal', JSONLoader.testData.clientIsPDL);

    mutualPage.clickInsuredStepButton();
    mutualPage.juridicalSwitchIsChecked().should('be.equal', false);
    mutualPage.IPSwitchIsChecked().should('be.equal', false);
    mutualPage.residentSwitchIsChecked().should('be.equal', true);
    mutualPage.getIINText().should('be.equal', JSONLoader.testData.insuredClientIIN);
    mutualPage.getLastNameText().should('be.equal', JSONLoader.testData.insuredClientLastName);
    mutualPage.getFirstNameText().should('be.equal', JSONLoader.testData.insuredClientFirstName);
    mutualPage.getMiddleNameText().should('be.equal', JSONLoader.testData.insuredClientMiddleName);
    mutualPage.getDateOfBirthText().should('be.equal', JSONLoader.testData.insuredClientDateOfBirth);
    mutualPage.getSexText().should('be.equal', JSONLoader.testData.insuredClientSex);
    mutualPage.getDocumentTypeText().should('be.equal', JSONLoader.testData.insuredClientDocumentType);
    mutualPage.getDocumentNumberText().should('be.equal', JSONLoader.testData.insuredClientDocumentNumber);
    mutualPage.getDocumentGivenDateText().should('be.equal', JSONLoader.testData.insuredClientDocumentIssueDate);
    const insuredFullName = ''.concat(
      JSONLoader.testData.insuredClientLastName, ' ',
      JSONLoader.testData.insuredClientFirstName, ' ',
      JSONLoader.testData.insuredClientMiddleName,
    );
    mutualPage.getInsuredLastnameTabText().should('be.equal', JSONLoader.testData.insuredClientLastName);
    mutualPage.getClassIDText().should('be.equal', JSONLoader.testData.insuredClientClassID);
    mutualPage.getDriverLicenceTypeText().should('be.equal', JSONLoader.testData.insuredClientDriverLicenceType);
    mutualPage.getDriverLicenceNumberText().should('be.equal', JSONLoader.testData.insuredClientDriverLicenceNumber);
    mutualPage.getDriverLicenceIssueDateText().should('be.equal', JSONLoader.testData.insuredClientDriverLicenceIssueDate);
    mutualPage.experienceLessThan2YearsSwitchIsChecked().should('be.equal', false);
    mutualPage.getIsPensionerText().should('be.equal', JSONLoader.testData.insuredClientIsInvalid);
    mutualPage.getIsInvalidText().should('be.equal', JSONLoader.testData.insuredClientIsPensioner);
    mutualPage.getIsPDLText().should('be.equal', JSONLoader.testData.insuredClientIsPDL);

    mutualPage.clickCarStepButton();
    mutualPage.getCarTabText().should('be.equal', JSONLoader.testData.carNumber);
    mutualPage.getCarRegNumText().should('be.equal', JSONLoader.testData.carNumber);
    mutualPage.getCarRegCertNumText().should('be.equal', JSONLoader.testData.carRegistration);
    mutualPage.getCarRegDateLabelText().should('be.equal', JSONLoader.testData.carRegDate);
    mutualPage.getCarRegionText().should('be.equal', JSONLoader.testData.carRegion);
    mutualPage.getCarVINText().should('be.equal', JSONLoader.testData.carVIN);
    mutualPage.getCarTypeText().should('be.equal', JSONLoader.testData.carType);
    mutualPage.getCarManufacturedYearText().should('be.equal', JSONLoader.testData.carManufacturedYear);
    mutualPage.getCarEngineVolumeText().should('be.equal', JSONLoader.testData.carEngineVolume);
    mutualPage.getCarMarkText().should('be.equal', JSONLoader.testData.carMark);
    mutualPage.getCarModelText().should('be.equal', JSONLoader.testData.carModel);

    mutualPage.clickOGPOPolicyStepButton();
    mutualPage.getOGPOPolicyNumberText()
      .then((currentValue) => cy.getLocalStorage('OGPOPolicyNumber')
        .then((storedValue) => cy.wrap(storedValue).should('be.equal', currentValue)));
    mutualPage.getOGPOPolicyStatusText().should('be.equal', JSONLoader.testData.issuedStatus);
    mutualPage.getSlicedOGPOPolicyIssueDateText().should('be.equal', moment().format(JSONLoader.testData.datesFormatFrontEnd));
    mutualPage.getOGPOInsurancePeriodText()
      .then((currentValue) => cy.getLocalStorage('OGPOPolicyInsurancePeriod')
        .then((storedValue) => cy.wrap(storedValue).should('be.equal', currentValue)));
    const holderFullName = ''.concat(JSONLoader.testData.clientLastName, ' ', JSONLoader.testData.clientFirstName, ' ', JSONLoader.testData.clientMiddleName);
    mutualPage.getOGPOHolderText().should('be.equal', holderFullName);
    mutualPage.getOGPOListOfInsuredPeopleText().should('be.equal', insuredFullName);
    const listOfCars = ''.concat(JSONLoader.testData.carMark, ', ', JSONLoader.testData.carModel, ', ', JSONLoader.testData.carNumber);
    mutualPage.getOGPOListOfCarsText().should('be.equal', listOfCars);

    mutualPage.clickIssueMutualPolicyStepButton();
    mutualPage.getStatusText().should('be.equal', JSONLoader.testData.draftStatus);
    mutualPage.getInsurancePeriodText()
      .then((currentValue) => cy.getLocalStorage('OGPOPolicyInsurancePeriod')
        .then((storedValue) => cy.wrap(storedValue).should('be.equal', currentValue)));
    mutualPage.getUnifiedCombinedLimitText().should('be.equal', JSONLoader.testData.unifiedCombinedLimit);
    mutualPage.getPremiumText().should('be.equal', JSONLoader.testData.mutualPremium);
    mutualPage.clickIssuePolicyButton();

    mutualPage.getPolicyNumberText().should('contain', '219-');
    mutualPage.getPaymentCode().then((code) => {
      cy.setLocalStorage('paymentCode', code);
      cy.setLocalStorage('sumToPay', JSONLoader.testData.mutualPremium);
    });
  });
});
