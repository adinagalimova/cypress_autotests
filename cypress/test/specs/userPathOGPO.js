const mainPage = require('../pageObjects/mainPage');
const OGPOPage = require('../pageObjects/OGPOPage');
const NodeEvents = require('../../support/nodeEvents');
const JSONLoader = require('../../main/utils/data/JSONLoader');

const userPathOGPO = (login) => {
    describe('OGPO smoke test:', () => {

        login();

        it('OGPO client path:', { scrollBehavior: false }, () => {

            mainPage.clickOGPOLink();
            OGPOPage.pageIsDisplayed();
            OGPOPage.fillIIN();
            OGPOPage.clickSearchClientButton();
            OGPOPage.getFirstNameElement().should('have.value', 'САБАХУДИН');
            OGPOPage.clickSaveButton();
            OGPOPage.clickNextButton();
            OGPOPage.clickSaveButton();
            OGPOPage.clickNextButton();
            OGPOPage.fillVehicleData();
            OGPOPage.clickSearchVehicleButton();
            OGPOPage.clickSaveButton();
            OGPOPage.clickNextButton();


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