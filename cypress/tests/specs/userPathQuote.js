const DataUtils = require('../../main/utils/data/dataUtils');
const NodeEvents = require('../../support/nodeEvents');
const mainPage = require('../pageObjects/mainPage');
const quoteStep1 = require('../pageObjects/quote/quoteStep1')
const quoteStep2 = require('../pageObjects/quote/quoteStep2')
const quoteStep3 = require('../pageObjects/quote/quoteStep3')
const quoteStep4 = require('../pageObjects/quote/quoteStep4')

exports.userPathQuote = (holder, beneficiary) => {
    it('Quote user path:', { scrollBehavior: false }, () => {
        NodeEvents.resetClient(holder)
            .then(async (response) => cy.wrap(response.status).should('be.equal', 200));
        NodeEvents.resetClient(beneficiary)
            .then(async (response) => cy.wrap(response.status).should('be.equal', 200));

        mainPage.clickQuoteButton();

        quoteStep1.clickCreateButton();
        quoteStep1.pageIsDisplayed().should('be.true');
        // quoteStep1.chooseClientType().should('be.true');
        quoteStep1.inputDataHolderIIN(holder.iin);
        quoteStep1.clickSearchClientButton();
        quoteStep1.getLastNameElement()
            .should('have.value', holder.last_name);
        // quoteStep1.getFirstNameElement()
        //     .should('have.value', holder.first_name);
        // quoteStep1.getOrSetMiddleNameElement(holder.middle_name)
        //     .should('have.value', holder.middle_name);
        // quoteStep1.getDateOfBirthElement()
        //     .should('have.value', holder.born.DMY);
        quoteStep1.getSexText()
            .should('be.equal', holder.sex);
        quoteStep1.getDocumentTypeText()
            .should('be.equal', holder.document_type);
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
        quoteStep2.inputDataHolderIIN(beneficiary.iin);
        quoteStep2.clickSearchClientButton();
        quoteStep2.getLastNameElement()
            .should('have.value', beneficiary.last_name);
        // quoteStep2.getFirstNameElement()
        //     .should('have.value', beneficiary.first_name);
        // quoteStep2.getOrSetMiddleNameElement(beneficiary.middle_name)
        //     .should('have.value', beneficiary.middle_name);
        // quoteStep2.getDateOfBirthElement()
        //     .should('have.value', beneficiary.born.DMY);
        // quoteStep2.getSexText().should('be.equal', beneficiary.sex);
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
        // quoteStep3.inputValueForDamageFranchise();
        // quoteStep3.inputValueForLossFranchise();
        quoteStep3.inputAdditionalInformation();
        quoteStep3.clickNextButton();


        // STEP 4
        quoteStep4.pageIsDisplayed().should('be.true');

        let salesChannels;

        salesChannels = DataUtils.getSalesChannelsFromRequest();

        quoteStep4.clickRandomSalesChannels(salesChannels);

        // quoteStep4.chooseRandomAgent();
        // quoteStep4.clickContractTypeMain();
        // quoteStep4.chooseSalesChannel();
        // quoteStep4.chooseInsuredProducts();







        // quoteStep4.clickNextButton();
    });
};
