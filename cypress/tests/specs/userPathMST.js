const moment = require('moment');
const { ca } = require('wait-on/exampleConfig');
const mainPage = require('../pageObjects/mainPage');
const MSTPagePartOne = require('../pageObjects/MSTPagePartOne');
const MSTPagePartTwo = require('../pageObjects/MSTPagePartTwo');
const MSTPagePartThree = require('../pageObjects/MSTPagePartThree');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const OGPOPage = require('../pageObjects/OGPOPage');

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
    MSTPagePartOne.inputDOB(JSONLoader.testData.insuredClientDateOfBirth);
    MSTPagePartOne.clickCalculate();
    MSTPagePartOne.totalSumIsVisible();
    MSTPagePartOne.clickContinue();

    MSTPagePartTwo.pageIsDisplayed().should('be.true');
    MSTPagePartTwo.juridicalCheckboxOff().should('be.true');
    MSTPagePartTwo.residencyCheckboxOn().should('be.true');
    MSTPagePartTwo.inputIIN(JSONLoader.testData.clientIIN);
    MSTPagePartTwo.clickSearchClientButton();
    MSTPagePartTwo.getLastNameElement().should('have.value', JSONLoader.testData.clientLastName);
    MSTPagePartTwo.insuredCheckboxOn().should('be.true');
    MSTPagePartTwo.insuredCheckboxTurnOff();
    MSTPagePartTwo.insuredCheckboxOff().should('be.true');
    MSTPagePartTwo.getLastNameEngElement().should('have.value', JSONLoader.testData.clientLastNameEng);
    MSTPagePartTwo.getFirstNameElement().should('have.value', JSONLoader.testData.clientFirstName);
    MSTPagePartTwo.getFirstNameEngElement().should('have.value', JSONLoader.testData.clientFirstNameEng);
    MSTPagePartTwo.getOrSetMiddleNameElement(JSONLoader.testData.clientMiddleName).should('have.value', JSONLoader.testData.clientMiddleName);
    MSTPagePartTwo.getDateOfBirthElement().should('have.value', JSONLoader.testData.clientDateOfBirth);
    MSTPagePartTwo.getResidencyCountryText().should('be.equal', JSONLoader.testData.clientCountry);
    MSTPagePartTwo.getRegionText().should('be.equal', JSONLoader.testData.clientRegion);
    MSTPagePartTwo.getDocumentTypeText().should('be.equal', JSONLoader.testData.clientDocumentType);
    MSTPagePartTwo.getDocumentNumberElement().should('have.value', JSONLoader.testData.clientDocumentNumber);
    MSTPagePartTwo.getDocumentIssuedDateElement().should('have.value', JSONLoader.testData.clientDocumentIssueDate);
    MSTPagePartTwo.getOrSetDocumentIssuedByElement(JSONLoader.testData.clientDocumentIssueBy).should('have.value', JSONLoader.testData.clientDocumentIssueBy);
    MSTPagePartTwo.getSexText().should('be.equal', JSONLoader.testData.clientSex);
    MSTPagePartTwo.getOrSetAddressElement(JSONLoader.testData.clientAddress).should('have.value', JSONLoader.testData.clientAddress);
    MSTPagePartTwo.getOrSetEmailElement(JSONLoader.testData.clientEmail).should('have.value', JSONLoader.testData.clientEmail);
    MSTPagePartTwo.inputPhoneNumber(JSONLoader.testData.clientPhoneForKASKO);
    MSTPagePartTwo.PDLCheckboxOff().should('be.true');
    MSTPagePartTwo.clickSave();

    MSTPagePartThree.pageIsDisplayed().should('be.true');
    MSTPagePartThree.residencyCheckboxOn().should('be.true');
    MSTPagePartThree.inputIIN(JSONLoader.testData.insuredClientIIN);
    MSTPagePartThree.clickSearchClientButton();
    MSTPagePartThree.getLastNameElement().should('have.value', JSONLoader.testData.insuredClientLastName);
    MSTPagePartThree.getLastNameEngElement().should('have.value', JSONLoader.testData.insuredClientLastNameEng);
    MSTPagePartThree.getFirstNameElement().should('have.value', JSONLoader.testData.insuredClientFirstName);
    MSTPagePartThree.getFirstNameEngElement().should('have.value', JSONLoader.testData.insuredClientFirstNameEng);
    MSTPagePartThree.getOrSetMiddleNameElement(JSONLoader.testData.insuredClientMiddleName).should('have.value', JSONLoader.testData.insuredClientMiddleName);
    MSTPagePartThree.getDateOfBirthElement().should('have.value', JSONLoader.testData.insuredClientDateOfBirth);
    MSTPagePartThree.getDocumentTypeText().should('be.equal', JSONLoader.testData.insuredClientDocumentType);
    MSTPagePartThree.getDocumentNumberElement().should('have.value', JSONLoader.testData.insuredClientDocumentNumber);
    MSTPagePartThree.getDocumentIssuedDateElement().should('have.value', JSONLoader.testData.insuredClientDocumentIssueDate);
    MSTPagePartThree.getOrSetDocumentIssuedByElement(JSONLoader.testData.insuredClientDocumentIssueBy).should('have.value', JSONLoader.testData.insuredClientDocumentIssueBy);
    MSTPagePartThree.getSexText().should('be.equal', JSONLoader.testData.insuredClientSex);
    MSTPagePartThree.getOrSetAddressElement(JSONLoader.testData.insuredClientAddress).should('have.value', JSONLoader.testData.insuredClientAddress);
    MSTPagePartThree.PDLCheckboxOff().should('be.true');
    MSTPagePartThree.clickSave();
    MSTPagePartThree.clickCalculate();
    const insuredClientFullName = `${JSONLoader.testData.insuredClientFirstName} ${
      JSONLoader.testData.insuredClientLastName}`;
    MSTPagePartThree.findElementByHeader('ФИО').should('be.equal', insuredClientFullName);
    MSTPagePartThree.findElementByHeader('ИИН').should('be.equal', JSONLoader.testData.insuredClientIIN);
  });
};
