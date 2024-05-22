const mainPage = require('../pageObjects/mainPage');
const MSTPageOne = require('../pageObjects/MSTPageOne');
const MSTPageTwo = require('../pageObjects/MSTPageTwo');
const MSTPageThree = require('../pageObjects/MSTPageThree');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.userPathMST = () => {
  it('MST user path:', { scrollBehavior: false }, () => {
    let endDate;
    mainPage.clickMSTButton();

    const countries = DataUtils.getCountriesFromRequest(); // option number one
    MSTPageOne.pageIsDisplayed().should('be.true');
    MSTPageOne.clickAgent();
    MSTPageOne.clickFirstAgent();
    MSTPageOne.clickRandomDuration();
    // const countries = MSTPageOne.getAllCountries(); // option number two
    MSTPageOne.clickThreeRandomCountries(countries);
    MSTPageOne.getChosenDuration().then((duration) => {
      switch (duration) {
        case 'Одноразовая': {
          MSTPageOne.clickPurposeDropdown();
          MSTPageOne.clickRandomPurposeWithoutEducation();
          MSTPageOne.inputRandomDates();
          break;
        }
        case 'на 180 дней': {
          MSTPageOne.clickRandomPurpose();
          MSTPageOne.inputRandomBeginDate();
          MSTPageOne.clickRandomNumberOfDays();
          MSTPageOne.getEndDateTitle().then((title) => {
            endDate = title;
            MSTPageOne.calculate180DaysEndDate().should('be.equal', endDate);
          });
          break;
        }
        case 'на год': {
          MSTPageOne.clickRandomPurpose();
          MSTPageOne.inputRandomBeginDate();
          MSTPageOne.clickRandomNumberOfDays();
          MSTPageOne.getEndDateTitle().then((title) => {
            endDate = title;
            MSTPageOne.calculateYearEndDate().should('be.equal', endDate);
          });
          break;
        }
        default:
          break;
      }
    });
    MSTPageOne.clickRandomSum();
    MSTPageOne.getChosenSum()
      .then((chosenSum) => MSTPageOne.getShownSum().should('be.equal', chosenSum));
    MSTPageOne.clickRandomAdditionalCheckboxes();
    MSTPageOne.inputDOB(JSONLoader.testData.insuredClientDateOfBirth);
    MSTPageOne.clickCalculate();
    MSTPageOne.totalSumIsVisible();
    MSTPageOne.clickContinue();

    MSTPageTwo.pageIsDisplayed().should('be.true');
    MSTPageTwo.juridicalCheckboxOff().should('be.true');
    MSTPageTwo.residencyCheckboxOn().should('be.true');
    MSTPageTwo.inputIIN(JSONLoader.testData.clientIIN);
    MSTPageTwo.clickSearchClientButton();
    MSTPageTwo.getLastNameElement().should('have.value', JSONLoader.testData.clientLastName);
    MSTPageTwo.insuredCheckboxOn().should('be.true');
    MSTPageTwo.insuredCheckboxTurnOff();
    MSTPageTwo.insuredCheckboxOff().should('be.true');
    MSTPageTwo.getLastNameEngElement()
      .should('have.value', JSONLoader.testData.clientLastNameEng);
    MSTPageTwo.getFirstNameElement().should('have.value', JSONLoader.testData.clientFirstName);
    MSTPageTwo.getFirstNameEngElement()
      .should('have.value', JSONLoader.testData.clientFirstNameEng);
    MSTPageTwo.getOrSetMiddleNameElement(JSONLoader.testData.clientMiddleName)
      .should('have.value', JSONLoader.testData.clientMiddleName);
    MSTPageTwo.getDateOfBirthElement()
      .should('have.value', JSONLoader.testData.clientDateOfBirth);
    MSTPageTwo.getResidencyCountryText().should('be.equal', JSONLoader.testData.clientCountry);
    MSTPageTwo.getRegionText().should('be.equal', JSONLoader.testData.clientRegion);
    MSTPageTwo.getDocumentTypeText()
      .should('be.equal', JSONLoader.testData.clientDocumentType);
    MSTPageTwo.getDocumentNumberElement()
      .should('have.value', JSONLoader.testData.clientDocumentNumber);
    MSTPageTwo.getDocumentIssuedDateElement()
      .should('have.value', JSONLoader.testData.clientDocumentIssueDate);
    MSTPageTwo.getOrSetDocumentIssuedByElement(JSONLoader.testData.clientDocumentIssueBy)
      .should('have.value', JSONLoader.testData.clientDocumentIssueBy);
    MSTPageTwo.getSexText().should('be.equal', JSONLoader.testData.clientSex);
    MSTPageTwo.getOrSetAddressElement(JSONLoader.testData.clientAddress)
      .should('have.value', JSONLoader.testData.clientAddress);
    MSTPageTwo.getOrSetEmailElement(JSONLoader.testData.clientEmail)
      .should('have.value', JSONLoader.testData.clientEmail);
    MSTPageTwo.inputPhoneNumber(JSONLoader.testData.clientPhoneForKASKO);
    MSTPageTwo.PDLCheckboxOff().should('be.true');
    MSTPageTwo.clickSave();

    MSTPageThree.pageIsDisplayed().should('be.true');
    MSTPageThree.residencyCheckboxOn().should('be.true');
    MSTPageThree.inputIIN(JSONLoader.testData.insuredClientIIN);
    MSTPageThree.clickSearchClientButton();
    MSTPageThree.getLastNameElement()
      .should('have.value', JSONLoader.testData.insuredClientLastName);
    MSTPageThree.getLastNameEngElement()
      .should('have.value', JSONLoader.testData.insuredClientLastNameEng);
    MSTPageThree.getFirstNameElement()
      .should('have.value', JSONLoader.testData.insuredClientFirstName);
    MSTPageThree.getFirstNameEngElement()
      .should('have.value', JSONLoader.testData.insuredClientFirstNameEng);
    MSTPageThree.getOrSetMiddleNameElement(JSONLoader.testData.insuredClientMiddleName)
      .should('have.value', JSONLoader.testData.insuredClientMiddleName);
    MSTPageThree.getDateOfBirthElement()
      .should('have.value', JSONLoader.testData.insuredClientDateOfBirth);
    MSTPageThree.getDocumentTypeText()
      .should('be.equal', JSONLoader.testData.insuredClientDocumentType);
    MSTPageThree.getDocumentNumberElement()
      .should('have.value', JSONLoader.testData.insuredClientDocumentNumber);
    MSTPageThree.getDocumentIssuedDateElement()
      .should('have.value', JSONLoader.testData.insuredClientDocumentIssueDate);
    MSTPageThree.getOrSetDocumentIssuedByElement(
      JSONLoader.testData.insuredClientDocumentIssueBy,
    ).should('have.value', JSONLoader.testData.insuredClientDocumentIssueBy);
    MSTPageThree.getSexText().should('be.equal', JSONLoader.testData.insuredClientSex);
    MSTPageThree.getOrSetAddressElement(JSONLoader.testData.insuredClientAddress)
      .should('have.value', JSONLoader.testData.insuredClientAddress);
    MSTPageThree.PDLCheckboxOff().should('be.true');
    MSTPageThree.clickSave();
    MSTPageThree.clickCalculate();
    const insuredClientFullName = `${JSONLoader.testData.insuredClientFirstName} ${
      JSONLoader.testData.insuredClientLastName}`;
    MSTPageThree.findElementTextByHeader('ФИО').should('be.equal', insuredClientFullName);
    MSTPageThree.findElementTextByHeader('ИИН')
      .should('be.equal', JSONLoader.testData.insuredClientIIN);
    MSTPageThree.getSumToPay().then((sum) => cy.setLocalStorage('sumToPay', sum));
    MSTPageThree.clickSetPolicy();
    MSTPageThree.clickSetPolicyAgain();
    MSTPageThree.getPolicyNumberText()
      .should('contain', JSONLoader.testData.MSTPolicyCodeNumber);
    MSTPageThree.getPaymentCode().then((code) => cy.setLocalStorage('paymentCode', code));
  });
};
