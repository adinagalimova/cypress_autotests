const mainPage = require('../pageObjects/mainPage');
const quoteStep1 = require("../pageObjects/quote/quoteStep1");
const quoteStep5 = require("../pageObjects/quote/quoteStep5");

exports.managerPathQuoteForRevision =  () => {
    it('Quote manager path for revision:', { scrollBehavior: false }, () => {
    mainPage.clickQuoteButton();
    quoteStep1.clickEditQuoteButton();
    quoteStep5.inputManagerCommentsForRevision();
    quoteStep5.clickSubmitForReviewButton();
    quoteStep5.clickLogoutButton();
    })
}
