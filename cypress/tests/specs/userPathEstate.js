const mainPage = require('../pageObjects/mainPage');
const estateStep1 = require('../pageObjects/estate/estateStep1');

exports.userPathEstate = () => {
    it('Estate user path:', { scrollBehavior: false }, () => {
      mainPage.clickEstateButton();
      mainPage.pageIsDisplayed();

      estateStep1.chooseAgent();
      estateStep1.chooseRandomFranchise();
      estateStep1.chooseRandomAgentPremium();
      estateStep1.chooseRandomObjectType();
      estateStep1.chooseRandomInsuredSum();
      estateStep1.chooseStartDate();
      estateStep1.usedObjectDesignSwitchIsChecked();
      estateStep1.usedObjectAwayFromBazaarIsChecked();
      estateStep1.usedObjectIsNotEmptyIsChecked();
      estateStep1.usedObjectWithNoInsuranceIsChecked();
      estateStep1.checkboxesForCommercialEstateClick();
    
      estateStep1.addObjectButtonClick();
      // estateStep1.chooseRandomInsuranceObjectType();
    })};