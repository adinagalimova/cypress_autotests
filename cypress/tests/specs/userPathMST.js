const moment = require('moment');
const { ca } = require('wait-on/exampleConfig');
const mainPage = require('../pageObjects/mainPage');
const MSTPagePartOne = require('../pageObjects/MSTPagePartOne');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.userPathMST = () => {
  it('MST user path:', { scrollBehavior: false }, () => {
    let beginDate;
    let endDate;
    mainPage.clickMSTButton();

    const countries = DataUtils.getCountriesFromRequest(); // option number one
    MSTPagePartOne.pageIsDisplayed().should('be.true');
    MSTPagePartOne.clickAgent();
    MSTPagePartOne.clickFirstAgent();
    MSTPagePartOne.clickRandomDuration();
    // const countries = MSTPagePartOne.getAllCountries(); // option number two
    MSTPagePartOne.clickThreeRandomCountries(countries);
    MSTPagePartOne.getChosenDuration().then((duration) => {
      switch (duration) {
        case 'Одноразовая': {
          MSTPagePartOne.clickPurposeDropdown();
          MSTPagePartOne.clickRandomPurposeWithoutEducation();
          MSTPagePartOne.inputRandomDates();
          break;
        }
        case 'на 180 дней': {
          MSTPagePartOne.clickRandomPurpose();
          MSTPagePartOne.inputRandomBeginDate();
          MSTPagePartOne.clickRandomNumberOfDays();
          MSTPagePartOne.getBeginDateTitle().then((title) => { beginDate = title; });
          MSTPagePartOne.getEndDateTitle().then((title) => {
            endDate = title;
            MSTPagePartOne.calculate180DaysEndDate().should('be.equal', endDate);
          });
          break;
        }
        case 'на год': {
          MSTPagePartOne.clickRandomPurpose();
          MSTPagePartOne.inputRandomBeginDate();
          MSTPagePartOne.clickRandomNumberOfDays();
          MSTPagePartOne.getEndDateTitle().then((title) => {
            endDate = title;
            MSTPagePartOne.calculateYearEndDate().should('be.equal', endDate);
          });
          break;
        }
        default:
          break;
      }
    });
    MSTPagePartOne.clickRandomSum();
    MSTPagePartOne.getChosenSum().then((chosenSum) => MSTPagePartOne.getShownSum().should('be.equal', chosenSum));
    MSTPagePartOne.clickRandomAdditionalCheckboxes();
    MSTPagePartOne.inputDOB(JSONLoader.testData.clientDateOfBirth);
    MSTPagePartOne.clickCalculate();
    MSTPagePartOne.totalSumIsVisible();
    MSTPagePartOne.clickContinue();
  });
};
