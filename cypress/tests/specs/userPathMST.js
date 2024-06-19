const mainPage = require('../pageObjects/mainPage');
const MSTStep1 = require('../pageObjects/MST/MSTStep1');
const MSTStep2 = require('../pageObjects/MST/MSTStep2');
const MSTStep3 = require('../pageObjects/MST/MSTStep3');
const DataUtils = require('../../main/utils/data/dataUtils');
const TimeUtils = require('../../main/utils/time/timeUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.userPathMST = (holder, insured, options = { parseAllCountriesFromPage: false }) => {
  it('MST user path:', { scrollBehavior: false }, () => {
    mainPage.clickMSTButton();

    let countries;
    if (!options.parseAllCountriesFromPage) {
      countries = DataUtils.getCountriesFromRequest(JSONLoader.testData.MSTExcludedCountries);
    }

    MSTStep1.pageIsDisplayed().should('be.true');
    MSTStep1.clickAgent();
    MSTStep1.clickFirstAgent();
    MSTStep1.clickRandomDuration();
    if (options.parseAllCountriesFromPage) {
      countries = MSTStep1.getAllCountries();
    }

    MSTStep1.clickNRandomCountries(countries, JSONLoader.testData.MSTCountriesCount);
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
    MSTStep1.inputDateOfBirth(TimeUtils.reformatDateFromYMDToDMY(insured.born));
    MSTStep1.clickCalculate();
    MSTStep1.totalSumIsVisible();
    MSTStep1.clickContinue();

    MSTStep2.pageIsDisplayed().should('be.true');
    MSTStep2.juridicalCheckboxOff().should('be.true');
    MSTStep2.residencyCheckboxOn().should('be.true');
    MSTStep2.inputIIN(holder.iin.toString());
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
      .should('have.value', TimeUtils.reformatDateFromYMDToDMY(holder.born));
    MSTStep2.getResidencyCountryText()
      .should('be.equal', JSONLoader.testData.clientCountry);
    MSTStep2.getRegionText()
      .should('be.equal', JSONLoader.testData.clientRegion);
    MSTStep2.getDocumentTypeText()
      .should('be.equal', JSONLoader.dictDocumentType[holder.document_type_id.toString()]);
    MSTStep2.getDocumentNumberElement()
      .should('have.value', holder.document_number);
    MSTStep2.getDocumentIssuedDateElement()
      .should('have.value', TimeUtils.reformatDateFromYMDToDMY(holder.document_gived_date));
    MSTStep2.getOrSetDocumentIssuedByElement(JSONLoader.testData.clientDocumentIssueBy)
      .should('have.value', JSONLoader.testData.clientDocumentIssueBy);
    MSTStep2.getSexText()
      .should('be.equal', JSONLoader.dictSexID[holder.sex_id]);
    MSTStep2.getOrSetAddressElement(JSONLoader.testData.clientAddress)
      .should('have.value', JSONLoader.testData.clientAddress);
    MSTStep2.getOrSetEmailElement(JSONLoader.testData.clientEmail)
      .should('have.value', JSONLoader.testData.clientEmail);
    MSTStep2.inputPhoneNumber(JSONLoader.testData.clientPhoneForKASKO);
    MSTStep2.PDLCheckboxOff().should('be.true');
    MSTStep2.clickSave();

    MSTStep3.pageIsDisplayed().should('be.true');
    MSTStep3.residencyCheckboxOn().should('be.true');
    MSTStep3.inputIIN(insured.iin.toString());
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
      .should('have.value', TimeUtils.reformatDateFromYMDToDMY(insured.born));
    MSTStep3.getDocumentTypeText()
      .should('be.equal', JSONLoader.dictDocumentType[insured.document_type_id.toString()]);
    MSTStep3.getDocumentNumberElement()
      .should('have.value', insured.document_number);
    MSTStep3.getDocumentIssuedDateElement()
      .should('have.value', TimeUtils.reformatDateFromYMDToDMY(insured.document_gived_date));
    MSTStep3.getOrSetDocumentIssuedByElement(JSONLoader.testData.insuredClientDocumentIssueBy)
      .should('have.value', JSONLoader.testData.insuredClientDocumentIssueBy);
    MSTStep3.getSexText()
      .should('be.equal', JSONLoader.dictSexID[insured.sex_id]);
    MSTStep3.getOrSetAddressElement(JSONLoader.testData.insuredClientAddress)
      .should('have.value', JSONLoader.testData.insuredClientAddress);
    MSTStep3.PDLCheckboxOff().should('be.true');
    MSTStep3.clickSave();
    MSTStep3.clickCalculate();
    MSTStep3.findElementTextByTitle('ФИО')
      .should('be.equal', `${insured.first_name} ${insured.last_name}`);
    MSTStep3.findElementTextByTitle('ИИН')
      .should('be.equal', insured.iin.toString());
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
