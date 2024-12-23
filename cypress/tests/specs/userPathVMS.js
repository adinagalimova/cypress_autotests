const mainPage = require('../pageObjects/mainPage');
const VMSStep1 = require('../pageObjects/VMS/VMSStep1');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.userPathVMS = () => {
  it('VMS user path:', { scrollBehavior: false }, () => {
    mainPage.clickVMSButton();

    VMSStep1.pageIsDisplayed().should('be.true');
    VMSStep1.uploadPassport(JSONLoader.testData.pathToTestPicture);
  });
};
