const DataUtils = require('../../main/utils/data/dataUtils');
const NodeEvents = require('../../support/nodeEvents');
const mainPage = require('../pageObjects/mainPage');
const quoteStep1 = require('../pageObjects/quote/quoteStep1')
const quoteStep2 = require('../pageObjects/quote/quoteStep2')
const quoteStep3 = require('../pageObjects/quote/quoteStep3')
const quoteStep4 = require('../pageObjects/quote/quoteStep4')
const Randomizer = require("../../main/utils/random/randomizer");


exports.userPathQuote = (holder, beneficiary) => {
    it('Quote user path:', { scrollBehavior: false }, () => {
        NodeEvents.resetClient(holder)
            .then(async (response) => cy.wrap(response.status).should('be.equal', 200));
        NodeEvents.resetClient(beneficiary)
            .then(async (response) => cy.wrap(response.status).should('be.equal', 200));

        mainPage.clickQuoteButton();
        quoteStep1.clickCreateButton();

// STEP 1
        let id_1c;
        let randomElementText;
        DataUtils.getFromRequest('sales-channels*', 'salesChannels').then( (salesChannelsResponse) => {
            const salesChannels = salesChannelsResponse
                .map((el) => ({ name: el.name, id_1c: el.id_1c }));
            const salesChannelsNames = salesChannels.map(channel => channel.name);
            randomElementText = Randomizer.getRandomElementByText(salesChannelsNames);
            const randomElement = salesChannels.find((channel) => channel.name === randomElementText);
            id_1c = randomElement.id_1c;
        });


        // const insuranseTypes = DataUtils.getInsuranceTypesFromRequest();
        // const insuredProducts = DataUtils.getInsuredProductsFromRequest();
        // const risks = DataUtils.getRisksFromRequest();


        quoteStep1.pageIsDisplayed().should('be.true');
        // quoteStep1.chooseClientType();
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
        // quoteStep1.getDocumentTypeText()
        //     .should('be.equal', holder.document_type);
        // quoteStep1.getDocumentNumberElement()
        //     .should('have.value', holder.document_number);
        // quoteStep1.getDocumentIssuedDateElement()
        //     .should('have.value', holder.document_gived_date.DMY);
        // quoteStep1.getOrSetDocumentIssuedByElement(holder.document_gived_by_quote)
        //     .should('be.equal', holder.document_gived_by_quote);
        // quoteStep1.getOrSetAddressElement(holder.address)
        //     .should('have.value', holder.address);
        // quoteStep1.getOrSetEmailElement(holder.email)
        //     .should('have.value', holder.email);
        // quoteStep1.inputPhoneNumber(holder.phone);
        quoteStep1.clickNextButton();

// // STEP 2
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
        // quoteStep2.getDocumentTypeText()
        //     .should('be.equal', beneficiary.document_type);
        // quoteStep2.getDocumentNumberElement()
        //     .should('have.value', beneficiary.document_number);
        // quoteStep2.getDocumentIssuedDateElement()
        //     .should('have.value', beneficiary.document_gived_date.DMY);
        // quoteStep2.getOrSetDocumentIssuedByElement(holder.document_gived_by_quote)
        //     .should('be.equal', holder.document_gived_by_quote);
        // quoteStep2.getOrSetAddressElement(beneficiary.address)
        //     .should('have.value', beneficiary.address);
        // quoteStep2.getOrSetEmailElement(beneficiary.email)
        //     .should('have.value', beneficiary.email);
        // quoteStep2.inputPhoneNumber(beneficiary.phone);
        quoteStep2.clickNextButton();

        //STEP 3
        quoteStep3.pageIsDisplayed().should('be.true');
        quoteStep3.chooseFranchiseOption();
        quoteStep3.chooseFranchiseType();
        quoteStep3.inputValueForDamageFranchise();
        quoteStep3.inputValueForLossFranchise();
        quoteStep3.inputAdditionalInformation();
        quoteStep3.clickNextButton();

        // STEP 4
        quoteStep4.pageIsDisplayed().should('be.true').then(() => {
            cy.intercept(new RegExp(`channel-details\\?where\\[sales_channel_id_1c\\]\\[operator\\]==&where\\[sales_channel_id_1c\\]\\[value\\]=${id_1c}`))
                .as('channelDetails')
            quoteStep4.clickRandomSalesChannel(randomElementText);
        });

        cy.wait('@channelDetails').then((interception) => {
            const channelDetails = interception.response.body
                .map((el) => ({ name: el.name, id_1c: el.id_1c }));
            const channelDetailsNames = channelDetails.map(channel => channel.name);
            randomElementText = Randomizer.getRandomElementByText(channelDetailsNames);
            quoteStep4.clickRandomChannelDetail(randomElementText);
        });


        quoteStep4.chooseAgent();
        quoteStep4.inputAgentCommission();
        quoteStep4.clickContractType();
        quoteStep4.getChosenContractType().then((type) => {
            if (type === 'Допсоглашение') {
                quoteStep4.inputContractNumber();
                quoteStep4.inputContractQuoteNumber();
            }
        });
        quoteStep4.chooseUnderwriter();
        quoteStep4.clickReinsuranceRequired().then((text)=>{
            if (text === "Требуется перестрахование") {
                quoteStep4.clickReinsuranceType();
            }

        });
        quoteStep4.inputInsurancePeriod();
        quoteStep4.inputInsuranceAmount();
        quoteStep4.inputTariff();


        // quoteStep4.pageIsDisplayed().should('be.true').then(() => {
        //     cy.intercept(
        //         `channel-details?where[sales_channel_id_1c][operator]==&where[sales_channel_id_1c][value]=${id_1c}`).as('channelDetails').then(() => {
        //
        //     })
        //
        //     quoteStep4.clickRandomElement(randomElementText).then(() => {
        //         cy.wait('@channelDetails').then((interception) => {
        //             console.log(interception.response.body)
        //             return interception.response.body;
        //         })
        //     })
        //
        //     // cy.wait('@channelDetails').then((interception) => {
        //     //     console.log(interception.response.body)
        //     //     return interception.response.body;
        //     // })
        // })


        // quoteStep4.clickContractTypeMain().then(() => {
        //     cy.intercept(
        //         `channel-details?where[sales_channel_id_1c][operator]==&where[sales_channel_id_1c][value]=${id_1c}`).as('channelDetails');
        //
        //      quoteStep4.clickRandomElement(randomElementText);
        //
        //      cy.wait('@channelDetails').then((interception) => {
        //          console.log(interception.response.body)
        //         return interception.response.body;
        //     })
        // })

        // quoteStep4.clickRandomElement()



        // quoteStep4.clickRandomSalesChannels(salesChannelsNames).then((selectedChannelName) => {
        //     //pop without index
        //     selectedChannel = salesChannels.find((channel) => channel.name === selectedChannelName[0]);
        //     id_1c = selectedChannel.id_1c;
        //     DataUtils.getFromRequest('channel-details*', 'channelDetails');
        //
        // });




        // DataUtils.getChannelDetailsFromRequest().then((responseBody) => {
        //     console.log("fff",id_1c)
        //     console.log(responseBody);
        // });

        // quoteStep4.clickRandomChannelDetails(channelDetailsNames);

        // quoteStep4.clickRandomInsuranseType(insuranseTypes);
        // quoteStep4.clickRandomInsuredProduct(insuredProducts);
        // quoteStep4.clickAlertIfExists();
        // quoteStep4.clickRandomRisks(risks, JSONLoader.testData.QuoteRisksCount);
        //
        //
        // quoteStep4.clickRandomUnderwriter();

        // quoteStep4.chooseRandomAgent();

        // quoteStep4.chooseSalesChannel();
        // quoteStep4.chooseInsuredProducts();




        // quoteStep4.clickNextButton();
    });
};
