const mainPage = require('../pageObjects/mainPage');
const OGPOPage = require('../pageObjects/OGPOPage');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const moment = require('moment');

describe('OGPO smoke test:', () => {
    it('OGPO user path:', { scrollBehavior: false }, () => {
        mainPage.clickOGPOLink();

        OGPOPage.pageIsDisplayed();
        OGPOPage.inputIIN();
        OGPOPage.clickSearchClientButton();
        OGPOPage.getFirstNameElement().should('have.value', JSONLoader.testData.clientFirstName);
        OGPOPage.getLastNameElement().should('have.value', JSONLoader.testData.clientLastName);
        OGPOPage.getOrSetMiddleNameElement().should('have.value', JSONLoader.testData.clientMiddleName);
        OGPOPage.getBornDateElement().should('have.value', JSONLoader.testData.clientBornDate);
        OGPOPage.getSexText().should('be.equal', JSONLoader.testData.clientSex);
        OGPOPage.getDocumentTypeText().should('be.equal', JSONLoader.testData.clientDocumentType);
        OGPOPage.getDocumentNumberElement().should('have.value', JSONLoader.testData.clientDocumentNumber);
        OGPOPage.getDocumentIssueDateElement().should('have.value', JSONLoader.testData.clientDocumentIssueDate);
        OGPOPage.inputAddress();
        OGPOPage.inputEmail();
        OGPOPage.inputPhone();
        OGPOPage.clickSaveButton();
        OGPOPage.clickNextButton();

        OGPOPage.getFirstNameElement().should('have.value', JSONLoader.testData.clientFirstName);
        OGPOPage.getLastNameElement().should('have.value', JSONLoader.testData.clientLastName);
        OGPOPage.getOrSetMiddleNameElement().should('have.value', JSONLoader.testData.clientMiddleName);
        OGPOPage.getBornDateElement().should('have.value', JSONLoader.testData.clientBornDate);
        OGPOPage.getSexText().should('be.equal', JSONLoader.testData.clientSex);
        OGPOPage.getDocumentTypeText().should('be.equal', JSONLoader.testData.clientDocumentType);
        OGPOPage.getDocumentNumberElement().should('have.value', JSONLoader.testData.clientDocumentNumber);
        OGPOPage.getDocumentIssueDateElement().should('have.value', JSONLoader.testData.clientDocumentIssueDate);
        OGPOPage.getDriverLicenceTypeText().should('be.equal', JSONLoader.testData.clientDriverLicenceType);
        OGPOPage.getDriverLicenceNumberElement().should('have.value', JSONLoader.testData.clientDriverLicenceNumber);
        OGPOPage.getDriverLicenceIssueDateElement().should('have.value', JSONLoader.testData.clientDriverLicenceIssueDate);
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
        OGPOPage.getCarEngineVolumeElement().should('have.value', JSONLoader.testData.carEngineCapacity);
        OGPOPage.getCarMarkElement().should('have.value', JSONLoader.testData.carMark);
        OGPOPage.getCarModelElement().should('have.value', JSONLoader.testData.carModel);
        OGPOPage.clickSaveButton();
        OGPOPage.clickNextButton();

        OGPOPage.getPeriodText().should('be.equal', JSONLoader.testData.OGPOperiod);
        OGPOPage.inputRandomBeginDate();
        let beginDate, endDate;
        OGPOPage.getBeginDateTitle().then((title) => beginDate = title);
        OGPOPage.getEndDateTitle().then((title) => {
            OGPOPage.calculateEndDate().should('be.equal', title);
            endDate = title;
        });
        OGPOPage.clickCalculatePremiumButton();
        OGPOPage.getNextButtonElement().should('be.enabled');
        OGPOPage.getSumToPay().then((sum) => {
            cy.setLocalStorage('sumToPay', sum);
        });
        OGPOPage.clickNextButton();

        const clientFullName = JSONLoader.testData.clientLastName + " " + JSONLoader.testData.clientFirstName + " " + JSONLoader.testData.clientMiddleName;
        OGPOPage.getHolderText().should('be.equal', clientFullName);
        OGPOPage.getListOfInsuredPeopleText().should('be.equal', clientFullName);
        const carFullName = JSONLoader.testData.carMark + ", " + JSONLoader.testData.carModel + ", " + JSONLoader.testData.carNumber;
        OGPOPage.getListOfCarsText().should('be.equal', carFullName);
        OGPOPage.getInsurancePeriodTextInPromise().then((text) => {
            const insurancePeriod = beginDate + " - " + endDate;
            expect(text).to.be.equal(insurancePeriod);
        });
        OGPOPage.clickIssuePolicyButton();

        OGPOPage.getStatusText().should('be.equal', JSONLoader.testData.issuedStatus);
        OGPOPage.getSlicedCreationDate().should('be.equal', moment().format(JSONLoader.testData.datesFormatFrontEnd));
        OGPOPage.getInsurancePeriodTextInPromise().then((text) => {
            const insurancePeriod = beginDate + " - " + endDate;
            expect(text).to.be.equal(insurancePeriod);
        });
        OGPOPage.getHolderText().should('be.equal', clientFullName);
        OGPOPage.getListOfInsuredPeopleText().should('be.equal', clientFullName);
        OGPOPage.getListOfCarsText().should('be.equal', carFullName);
        OGPOPage.getPaymentCodeText().then((code) => {
            cy.setLocalStorage('paymentCode', code);
        });
    });
});