const mainPage = require('../pageObjects/mainPage');
const quoteStep1 = require('../pageObjects/quote/quoteStep1')
const quoteStep2 = require('../pageObjects/quote/quoteStep2')
const quoteStep3 = require('../pageObjects/quote/quoteStep3')
const quoteStep4 = require('../pageObjects/quote/quoteStep4')
const quoteStep5 = require('../pageObjects/quote/quoteStep5')
const NodeEvents = require('../../support/nodeEvents');


exports.underwriterPathQuote = (holder, beneficiary) => {
    it('Quote underwriter path:', {scrollBehavior: false}, () => {
        NodeEvents.resetClient(holder)
            .then(async (response) => cy.wrap(response.status).should('be.equal', 200));
        NodeEvents.resetClient(beneficiary)
            .then(async (response) => cy.wrap(response.status).should('be.equal', 200));

        mainPage.clickQuoteButton();
        quoteStep1.clickEditQuoteButton();
        quoteStep5.clickQuotePage1Button();

        //check values from page1
        quoteStep1.pageIsDisplayed().should('be.true');
        quoteStep1.checkValueFromIINTextbox().then((value)=> {
            expect(value).to.equal(holder.iin);
        })
        quoteStep1.checkValueFromLastNameTextbox().then((value) => {
            expect(value).to.equal(holder.last_name);
        })
        quoteStep1.checkValueFromFirstNameTextbox().then((value) => {
            expect(value).to.equal(holder.first_name);
        })
        quoteStep1.checkValueFromMiddleNameTextbox().then((value) => {
            expect(value).to.equal(holder.middle_name);
        })
        quoteStep1.checkValueFromDateOfBirthTextbox().then((value) => {
            expect(value).to.equal(holder.born.DMY);
        })
        quoteStep1.checkValueFromSexRadiobutton().then((value) => {
            expect(value).to.equal(holder.sex);
        })
        // quoteStep1.checkValueFromDocumentTypeDropdownButton().then((value) => {
        //     expect(value).to.equal(holder.document_type);
        // })
        quoteStep1.checkValueFromDocumentNumber().then((value) => {
            expect(value).to.equal(holder.document_number);
        })
        quoteStep1.checkValueFromDocumentIssuedDate().then((value) => {
            expect(value).to.equal(holder.document_gived_date.DMY);
        })
        quoteStep1.checkValueFromDocumentIssuedByDropdownButton().then((value) => {
            expect(value).to.equal(holder.document_gived_by_quote);
        })
        quoteStep1.checkValueFromAddressTextbox().then((value) => {
            expect(value).to.equal(holder.address);
        })
        quoteStep1.checkValueFromEmailTextbox().then((value) => {
            expect(value).to.equal(holder.email);
        })
        quoteStep1.checkValueFromPhoneNumberTextbox().then((value) => {
            const cleanedNumber = value
                .replace(/\D/g, '');
            expect(cleanedNumber).to.equal(holder.phone);
        })
        quoteStep1.clickNextButton();

        //STEP 2
        quoteStep2.pageIsDisplayed().should('be.true');
        quoteStep2.checkValueFromIINTextbox().then((value)=> {
            expect(value).to.equal(beneficiary.iin);
        })
        quoteStep2.checkValueFromLastNameTextbox().then((value) => {
            expect(value).to.equal(beneficiary.last_name);
        })
        quoteStep2.checkValueFromFirstNameTextbox().then((value) => {
            expect(value).to.equal(beneficiary.first_name);
        })
        quoteStep2.checkValueFromMiddleNameTextbox().then((value) => {
            expect(value).to.equal(beneficiary.middle_name);
        })
        quoteStep2.checkValueFromDateOfBirthTextbox().then((value) => {
            expect(value).to.equal(beneficiary.born.DMY);
        })
        quoteStep2.checkValueFromSexRadiobutton().then((value) => {
            expect(value).to.equal(beneficiary.sex);
        })
        // quoteStep2.checkValueFromDocumentTypeDropdownButton().then((value) => {
        //     expect(value).to.equal(beneficiary.document_type);
        // })
        quoteStep2.checkValueFromDocumentNumber().then((value) => {
            expect(value).to.equal(beneficiary.document_number);
        })
        quoteStep2.checkValueFromDocumentIssuedDate().then((value) => {
            expect(value).to.equal(beneficiary.document_gived_date.DMY);
        })
        quoteStep2.checkValueFromDocumentIssuedByDropdownButton().then((value) => {
            expect(value).to.equal(beneficiary.document_gived_by_quote);
        })
        quoteStep2.checkValueFromAddressTextbox().then((value) => {
            expect(value).to.equal(beneficiary.address);
        })
        quoteStep2.checkValueFromEmailTextbox().then((value) => {
            expect(value).to.equal(beneficiary.email);
        })
        quoteStep2.checkValueFromPhoneNumberTextbox().then((value) => {
            const cleanedNumber = value
                .replace(/\D/g, '');
            expect(cleanedNumber).to.equal(holder.phone);
        })
        quoteStep2.clickNextButton();

        //STEP 3
        quoteStep3.pageIsDisplayed().should('be.true');
        cy.restoreLocalStorage();
        quoteStep3.checkValueFranchiseForDamage().then((value) => {
            cy.getLocalStorage('ValueForDamageFranchise').then((ValueForDamageFranchise) => {
                expect(value).to.equal(ValueForDamageFranchise);
            })
        })
        quoteStep3.checkValueFranchiseForLoss().then((value) => {
            cy.getLocalStorage('ValueForFranchiseLoss').then((ValueForFranchiseLoss) => {
                expect(value).to.equal(ValueForFranchiseLoss);
            })
        })
        quoteStep3.changeFranchiseForDamage();
        quoteStep3.changeFranchiseForLoss();
        quoteStep3.clickNextButton();

// STEP 4
        quoteStep4.pageIsDisplayed().should('be.true');
        quoteStep4.checkBusinessExpenses().then((value) => {
            cy.setLocalStorage('businessExpenses', value);
            cy.saveLocalStorage();
        })

        quoteStep4.checkChosenAgent().then((value) => {
            cy.getLocalStorage('agent').then((agent) => {
                expect(value).to.equal(agent);
            })
        })
        quoteStep4.checkSalesChannel().then((value) => {
            cy.getLocalStorage('salesChannel').then((salesChannel) => {
                expect(value).to.equal(salesChannel);
            })
        })
        quoteStep4.checkChannelDetails().then((value) => {
            cy.getLocalStorage('channelDetails').then((channelDetails) => {
                if (channelDetails === '0') {
                    cy.log("no channel details");
                } else {
                    expect(value).to.equal(channelDetails);
                }
            })
        })
        quoteStep4.checkInsuranceType().then((value) => {
            cy.getLocalStorage('insuranceType').then((insuranceType) => {
                expect(value).to.equal(insuranceType);
            })
        })
        quoteStep4.checkInsuranceProduct().then((value) => {
            cy.getLocalStorage('insuranceProduct').then((insuranceProduct) => {
                expect(value).to.equal(insuranceProduct);
            })
        })
        quoteStep4.checkInsurancePeriod().then((value) => {
            cy.getLocalStorage('insurancePeriod').then((insurancePeriod) => {
                expect(value).to.equal(insurancePeriod);
            })
        })
        quoteStep4.checkInsuranceAmount().then((value) => {
            cy.getLocalStorage('insuranceAmount').then((insuranceAmount) => {
                expect(value).to.equal(insuranceAmount);
            })
        })
        quoteStep4.checkTariff().then((value) => {
            cy.getLocalStorage('tariff').then((tariff) => {
                expect(value).to.equal(tariff);
            })
        })
        quoteStep4.changeRisks();
        quoteStep4.inputBusinessExpenses();
        quoteStep4.changeTariffAmount();
        quoteStep4.clickNextButton();

//step 5
        quoteStep5.pageIsDisplayed().should('be.true');
        quoteStep5.getVersionNumberAfterRevision().then((text) => {
            expect(text).to.equal('Версия №1');
        })
        quoteStep5.checkObjectCount().then((value) => {
            cy.getLocalStorage('objectCount').then((tariff) => {
                expect(value).to.equal(tariff);
            })
        })
        quoteStep5.getUploadedFile();
        quoteStep5.inputUnderwriterComments();
        quoteStep5.clickRevisionButton();
        quoteStep5.clickLogoutButton();
    })
}
