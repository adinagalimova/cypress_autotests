const moment = require('moment');
const mainPage = require('../pageObjects/mainPage');
const MSTPagePartOne = require('../pageObjects/MSTPagePartOne');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.userPathMST = () => {
  it('MST user path:', { scrollBehavior: false }, () => {
    let beginDate;
    let endDate;
    mainPage.clickMSTButton();

    const countries = MSTPagePartOne.getCountriesFromRequest()
    MSTPagePartOne.pageIsDisplayed().should('be.true');
    MSTPagePartOne.clickAgent();
    MSTPagePartOne.clickFirstAgent();
    MSTPagePartOne.clickRandomDuration();
    const duration = MSTPagePartOne.getChosenDuration();
    // const countries = MSTPagePartOne.getAllCountries();
    MSTPagePartOne.clickThreeCountries(countries)
  });
};
