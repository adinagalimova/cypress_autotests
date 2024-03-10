const mainPage = require('../pageObjects/mainPage');
const OGPOPage = require('../pageObjects/OGPOPage');
const NodeEvents = require('../../support/nodeEvents');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const chai = require('chai');
const moment = require('moment');

chai.should();

const userPathOGPO = (login) => {
    describe('OGPO smoke test:', () => {

        login();

        it('OGPO client path:', { scrollBehavior: false }, () => {

            mainPage.clickOGPOLink();

            OGPOPage.pageIsDisplayed();
            OGPOPage.fillIIN();
            OGPOPage.clickSearchClientButton();
            OGPOPage.getFirstNameElement().should('have.value', JSONLoader.testData.clientFirstName);
            OGPOPage.getLastNameElement().should('have.value', JSONLoader.testData.clientLastName);
            OGPOPage.getOrSetMiddleNameElement().should('have.value', JSONLoader.testData.clientMiddleName);
            OGPOPage.getBornDateElement().should('have.value', JSONLoader.testData.clientBornDate);
            OGPOPage.getSexText().should('be.equal', JSONLoader.testData.clientSex);
            OGPOPage.getDocumentTypeText().should('be.equal', JSONLoader.testData.clientDocumentType);
            OGPOPage.getDocumentNumberElement().should('have.value', JSONLoader.testData.clientDocumentNumber);
            OGPOPage.getDocumentIssueDateElement().should('have.value', JSONLoader.testData.clientDocumentIssueDate);
            OGPOPage.fillAddressTextbox();
            OGPOPage.fillEmailTextbox();
            OGPOPage.fillPhoneTextbox();
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

            OGPOPage.fillVehicleData();
            OGPOPage.clickSearchVehicleButton();
            OGPOPage.fillVehicleDataDisabledVerification();
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

            OGPOPage.getPeriodText().should('be.equal', JSONLoader.testData.period);
            OGPOPage.inputRandomDates();
            let beginDate, endDate;
            OGPOPage.getBeginDateTitle().then((value) => beginDate = value);
            OGPOPage.getEndDateTitle().then((value) => {
                OGPOPage.calculateEndDate().should('be.equal', value);
                endDate = value;
                cy.logger(`begin date from promise: ${beginDate}\nend date from promise: ${endDate}`);
            });
            OGPOPage.clickCalculatePremiumButton();
            OGPOPage.clickNextButton();

            const clientFullName = JSONLoader.testData.clientLastName + " " + JSONLoader.testData.clientFirstName + " " + JSONLoader.testData.clientMiddleName;
            OGPOPage.getHolderText().should('be.equal', clientFullName);
            OGPOPage.getListOfInsuredPeopleText().should('be.equal', clientFullName);
            const carFullName = JSONLoader.testData.carMark + ", " + JSONLoader.testData.carModel + ", " + JSONLoader.testData.carNumber;
            OGPOPage.getListOfCarsText().should('be.equal', carFullName);
            OGPOPage.getInsurancePeriodTextInPromise().then((value) => {
                const insurancePeriod = beginDate + " - " + endDate;
                expect(value).to.be.equal(insurancePeriod);
            });
            OGPOPage.clickIssuePolicyButton();

            OGPOPage.getStatusText().should('be.equal', JSONLoader.testData.issuedStatus);
            OGPOPage.getCreationDate().should('be.equal', moment().format(JSONLoader.testData.datesFormatFrontEnd));
            OGPOPage.getInsurancePeriodTextInPromise().then((value) => {
                const insurancePeriod = beginDate + " - " + endDate;
                expect(value).to.be.equal(insurancePeriod);
            });
            OGPOPage.getHolderText().should('be.equal', clientFullName);
            OGPOPage.getListOfInsuredPeopleText().should('be.equal', clientFullName);
            OGPOPage.getListOfCarsText().should('be.equal', carFullName);



            // MSTPage.pageIsDisplayed().should('be.true');
            // MSTPage.clickPurchaseButton();
            //
            // policyRequestFormMST.pageIsDisplayed().should('be.true');
            // policyRequestFormMST.selectThreeRandomCountries();
            // policyRequestFormMST.getDisplayedCountries()
            // .then((displayedCountries) => policyRequestFormMST.getSelectedCountries()
            // .should('be.deep.equal', displayedCountries));
            // policyRequestFormMST.inputRandomDates();
            // policyRequestFormMST.getDisplayedDates()
            // .then((displayedDates) => policyRequestFormMST.getSelectedDates()
            // .should('be.deep.equal', displayedDates));
            // policyRequestFormMST.inputIIN();
            // policyRequestFormMST.getSelectedClientNameElement()
            // .should('contain', JSONLoader.testData.clientName);
            // policyRequestFormMST.getSlicedDisplayedClientName()
            // .then((slicedName) => policyRequestFormMST.getSelectedClientNameElement()
            // .should('contain', slicedName));
            // policyRequestFormMST.selectRandomInsuranceLimit();
            // policyRequestFormMST.selectRandomPurposeOfTheTrip();
            // policyRequestFormMST.getDisplayedPurposeOfTheTrip()
            // .then((displayedPurpose) => policyRequestFormMST.getSelectedPurposeOfTheTrip()
            // .should('be.equal', displayedPurpose));
            // policyRequestFormMST.clickRandomAdditionalCheckboxes();
            // policyRequestFormMST.clickCalculateButton();
            // policyRequestFormMST.clickNextButton();
            //
            // policyRequestFormMST.inputAddress();
            // policyRequestFormMST.clickNextButton();
            //
            // policyRequestFormMST.inputEmail();
            // policyRequestFormMST.clickNextButton();
            //
            // policyRequestFormMST.inputPhone();
            // policyRequestFormMST.clickNextButton()
            //
            // policyRequestFormMST.getSMSCodeBoxElement().should('be.visible')
            // .then(() => NodeEvents.getLastCodeFromDB())
            // .then((code) => policyRequestFormMST.enterSMSCode(code));
            //
            // policyRequestFormMST.clickAcceptanceCheckbox();
            // policyRequestFormMST.getSumToPay().then((sum) => {
            //     cy.setLocalStorage('sumToPay', sum);
            //     policyRequestFormMST.getTotalCostFromDisplayedValues()
            //     .should('be.equal', Number(sum));
            // });
        });
    });
}

module.exports = { userPathOGPO };