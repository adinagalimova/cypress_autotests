const moment = require('moment');
const mainPage = require('../pageObjects/mainPage');
const OGPOPage = require('../pageObjects/OGPOPage');
const JSONLoader = require('../../main/utils/data/JSONLoader');

describe('OGPO smoke test:', () => {
    it('OGPO user path:', { scrollBehavior: false }, () => {
        let beginDate, endDate;
        mainPage.clickOGPOButton();

        OGPOPage.pageIsDisplayed();
        OGPOPage.inputIIN();
        OGPOPage.clickSearchClientButton();
        OGPOPage.getFirstNameElement()
        .should('have.value', JSONLoader.testData.clientFirstName);
        OGPOPage.getLastNameElement()
        .should('have.value', JSONLoader.testData.clientLastName);
        OGPOPage.getOrSetMiddleNameElement()
        .should('have.value', JSONLoader.testData.clientMiddleName);
        OGPOPage.getDateOfBirthElement()
        .should('have.value', JSONLoader.testData.clientDateOfBirth);
        OGPOPage.getSexText()
        .should('be.equal', JSONLoader.testData.clientSex);
        OGPOPage.getDocumentTypeText()
        .should('be.equal', JSONLoader.testData.clientDocumentType);
        OGPOPage.getDocumentNumberElement()
        .should('have.value', JSONLoader.testData.clientDocumentNumber);
        OGPOPage.getDocumentGivenDateElement()
        .should('have.value', JSONLoader.testData.clientDocumentGivenDate);
        OGPOPage.inputAddress();
        OGPOPage.inputEmail();
        OGPOPage.inputPhone();
        OGPOPage.clickSaveButton();
        OGPOPage.clickNextButton();

        OGPOPage.getFirstNameElement()
        .should('have.value', JSONLoader.testData.clientFirstName);
        OGPOPage.getLastNameElement()
        .should('have.value', JSONLoader.testData.clientLastName);
        OGPOPage.getOrSetMiddleNameElement()
        .should('have.value', JSONLoader.testData.clientMiddleName);
        OGPOPage.getDateOfBirthElement()
        .should('have.value', JSONLoader.testData.clientDateOfBirth);
        OGPOPage.getSexText()
        .should('be.equal', JSONLoader.testData.clientSex);
        OGPOPage.getDocumentTypeText()
        .should('be.equal', JSONLoader.testData.clientDocumentType);
        OGPOPage.getDocumentNumberElement()
        .should('have.value', JSONLoader.testData.clientDocumentNumber);
        OGPOPage.getDocumentGivenDateElement()
        .should('have.value', JSONLoader.testData.clientDocumentGivenDate);
        OGPOPage.getDriverLicenceTypeText()
        .should('be.equal', JSONLoader.testData.clientDriverLicenceType);
        OGPOPage.getDriverLicenceNumberElement()
        .should('have.value', JSONLoader.testData.clientDriverLicenceNumber);
        OGPOPage.getDriverLicenceIssueDateElement()
        .should('have.value', JSONLoader.testData.clientDriverLicenceIssueDate);
        OGPOPage.clickSaveButton();
        OGPOPage.clickNextButton();

        OGPOPage.inputVehicleData();
        OGPOPage.clickSearchVehicleButton();
        OGPOPage.inputVehicleDataWithDisabledVerification();
        OGPOPage.getCarRegDateElement()
        .should('have.value', JSONLoader.testData.carRegDate);
        OGPOPage.getCarRegionText()
        .should('be.equal', JSONLoader.testData.carRegion);
        OGPOPage.getCarVINElement()
        .should('have.value', JSONLoader.testData.carVIN);
        OGPOPage.getCarTypeText()
        .should('be.equal', JSONLoader.testData.carType);
        OGPOPage.getCarManufacturedYearText()
        .should('be.equal', JSONLoader.testData.carManufacturedYear);
        OGPOPage.getCarEngineVolumeElement()
        .should('have.value', JSONLoader.testData.carEngineVolume);
        OGPOPage.getCarMarkElement()
        .should('have.value', JSONLoader.testData.carMark);
        OGPOPage.getCarModelElement()
        .should('have.value', JSONLoader.testData.carModel);
        OGPOPage.clickSaveButton();
        OGPOPage.clickNextButton();

        OGPOPage.getPeriodText()
        .should('be.equal', JSONLoader.testData.OGPOperiod);
        OGPOPage.inputRandomBeginDate();
        OGPOPage.getBeginDateTitle().then((title) => beginDate = title);
        OGPOPage.getEndDateTitle().then((title) => {
            endDate = title;
            OGPOPage.calculateEndDate().should('be.equal', endDate);
        });
        OGPOPage.clickCalculatePremiumButton();
        OGPOPage.getNextButtonElement().should('be.enabled');
        OGPOPage.getSumToPay().then((sum) => cy.setLocalStorage('sumToPay', sum));
        OGPOPage.clickNextButton();

        const clientFullName = JSONLoader.testData.clientLastName 
        + " " + JSONLoader.testData.clientFirstName 
        + " " + JSONLoader.testData.clientMiddleName;
        OGPOPage.getHolderText().should('be.equal', clientFullName);
        OGPOPage.getListOfInsuredPeopleText().should('be.equal', clientFullName);
        const carFullName = JSONLoader.testData.carMark 
        + ", " + JSONLoader.testData.carModel 
        + ", " + JSONLoader.testData.carNumber;
        OGPOPage.getListOfCarsText().should('be.equal', carFullName);
        OGPOPage.getInsurancePeriodBeforeIssuingText().then((text) => {
            cy.wrap(beginDate + " - " + endDate).should('be.equal', text);
        });
        OGPOPage.getInsurancePeriodBeforeIssuingText()
        .then((text) => cy.wrap(beginDate + " - " + endDate).should('be.equal', text));
        OGPOPage.clickIssuePolicyButton();

        OGPOPage.getStatusText().should('be.equal', JSONLoader.testData.issuedStatus);
        OGPOPage.getSlicedCreationDate()
        .should('be.equal', moment().format(JSONLoader.testData.datesFormatFrontEnd));
        OGPOPage.getInsurancePeriodAfterIssuingText().then((text) => {
            cy.wrap(beginDate + " - " + endDate).should('be.equal', text);
        });
        OGPOPage.getInsurancePeriodAfterIssuingText()
        .then((text) => cy.wrap(beginDate + " - " + endDate).should('be.equal', text));
        OGPOPage.getHolderText().should('be.equal', clientFullName);
        OGPOPage.getListOfInsuredPeopleText().should('be.equal', clientFullName);
        OGPOPage.getListOfCarsText().should('be.equal', carFullName);
        OGPOPage.getPaymentCode()
        .then((code) => cy.setLocalStorage('paymentCode', code));
    });
});