const DataUtils = require('../../main/utils/data/dataUtils');
const NodeEvents = require('../../support/nodeEvents');
const Randomizer = require("../../main/utils/random/randomizer");
const JSONLoader = require('../../main/utils/data/JSONLoader');
const mainPage = require('../pageObjects/mainPage');
const quoteStep1 = require('../pageObjects/quote/quoteStep1')
const quoteStep2 = require('../pageObjects/quote/quoteStep2')
const quoteStep3 = require('../pageObjects/quote/quoteStep3')
const quoteStep4 = require('../pageObjects/quote/quoteStep4')
const quoteStep5 = require('../pageObjects/quote/quoteStep5')

exports.managerPathQuote = (holder, beneficiary) => {
    it('Quote manager path:', { scrollBehavior: false }, () => {
        NodeEvents.resetClient(holder)
            .then(async (response) => cy.wrap(response.status).should('be.equal', 200));
        NodeEvents.resetClient(beneficiary)
            .then(async (response) => cy.wrap(response.status).should('be.equal', 200));

        mainPage.clickQuoteButton();
        quoteStep1.clickCreateButton();
    // MANAGER
    // STEP 1
        let id_1c;
        let randomElementText;
        let randomInsuranceTypeName;
        let typeId;

        DataUtils.getFromRequests('sales-channels*', 'salesChannels', 'default-insurance-types*','insuranceTypes' ).then( ([salesChannelsResponse, insuranceTypesResponse]) => {
                const salesChannels = salesChannelsResponse
                    .map((el) => ({name: el.name, id_1c: el.id_1c}));
                const salesChannelsNames = salesChannels.map(channel => channel.name);
                randomElementText = Randomizer.getRandomElementByText(salesChannelsNames);
                const randomElement = salesChannels.find((channel) => channel.name === randomElementText);
                id_1c = randomElement.id_1c;

                 const insuranceTypes = insuranceTypesResponse.data
                     .map((el)=> ({title:el.title, insurance_type_id: el.id_1c}));
                 const insuranceTypesNames = insuranceTypes.map(type => type.title);
                 randomInsuranceTypeName = Randomizer.getRandomElementByText(insuranceTypesNames);
                 const randomType = insuranceTypes.find((type) => type.title === randomInsuranceTypeName)
                 typeId = randomType.insurance_type_id;
        });

        quoteStep1.pageIsDisplayed().should('be.true');
        quoteStep1.inputDataHolderIIN(holder.iin);
        quoteStep1.clickSearchClientButton();
        quoteStep1.getLastNameElement()
            .should('have.value', holder.last_name);
        quoteStep1.getFirstNameElement()
            .should('have.value', holder.first_name);
        quoteStep1.getOrSetMiddleNameElement(holder.middle_name)
            .should('have.value', holder.middle_name);
        quoteStep1.getDateOfBirthElement()
            .should('have.value', holder.born.DMY);
        quoteStep1.getSexText()
            .should('be.equal', holder.sex);
        quoteStep1.getDocumentTypeText()
            .should('be.equal', holder.document_type);
        quoteStep1.getDocumentNumberElement()
            .should('have.value', holder.document_number);
        quoteStep1.getDocumentIssuedDateElement()
            .should('have.value', holder.document_gived_date.DMY);
        quoteStep1.getOrSetDocumentIssuedByElement(holder.document_gived_by_quote)
            .should('be.equal', holder.document_gived_by_quote);
        quoteStep1.getOrSetAddressElement(holder.address)
            .should('have.value', holder.address);
        quoteStep1.getOrSetEmailElement(holder.email)
            .should('have.value', holder.email);
        quoteStep1.inputPhoneNumber(holder.phone);
        quoteStep1.clickNextButton();

    //  STEP 2
        quoteStep2.pageIsDisplayed().should('be.true');
        quoteStep2.inputDataInsuredIIN(beneficiary.iin);
        quoteStep2.clickSearchClientButton();
        quoteStep2.getLastNameElement()
            .should('have.value', beneficiary.last_name);
        quoteStep2.getFirstNameElement()
            .should('have.value', beneficiary.first_name);
        quoteStep2.getOrSetMiddleNameElement(beneficiary.middle_name)
            .should('have.value', beneficiary.middle_name);
        quoteStep2.getDateOfBirthElement()
            .should('have.value', beneficiary.born.DMY);
        quoteStep2.getSexText().should('be.equal', beneficiary.sex);
        quoteStep2.getDocumentTypeText()
            .should('be.equal', beneficiary.document_type);
        quoteStep2.getDocumentNumberElement()
            .should('have.value', beneficiary.document_number);
        quoteStep2.getDocumentIssuedDateElement()
            .should('have.value', beneficiary.document_gived_date.DMY);
        quoteStep2.getOrSetDocumentIssuedByElement(beneficiary.document_gived_by_quote)
            .should('be.equal', beneficiary.document_gived_by_quote);
        quoteStep2.getOrSetAddressElement(beneficiary.address)
            .should('have.value', beneficiary.address);
        quoteStep2.getOrSetEmailElement(beneficiary.email)
            .should('have.value', beneficiary.email);
        quoteStep2.inputPhoneNumber(holder.phone);
        quoteStep2.clickNextButton();

        //STEP 3
        quoteStep3.pageIsDisplayed().should('be.true');
        quoteStep3.chooseFranchiseOption();
        quoteStep3.inputValueForDamageFranchise();
        quoteStep3.inputValueForLossFranchise();
        quoteStep3.chooseFranchiseType();
        quoteStep3.checkValueFranchiseForDamage().then((value) => {
            cy.setLocalStorage('ValueForDamageFranchise', value);
            cy.saveLocalStorage();
        });
        quoteStep3.checkValueFranchiseForLoss().then((value) => {
            cy.setLocalStorage('ValueForFranchiseLoss', value);
            cy.saveLocalStorage();
        })
        quoteStep3.inputAdditionalInformation();
        quoteStep3.clickNextButton();

        // STEP 4
        quoteStep4.pageIsDisplayed().should('be.true').then(() => {
            const regex= new RegExp(JSONLoader.testData.salesChannelsInterceptRegex.replace('${id_1c}', id_1c));
            cy.intercept(regex).as('channelDetails')
            quoteStep4.clickRandomSalesChannel(randomElementText);
        });
        cy.wait('@channelDetails').then((interception) => {
            const channelDetails = interception.response.body
                .map((el) => ({ name: el.name, id_1c: el.id_1c }));
            const channelDetailsNames = channelDetails.map(channel => channel.name);
            if (channelDetailsNames.length !== 0){
            randomElementText = Randomizer.getRandomElementByText(channelDetailsNames);
            quoteStep4.clickRandomChannelDetail(randomElementText);
        }});
        quoteStep4.chooseAgent().then(() => {
            const regex= new RegExp(JSONLoader.testData.insuranceTypesInterceptRegex.replace('${typeId}', typeId));
            cy.intercept(regex).as('insuranceProducts')
            quoteStep4.clickRandomInsuranceType(randomInsuranceTypeName);
        });
        cy.wait('@insuranceProducts').then((interception) => {
            const insuranceProducts = interception.response.body.data;
            const insuranceProductNames = insuranceProducts.map(channel => channel.title);
            const randomInsuranceProductName = Randomizer.getRandomElementByText(insuranceProductNames)
            quoteStep4.clickRandomInsuredProduct(randomInsuranceProductName);
        })
        quoteStep4.clickRandomRisks();
        quoteStep4.checkChosenAgent().then((value) => {
            cy.setLocalStorage('agent', value);
            cy.saveLocalStorage();
        })
        quoteStep4.checkSalesChannel().then((text) => {
            cy.setLocalStorage('salesChannel', text);
            cy.saveLocalStorage();
        })
        quoteStep4.checkChannelDetails().then((text) => {
            cy.setLocalStorage('channelDetails', text);
            cy.saveLocalStorage();
        })
        quoteStep4.checkInsuranceType().then((text) => {
            cy.setLocalStorage('insuranceType', text);
            cy.saveLocalStorage();
        })
        quoteStep4.checkInsuranceProduct().then((text) => {
            cy.setLocalStorage('insuranceProduct', text);
            cy.saveLocalStorage();
        })
        quoteStep4.inputAgentCommission();
        quoteStep4.clickContractType();
        quoteStep4.getChosenContractType().then((type) => {
            if (type === 'Допсоглашение') {
                quoteStep4.inputContractNumber();
                quoteStep4.inputContractQuoteNumber();
            }
        });
        quoteStep4.chooseUnderwriter();
        quoteStep4.clickReinsuranceRequired();
        quoteStep4.clickReinsuranceType();
        quoteStep4.inputInsurancePeriod();
        quoteStep4.inputInsuranceAmount();
        quoteStep4.inputTariff();
        quoteStep4.checkInsurancePeriod().then((value) => {
            cy.setLocalStorage('insurancePeriod', value);
            cy.saveLocalStorage();
        })
        quoteStep4.checkInsuranceAmount().then((value) => {
            cy.setLocalStorage('insuranceAmount', value);
            cy.saveLocalStorage();
        })
        quoteStep4.checkTariff().then((value) => {
            cy.setLocalStorage('tariff', value);
            cy.saveLocalStorage();
        })
        quoteStep4.clickNextButton();

        // STEP 5
        quoteStep5.pageIsDisplayed().should('be.true');
        quoteStep5.inputInsuranceObjects();
        quoteStep5.inputObjectCount();
        quoteStep5.uploadButtonClick();
        quoteStep5.inputManagerComments();
        quoteStep5.checkObjectCount().then((value) => {
            cy.setLocalStorage('objectCount', value);
            cy.saveLocalStorage();
        })
        quoteStep5.clickSaveButton();
        quoteStep5.getUploadedFile();
        quoteStep5.clickSubmitForReviewButton();
        quoteStep5.clickLogoutButton();
    });
};
