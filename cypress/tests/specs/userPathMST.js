const mainPage = require('../pageObjects/mainPage');
const MSTStep1 = require('../pageObjects/MST/MSTStep1');
const MSTStep2 = require('../pageObjects/MST/MSTStep2');
const MSTStep3 = require('../pageObjects/MST/MSTStep3');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.userPathMST = () => {
  it('MST user path:', { scrollBehavior: false }, () => {
    let endDate;
    mainPage.clickMSTButton();

    const countries = DataUtils.getCountriesFromRequest(); // option number one
    MSTStep1.pageIsDisplayed().should('be.true');
    MSTStep1.clickAgent();
    MSTStep1.clickFirstAgent();
    MSTStep1.clickRandomDuration();
    // const countries = MSTStep1.getAllCountries(); // option number two
    MSTStep1.clickThreeRandomCountries(countries);
    MSTStep1.getChosenDuration().then((duration) => {
      switch (duration) {
        case 'Одноразовая': {
          MSTStep1.clickRandomPurposeWithoutEducation();
          MSTStep1.inputRandomDates();
          break;
        }
        case 'на 180 дней': {
          MSTStep1.clickRandomPurpose();
          MSTStep1.inputRandomBeginDate();
          MSTStep1.clickRandomNumberOfDays();
          MSTStep1.getEndDateTitle().then((title) => {
            endDate = title;
            MSTStep1.calculate180DaysEndDate().should('be.equal', endDate);
          });
          break;
        }
        case 'на год': {
          MSTStep1.clickRandomPurpose();
          MSTStep1.inputRandomBeginDate();
          MSTStep1.clickRandomNumberOfDays();
          MSTStep1.getEndDateTitle().then((title) => {
            endDate = title;
            MSTStep1.calculateYearEndDate().should('be.equal', endDate);
          });
          break;
        }
        default:
          break;
      }
    });
    MSTStep1.clickRandomSum();
    MSTStep1.getChosenSum()
      .then((chosenSum) => MSTStep1.getShownSum().should('be.equal', chosenSum));
    MSTStep1.clickRandomAdditionalCheckboxes();
    MSTStep1.inputDOB(JSONLoader.testData.insuredClientDateOfBirth);
    MSTStep1.clickCalculate();
    MSTStep1.totalSumIsVisible();
    MSTStep1.clickContinue();

    MSTStep2.pageIsDisplayed().should('be.true');
    MSTStep2.juridicalCheckboxOff().should('be.true');
    MSTStep2.residencyCheckboxOn().should('be.true');
    MSTStep2.inputIIN(JSONLoader.testData.clientIIN);
    MSTStep2.clickSearchClientButton();
    MSTStep2.getLastNameElement().should('have.value', JSONLoader.testData.clientLastName);
    MSTStep2.insuredCheckboxOn().should('be.true');
    MSTStep2.insuredCheckboxTurnOff();
    MSTStep2.insuredCheckboxOff().should('be.true');
    MSTStep2.getLastNameEngElement()
      .should('have.value', JSONLoader.testData.clientLastNameEng);
    MSTStep2.getFirstNameElement().should('have.value', JSONLoader.testData.clientFirstName);
    MSTStep2.getFirstNameEngElement()
      .should('have.value', JSONLoader.testData.clientFirstNameEng);
    MSTStep2.getOrSetMiddleNameElement(JSONLoader.testData.clientMiddleName)
      .should('have.value', JSONLoader.testData.clientMiddleName);
    MSTStep2.getDateOfBirthElement()
      .should('have.value', JSONLoader.testData.clientDateOfBirth);
    MSTStep2.getResidencyCountryText().should('be.equal', JSONLoader.testData.clientCountry);
    MSTStep2.getRegionText().should('be.equal', JSONLoader.testData.clientRegion);
    MSTStep2.getDocumentTypeText()
      .should('be.equal', JSONLoader.testData.clientDocumentType);
    MSTStep2.getDocumentNumberElement()
      .should('have.value', JSONLoader.testData.clientDocumentNumber);
    MSTStep2.getDocumentIssuedDateElement()
      .should('have.value', JSONLoader.testData.clientDocumentIssueDate);
    MSTStep2.getOrSetDocumentIssuedByElement(JSONLoader.testData.clientDocumentIssueBy)
      .should('have.value', JSONLoader.testData.clientDocumentIssueBy);
    MSTStep2.getSexText().should('be.equal', JSONLoader.testData.clientSex);
    MSTStep2.getOrSetAddressElement(JSONLoader.testData.clientAddress)
      .should('have.value', JSONLoader.testData.clientAddress);
    MSTStep2.getOrSetEmailElement(JSONLoader.testData.clientEmail)
      .should('have.value', JSONLoader.testData.clientEmail);
    MSTStep2.inputPhoneNumber(JSONLoader.testData.clientPhoneForKASKO);
    MSTStep2.PDLCheckboxOff().should('be.true');
    MSTStep2.clickSave();

    MSTStep3.pageIsDisplayed().should('be.true');
    MSTStep3.residencyCheckboxOn().should('be.true');
    MSTStep3.inputIIN(JSONLoader.testData.insuredClientIIN);
    MSTStep3.clickSearchClientButton();
    MSTStep3.getLastNameElement()
      .should('have.value', JSONLoader.testData.insuredClientLastName);
    MSTStep3.getLastNameEngElement()
      .should('have.value', JSONLoader.testData.insuredClientLastNameEng);
    MSTStep3.getFirstNameElement()
      .should('have.value', JSONLoader.testData.insuredClientFirstName);
    MSTStep3.getFirstNameEngElement()
      .should('have.value', JSONLoader.testData.insuredClientFirstNameEng);
    MSTStep3.getOrSetMiddleNameElement(JSONLoader.testData.insuredClientMiddleName)
      .should('have.value', JSONLoader.testData.insuredClientMiddleName);
    MSTStep3.getDateOfBirthElement()
      .should('have.value', JSONLoader.testData.insuredClientDateOfBirth);
    MSTStep3.getDocumentTypeText()
      .should('be.equal', JSONLoader.testData.insuredClientDocumentType);
    MSTStep3.getDocumentNumberElement()
      .should('have.value', JSONLoader.testData.insuredClientDocumentNumber);
    MSTStep3.getDocumentIssuedDateElement()
      .should('have.value', JSONLoader.testData.insuredClientDocumentIssueDate);
    MSTStep3.getOrSetDocumentIssuedByElement(
      JSONLoader.testData.insuredClientDocumentIssueBy,
    ).should('have.value', JSONLoader.testData.insuredClientDocumentIssueBy);
    MSTStep3.getSexText().should('be.equal', JSONLoader.testData.insuredClientSex);
    MSTStep3.getOrSetAddressElement(JSONLoader.testData.insuredClientAddress)
      .should('have.value', JSONLoader.testData.insuredClientAddress);
    MSTStep3.PDLCheckboxOff().should('be.true');
    MSTStep3.clickSave();
    MSTStep3.clickCalculate();
    const insuredClientFullName = `${JSONLoader.testData.insuredClientFirstName} ${
      JSONLoader.testData.insuredClientLastName}`;
    MSTStep3.findElementTextByTitle('ФИО').should('be.equal', insuredClientFullName);
    MSTStep3.findElementTextByTitle('ИИН')
      .should('be.equal', JSONLoader.testData.insuredClientIIN);
    MSTStep3.getSumToPay().then((sum) => cy.setLocalStorage('sumToPay', sum));
    MSTStep3.clickSetPolicy();
    MSTStep3.clickSetPolicyAgain();
    MSTStep3.getPolicyNumberText()
      .should('contain', JSONLoader.testData.MSTPolicyCodeNumber);
    MSTStep3.getPaymentCode().then((code) => cy.setLocalStorage('paymentCode', code));
  });
};
