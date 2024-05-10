const moment = require('moment');
const mainPage = require('../pageObjects/mainPage');
const MSTPagePartOne = require('../pageObjects/MSTPagePartOne');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.userPathMST = () => {
  it('MST user path:', { scrollBehavior: false }, () => {
    let beginDate;
    let endDate;
    mainPage.clickMSTButton();

    const countriesFromRequest = MSTPagePartOne.getCountriesFromRequest();
    MSTPagePartOne.pageIsDisplayed().should('be.true');
    MSTPagePartOne.clickAgent();
    MSTPagePartOne.clickFirstAgent();
    MSTPagePartOne.clickRandomDuration();
    const duration = MSTPagePartOne.getChosenDuration();
    MSTPagePartOne.getAllCountries().should('have.length', countriesFromRequest.length);

    // countries.then((countryArray) => {
    //   countryArray.should('have.length', countriesFromRequest)
      // expect(countryArray).to.have.length(countriesFromRequest.length - 1)
    // })
  });
};
