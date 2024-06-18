const mainPage = require('../pageObjects/mainPage');
const MSTStep1 = require('../pageObjects/MST/MSTStep1');
const MSTStep2 = require('../pageObjects/MST/MSTStep2');
const MSTStep3 = require('../pageObjects/MST/MSTStep3');
const DataUtils = require('../../main/utils/data/dataUtils');
const TimeUtils = require('../../main/utils/time/timeUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Randomizer = require('../../main/utils/random/randomizer');

const clients = DataUtils.filterClients(JSONLoader.testClients, { isUnderSixtyYearsOld: true });
const randomInsuredIndex = Randomizer.getRandomInteger(clients.length - 1);
let randomHolderIndex;
do {
  randomHolderIndex = Randomizer.getRandomInteger(clients.length - 1);
} while (randomHolderIndex === randomInsuredIndex);

exports.userPathMST = (options = { parseAllCountriesFromPage: false }) => {
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
    MSTStep1.inputDateOfBirth(TimeUtils.reformatDateFromYMDToDMY(clients[randomInsuredIndex].born));
    MSTStep1.clickCalculate();
    MSTStep1.totalSumIsVisible();
    MSTStep1.clickContinue();

    MSTStep2.pageIsDisplayed().should('be.true');
    MSTStep2.juridicalCheckboxOff().should('be.true');
    MSTStep2.residencyCheckboxOn().should('be.true');
    MSTStep2.inputIIN(clients[randomHolderIndex].iin.toString());
    MSTStep2.clickSearchClientButton();
    MSTStep2.getLastNameElement()
      .should('have.value', clients[randomHolderIndex].last_name);
    MSTStep2.insuredCheckboxOn().should('be.true');
    MSTStep2.insuredCheckboxTurnOff();
    MSTStep2.insuredCheckboxOff().should('be.true');
    MSTStep2.getLastNameEngElement()
      .should('have.value', clients[randomHolderIndex].last_name_eng);
    MSTStep2.getFirstNameElement()
      .should('have.value', clients[randomHolderIndex].first_name);
    MSTStep2.getFirstNameEngElement()
      .should('have.value', clients[randomHolderIndex].first_name_eng);
    MSTStep2.getOrSetMiddleNameElement(clients[randomHolderIndex].middle_name)
      .should('have.value', clients[randomHolderIndex].middle_name);
    MSTStep2.getDateOfBirthElement()
      .should('have.value', TimeUtils.reformatDateFromYMDToDMY(clients[randomHolderIndex].born));
    MSTStep2.getResidencyCountryText()
      .should('be.equal', JSONLoader.testData.clientCountry);
    MSTStep2.getRegionText()
      .should('be.equal', JSONLoader.testData.clientRegion);
    MSTStep2.getDocumentTypeText()
      .should('be.equal', JSONLoader.dictDocumentType[clients[randomHolderIndex].document_type_id.toString()]);
    MSTStep2.getDocumentNumberElement()
      .should('have.value', clients[randomHolderIndex].document_number);
    MSTStep2.getDocumentIssuedDateElement()
      .should('have.value', TimeUtils.reformatDateFromYMDToDMY(clients[randomHolderIndex].document_gived_date));
    MSTStep2.getOrSetDocumentIssuedByElement(JSONLoader.testData.clientDocumentIssueBy)
      .should('have.value', JSONLoader.testData.clientDocumentIssueBy);
    MSTStep2.getSexText()
      .should('be.equal', JSONLoader.dictSexID[clients[randomHolderIndex].sex_id]);
    MSTStep2.getOrSetAddressElement(JSONLoader.testData.clientAddress)
      .should('have.value', JSONLoader.testData.clientAddress);
    MSTStep2.getOrSetEmailElement(JSONLoader.testData.clientEmail)
      .should('have.value', JSONLoader.testData.clientEmail);
    MSTStep2.inputPhoneNumber(JSONLoader.testData.clientPhoneForKASKO);
    MSTStep2.PDLCheckboxOff().should('be.true');
    MSTStep2.clickSave();

    MSTStep3.pageIsDisplayed().should('be.true');
    MSTStep3.residencyCheckboxOn().should('be.true');
    MSTStep3.inputIIN(clients[randomInsuredIndex].iin.toString());
    MSTStep3.clickSearchClientButton();
    MSTStep3.getLastNameElement()
      .should('have.value', clients[randomInsuredIndex].last_name);
    MSTStep3.getLastNameEngElement()
      .should('have.value', clients[randomInsuredIndex].last_name_eng);
    MSTStep3.getFirstNameElement()
      .should('have.value', clients[randomInsuredIndex].first_name);
    MSTStep3.getFirstNameEngElement()
      .should('have.value', clients[randomInsuredIndex].first_name_eng);
    MSTStep3.getOrSetMiddleNameElement(clients[randomInsuredIndex].middle_name)
      .should('have.value', clients[randomInsuredIndex].middle_name);
    MSTStep3.getDateOfBirthElement()
      .should('have.value', TimeUtils.reformatDateFromYMDToDMY(clients[randomInsuredIndex].born));
    MSTStep3.getDocumentTypeText()
      .should('be.equal', JSONLoader.dictDocumentType[clients[randomInsuredIndex].document_type_id.toString()]);
    MSTStep3.getDocumentNumberElement()
      .should('have.value', clients[randomInsuredIndex].document_number);
    MSTStep3.getDocumentIssuedDateElement()
      .should('have.value', TimeUtils.reformatDateFromYMDToDMY(clients[randomInsuredIndex].document_gived_date));
    MSTStep3.getOrSetDocumentIssuedByElement(JSONLoader.testData.insuredClientDocumentIssueBy)
      .should('have.value', JSONLoader.testData.insuredClientDocumentIssueBy);
    MSTStep3.getSexText()
      .should('be.equal', JSONLoader.dictSexID[clients[randomInsuredIndex].sex_id]);
    MSTStep3.getOrSetAddressElement(JSONLoader.testData.insuredClientAddress)
      .should('have.value', JSONLoader.testData.insuredClientAddress);
    MSTStep3.PDLCheckboxOff().should('be.true');
    MSTStep3.clickSave();
    MSTStep3.clickCalculate();
    MSTStep3.findElementTextByTitle('ФИО')
      .should('be.equal', `${clients[randomInsuredIndex].first_name} ${clients[randomInsuredIndex].last_name}`);
    MSTStep3.findElementTextByTitle('ИИН')
      .should('be.equal', clients[randomInsuredIndex].iin.toString());
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
