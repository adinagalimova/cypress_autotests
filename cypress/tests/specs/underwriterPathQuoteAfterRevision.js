const mainPage = require('../pageObjects/mainPage');
const quoteStep1 = require("../pageObjects/quote/quoteStep1");
const quoteStep5 = require("../pageObjects/quote/quoteStep5");

exports.underwriterPathQuoteAfterRevision =  () => {
    it('Quote underwrite path after revision:', { scrollBehavior: false }, () => {
        mainPage.clickQuoteButton();
        quoteStep1.clickEditQuoteButton();
        quoteStep5.getVersionNumberAfterRevision().then((text) => {
            expect(text).to.equal('Версия №2');
        })
        quoteStep5.clickAcceptButton();



    })
}
