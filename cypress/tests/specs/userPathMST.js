const mainPage = require('../pageObjects/mainPage');
const MSTStep1 = require('../pageObjects/MST/MSTStep1');
const MSTStep2 = require('../pageObjects/MST/MSTStep2');
const MSTStep3 = require('../pageObjects/MST/MSTStep3');
const DataUtils = require('../../main/utils/data/dataUtils');
const TimeUtils = require('../../main/utils/time/timeUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const NodeEvents = require('../../support/nodeEvents');

exports.userPathMST = (holder, insured = { parseAllCountriesFromPage: false }) => {
  it('MST user path:', { scrollBehavior: false }, () => {
    NodeEvents.resetClient(holder)
      .then(async (response) => cy.wrap(response.status).should('be.equal', 200));
    NodeEvents.resetClient(insured)
      .then(async (response) => cy.wrap(response.status).should('be.equal', 200));

    mainPage.clickMSTButton();

    let countries;

    DataUtils.getFromRequest('countries*', 'countries').then((responseBody) => {
      const excludedCountriesArr = JSONLoader.testData.MSTExcludedCountries;
      countries = responseBody
        .filter((country) => !excludedCountriesArr.includes(country.title))
        .map((country) => country.title);
    });

    MSTStep1.pageIsDisplayed().should('be.true');
    // MSTStep1.clickAgent();
    // MSTStep1.clickFirstAgent();

    MSTStep1.clickRandomDuration()
      .then(() => MSTStep1.clickNRandomCountries(countries, JSONLoader.testData.MSTCountriesCount));

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
          MSTStep1.getBeginDateTitle().then((dateBegin) => {
            const { finishDate } = TimeUtils.getDatesInterval(
              ...JSONLoader.testData.timeIncrement180Days,
              { dateBegin },
            );
            MSTStep1.getEndDateTitle().should('be.equal', finishDate);
          });
          break;
        }

        case 'на год': {
          MSTStep1.clickRandomPurpose();
          MSTStep1.inputRandomBeginDate();
          MSTStep1.clickRandomNumberOfDays();
          MSTStep1.getBeginDateTitle().then((dateBegin) => {
            const { finishDate } = TimeUtils.getDatesInterval(
              ...JSONLoader.testData.timeIncrementOneYear,
              { dateBegin },
            );
            MSTStep1.getEndDateTitle().should('be.equal', finishDate);
          });
          break;
        }

        // no default
      }
    });

    MSTStep1.clickRandomSum();
    MSTStep1.getChosenSum()
      .then((chosenSum) => MSTStep1.getShownSum()
        .should('be.equal', chosenSum));
    MSTStep1.clickRandomAdditionalCheckboxes();
    MSTStep1.clickFranchiseAlertIfExists();
    MSTStep1.inputDateOfBirth(insured.born.DMY);
    MSTStep1.clickCalculate();
    MSTStep1.totalSumIsVisible();
    MSTStep1.clickContinue();

    MSTStep2.pageIsDisplayed().should('be.true');
    MSTStep2.juridicalCheckboxOff().should('be.true');
    MSTStep2.residencyCheckboxOn().should('be.true');
    MSTStep2.inputIIN(holder.iin);
    MSTStep2.clickSearchClientButton();
    MSTStep2.getLastNameElement()
      .should('have.value', holder.last_name);
    MSTStep2.insuredCheckboxOn().should('be.true');
    MSTStep2.insuredCheckboxTurnOff();
    MSTStep2.insuredCheckboxOff().should('be.true');
    MSTStep2.getLastNameEngElement()
      .should('have.value', holder.last_name_eng);
    MSTStep2.getFirstNameElement()
      .should('have.value', holder.first_name);
    MSTStep2.getFirstNameEngElement()
      .should('have.value', holder.first_name_eng);
    MSTStep2.getOrSetMiddleNameElement(holder.middle_name)
      .should('have.value', holder.middle_name);
    MSTStep2.getDateOfBirthElement()
      .should('have.value', holder.born.DMY);
    MSTStep2.getResidencyCountryText()
      .should('be.equal', holder.country);
    MSTStep2.getRegionText()
      .should('be.equal', holder.region);
    MSTStep2.getDocumentTypeText()
      .should('be.equal', holder.document_type);
    MSTStep2.getDocumentNumberElement()
      .should('have.value', holder.document_number);
    MSTStep2.getDocumentIssuedDateElement()
      .should('have.value', holder.document_gived_date.DMY);
    MSTStep2.getOrSetDocumentIssuedByElement(holder.document_gived_by)
      .should('be.equal', holder.document_gived_by);
    MSTStep2.getSexText()
      .should('be.equal', holder.sex);
    MSTStep2.getOrSetAddressElement(holder.address)
      .should('have.value', holder.address);
    MSTStep2.getOrSetEmailElement(holder.email)
      .should('have.value', holder.email);
    MSTStep2.inputPhoneNumber(holder.phone);
    MSTStep2.PDLCheckboxOff().should('be.true');
    MSTStep2.clickSave();

    MSTStep3.pageIsDisplayed().should('be.true');
    MSTStep3.residencyCheckboxOn().should('be.true');
    MSTStep3.inputIIN(insured.iin);
    MSTStep3.clickSearchClientButton();
    MSTStep3.getLastNameElement()
      .should('have.value', insured.last_name);
    MSTStep3.getLastNameEngElement()
      .should('have.value', insured.last_name_eng);
    MSTStep3.getFirstNameElement()
      .should('have.value', insured.first_name);
    MSTStep3.getFirstNameEngElement()
      .should('have.value', insured.first_name_eng);
    MSTStep3.getOrSetMiddleNameElement(insured.middle_name)
      .should('have.value', insured.middle_name);
    MSTStep3.getDateOfBirthElement()
      .should('have.value', insured.born.DMY);
    MSTStep3.getDocumentTypeText()
      .should('be.equal', insured.document_type);
    MSTStep3.getDocumentNumberElement()
      .should('have.value', insured.document_number);
    MSTStep3.getDocumentIssuedDateElement()
      .should('have.value', insured.document_gived_date.DMY);
    MSTStep3.getOrSetDocumentIssuedByElement(insured.document_gived_by)
      .should('be.equal', insured.document_gived_by);
    MSTStep3.getSexText()
      .should('be.equal', insured.sex);
    MSTStep3.getOrSetAddressElement(insured.address)
      .should('have.value', insured.address);
    MSTStep3.PDLCheckboxOff().should('be.true');
    MSTStep3.clickSave();
    MSTStep3.clickCalculate();
    MSTStep3.findElementTextByTitle('ФИО')
      .should('be.equal', `${insured.first_name} ${insured.last_name}`);
    MSTStep3.findElementTextByTitle('ИИН')
      .should('be.equal', insured.iin);
    MSTStep3.getSumToPay()
      .then((sum) => cy.setLocalStorage('sumToPay', sum));
    MSTStep3.clickSetPolicy();
    MSTStep3.clickSetPolicyAgain();
    MSTStep3.getPolicyNumberText()
      .should('contain', JSONLoader.testData.MSTPolicyCodeNumber);
    MSTStep3.getPaymentCode()
      .then((code) => cy.setLocalStorage('paymentCode', code));
    cy.setLocalStorage('installmentPayment', false);
  });
};
