const mainPage = require('../pageObjects/mainPage');
const quoteStep1 = require("../pageObjects/quote/quoteStep1");
const quoteStep5 = require("../pageObjects/quote/quoteStep5");

exports.managerPathQuoteForRevision =  () => {
    it('Quote manager path for revision:', { scrollBehavior: false }, () => {
    mainPage.clickQuoteButton();
    quoteStep1.clickEditQuoteButton();
    // quoteStep5.clickQuotePage4Button();
    //     quoteStep4.checkBusinessExpenses().then((value) => {
    //         cy.getLocalStorage('businessExpenses').then((businessExpenses) => {
    //             console.log(businessExpenses, "fffff")
    //             expect(value).to.equal(businessExpenses);
    //         })
    //     })
    // quoteStep4.clickQuotePage5Button();
    quoteStep5.inputManagerCommentsForRevision();
    quoteStep5.clickSubmitForReviewButton();
    quoteStep5.clickLogoutButton();
    })
}
