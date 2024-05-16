const moment = require('moment');
const mainPage = require('../pageObjects/mainPage');
const MSTPagePartOne = require('../pageObjects/MSTPagePartOne');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.userPathMST = () => {
  it('MST user path:', { scrollBehavior: false }, () => {
    let beginDate;
    let endDate;
    mainPage.clickMSTButton();

    const countries = MSTPagePartOne.getCountriesFromRequest(); // option number one
    MSTPagePartOne.pageIsDisplayed().should('be.true');
    MSTPagePartOne.clickAgent();
    MSTPagePartOne.clickFirstAgent();
    MSTPagePartOne.clickRandomDuration();
    const duration = MSTPagePartOne.getChosenDuration();
    // const countries = MSTPagePartOne.getAllCountries(); // option number two
    MSTPagePartOne.clickThreeRandomCountries(countries);
    duration.then((value) => {
      if (value === 'Одноразовая') {
        MSTPagePartOne.clickPurposeDropdown();
        MSTPagePartOne.clickRandomPurposeWithoutEducation();
        MSTPagePartOne.inputRandomDates();
      } else {
        MSTPagePartOne.clickRandomPurpose();
        MSTPagePartOne.inputRandomBeginDate();
        MSTPagePartOne.clickRandomNumberOfDays();
      }
    });
    MSTPagePartOne.clickRandomSum();
    MSTPagePartOne.clickRandomAdditionalCheckboxes();
    MSTPagePartOne.inputDOB(JSONLoader.testData.clientDateOfBirth);
  });
};
