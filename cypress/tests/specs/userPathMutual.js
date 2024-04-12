const moment = require('moment');
const mainPage = require('../pageObjects/mainPage');
const OGPOPage = require('../pageObjects/OGPOPage');
const mutualPage = require('../pageObjects/MutualPage');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const loginPage = require("../pageObjects/loginPage");

describe('Mutual smoke test:', () => {
    it('Mutual user path:', { scrollBehavior: false }, () => {
        OGPOPage.clickMutualButton();
        OGPOPage.clickConfirmIssueMutualButton();

        // mainPage.clickMutualButton();
        // mutualPage.clickPolicyForDevelopmentButton();

        mutualPage.pageIsDisplayed();

        mutualPage.clickHolderStepButton();
        mutualPage.isJuridicalSwitchOff().should('be.equal', true);
        mutualPage.isIPSwitchOff().should('be.equal', true);
        mutualPage.isResidentSwitchON().should('be.equal', true);
        mutualPage.getIINText().should('be.equal', JSONLoader.testData.clientIIN);
        mutualPage.getLastNameText().should('be.equal', JSONLoader.testData.clientLastName);
        mutualPage.getFirstNameText().should('be.equal', JSONLoader.testData.clientFirstName);
        mutualPage.getMiddleNameText().should('be.equal', JSONLoader.testData.clientMiddleName);
        mutualPage.getDateOfBirthText().should('be.equal', JSONLoader.testData.clientDateOfBirth);
        mutualPage.getSexText().should('be.equal', JSONLoader.testData.clientSex);
        mutualPage.getDocumentTypeText().should('be.equal', JSONLoader.testData.clientDocumentType);
        mutualPage.getDocumentNumberText().should('be.equal', JSONLoader.testData.clientDocumentNumber);
        mutualPage.getDocumentGivenDateText().should('be.equal', JSONLoader.testData.clientDocumentGivenDate);
        mutualPage.getAddressText().should('be.equal', JSONLoader.testData.clientAddress);
        mutualPage.getEmailText().should('be.equal', JSONLoader.testData.clientEmail);
        mutualPage.getMobileNumberText().should('be.equal', JSONLoader.testData.clientPhoneFormatted);
        mutualPage.getIsPDLText().should('be.equal', JSONLoader.testData.clientIsPDL);

        mutualPage.clickInsuredStepButton();
        mutualPage.isJuridicalSwitchOff().should('be.equal', true);
        mutualPage.isIPSwitchOff().should('be.equal', true);
        mutualPage.isResidentSwitchON().should('be.equal', true);
        mutualPage.getIINText().should('be.equal', JSONLoader.testData.clientIIN);
        mutualPage.getLastNameText().should('be.equal', JSONLoader.testData.clientLastName);
        mutualPage.getFirstNameText().should('be.equal', JSONLoader.testData.clientFirstName);
        mutualPage.getMiddleNameText().should('be.equal', JSONLoader.testData.clientMiddleName);
        mutualPage.getDateOfBirthText().should('be.equal', JSONLoader.testData.clientDateOfBirth);
        mutualPage.getSexText().should('be.equal', JSONLoader.testData.clientSex);
        mutualPage.getDocumentTypeText().should('be.equal', JSONLoader.testData.clientDocumentType);
        mutualPage.getDocumentNumberText().should('be.equal', JSONLoader.testData.clientDocumentNumber);
        mutualPage.getDocumentGivenDateText().should('be.equal', JSONLoader.testData.clientDocumentGivenDate);
        const insuredFullName = ''.concat(JSONLoader.testData.clientLastName, ' ',JSONLoader.testData.clientFirstName, ' ', JSONLoader.testData.clientMiddleName);
        mutualPage.getInsuredFullNameTabText().should('be.equal', insuredFullName);
        mutualPage.getClassIDText().should('be.equal', JSONLoader.testData.clientClassID);
        mutualPage.getDriverLicenceTypeText().should('be.equal', JSONLoader.testData.clientDriverLicenceType);
        mutualPage.getDriverLicenceNumberText().should('be.equal', JSONLoader.testData.clientDriverLicenceNumber);
        mutualPage.getDriverLicenceIssueDateText().should('be.equal', JSONLoader.testData.clientDriverLicenceIssueDate);
        mutualPage.isExperienceLessThan2YearsSwitchOFF().should('be.equal', true);
        mutualPage.getIsPensionerText().should('be.equal', JSONLoader.testData.clientIsPensioner);
        mutualPage.getIsInvalidText().should('be.equal', JSONLoader.testData.clientIsInvalid);
        mutualPage.getIsPDLText().should('be.equal', JSONLoader.testData.clientIsPDL);

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
            .then((currentValue) =>
                cy.getLocalStorage('OGPOPolicyNumber')
                    .then((storedValue) =>
                        cy.wrap(storedValue).should('be.equal', currentValue)));
        mutualPage.getOGPOPolicyStatusText().should('be.equal', JSONLoader.testData.issuedStatus);
        mutualPage.getSlicedOGPOPolicyIssueDateText().should('be.equal', moment().format(JSONLoader.testData.datesFormatFrontEnd));
        mutualPage.getOGPOInsurancePeriodText()
            .then((currentValue) =>
                cy.getLocalStorage('OGPOPolicyInsurancePeriod')
                    .then((storedValue) =>
                        cy.wrap(storedValue).should('be.equal', currentValue)));
        const holderFullName = ''.concat(JSONLoader.testData.clientLastName, ' ', JSONLoader.testData.clientFirstName, ' ', JSONLoader.testData.clientMiddleName);
        mutualPage.getOGPOHolderText().should('be.equal', holderFullName);
        mutualPage.getOGPOListOfInsuredPeopleText().should('be.equal', insuredFullName);
        const listOfCars = ''.concat(JSONLoader.testData.carMark, ', ', JSONLoader.testData.carModel, ', ', JSONLoader.testData.carNumber);
        mutualPage.getOGPOListOfCarsText().should('be.equal', listOfCars);

        mutualPage.clickIssueMutualPolicyStepButton();
        mutualPage.getStatusText().should('be.equal', JSONLoader.testData.draftStatus);
        mutualPage.getInsurancePeriodText()
            .then((currentValue) =>
                cy.getLocalStorage('OGPOPolicyInsurancePeriod')
                    .then((storedValue) =>
                        cy.wrap(storedValue).should('be.equal', currentValue)));
        mutualPage.getUnifiedCombinedLimitText().should('be.equal', JSONLoader.testData.unifiedCombinedLimit);
        mutualPage.getPremiumText().should('be.equal', JSONLoader.testData.mutualPremium);
        mutualPage.clickIssuePolicyButton();

        mutualPage.getPolicyNumberText().should('contain', '219-');
        mutualPage.getPaymentCode().then((code) => {
            cy.setLocalStorage('paymentCode', code);
            cy.setLocalStorage('sumToPay', JSONLoader.testData.mutualPremium);
        })
    });
});