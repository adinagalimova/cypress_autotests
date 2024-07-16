const BaseForm = require('../../../main/baseForm');
const TimeUtils = require('../../../main/utils/time/timeUtils');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const Randomizer = require('../../../main/utils/random/randomizer');
const TAG = require('../../../main/locators/baseLocatorChildren/TAG');
const Label = require('../../../main/elements/baseElementChildren/label');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');

class MSTStep1 extends BaseForm {
  #agentDropdown;

  #agentDropdownElements;

  #policyDurationElements;

  #policyDurationChosen;

  #countriesDropdownButton;

  #countriesDropdown;

  #countriesDropdownHighlighted;

  #purposeDropdown;

  #purposeElements;

  #beginDateCalendarButton;

  #calendarRightArrowButton;

  #endDateCalendarButton;

  #purposeEducation;

  #numberOfDaysElements;

  #sumDropdown;

  #sumElements;

  #additionalCheckboxLabel;

  #clientDateOfBirth;

  #chosenSum;

  #sumField;

  #calculateButton;

  #continueButton;

  #totalSum;

  constructor() {
    super(new XPATH('//span[text()="на год"]'), 'MST page part one');
    this.#agentDropdown = new Button(new XPATH('//div[contains(@class, "ant-col ant-col-18 ant-form-item-control")]'), 'agent dropdown');
    this.#agentDropdownElements = new Textbox(new XPATH('//div[@class="ant-select-item-option-content"]'), 'agent dropdown elements');
    this.#policyDurationElements = new Textbox(new XPATH('//div[@id="form_item_range"]/descendant::label'), 'policy duration elements');
    this.#policyDurationChosen = new Textbox(new XPATH('//label[contains(@class,"ant-radio-button-wrapper-checked")]'), 'policy duration chosen one');
    this.#countriesDropdownButton = new Button(new XPATH('//span[text()="Выберите страны"]/parent::div'), 'countries dropdown button');
    this.#countriesDropdown = new Button(new XPATH('//label[text()="Территория"]/parent::div/following::div/descendant::div'), 'countries dropdown');
    this.#countriesDropdownHighlighted = new Textbox(new XPATH('//div[@class="ant-select-item ant-select-item-option ant-select-item-option-active"]'), 'countries dropdown highlighted');
    this.#purposeDropdown = new Button(new XPATH('//span[text()="Выберите цель поездки"]/parent::div'), 'purpose dropdown');
    this.#purposeElements = new Textbox(new XPATH('//div[@id="form_item_purpose_id_list"]/following::div/descendant::div[@aria-selected="false"]'), 'purpose elements');
    this.#beginDateCalendarButton = new Button(new XPATH('//input[@placeholder="Дата начала"]'), 'begin date calendar button');
    this.#calendarRightArrowButton = new Button(new XPATH('(//div[contains(@class, "ant-picker-dropdown") and not(contains(@style, "none"))]/descendant::button[contains(@class, "ant-picker-header-next-btn")])[2]'), 'calendar right arrow button');
    this.#endDateCalendarButton = new Button(new XPATH('//input[@placeholder="Дата окончания"]'), 'end date calendar button');
    this.#purposeEducation = new Textbox(new XPATH('//div[text()="Обучение"]'), 'purpose education');
    this.#numberOfDaysElements = new Textbox(new XPATH('//div[@id="form_item_insured_days"]/descendant::label'), 'number of days elements');
    this.#sumDropdown = new Button(new XPATH('//span[text()="Выберите страховую сумму"]/parent::div'), 'sum dropdown');
    this.#sumElements = new Textbox(new XPATH('//div[@id="form_item_amount_sum_list"]/following::div/descendant::div[@aria-selected="false"]'), 'sum elements');
    this.#additionalCheckboxLabel = new Label(new XPATH('//label[contains(@class, "ant-checkbox-wrapper ant-checkbox-wrapper-in-form-item")]/descendant::span[not(@*)]'), 'additional checkbox');
    this.#clientDateOfBirth = new Button(new XPATH('//input[@placeholder="Дата рождения"]'), 'client date of birth');
    this.#chosenSum = new Textbox(new XPATH('//div[@id="form_item_amount_sum_list"]/following::div/descendant::div[@aria-selected="true"]'), 'chosen sum');
    this.#sumField = new Button(new XPATH('//label[@title="Страховая сумма"]/parent::div/following::span[@class="ant-select-selection-item"]'), 'sum field');
    this.#calculateButton = new Button(new XPATH('//span[text()="Рассчитать"]'), 'calculate button');
    this.#continueButton = new Button(new XPATH('//span[text()="Далее"]'), 'continue button');
    this.#totalSum = new Textbox(new XPATH('//h3[text()=" Итого: "]'), 'total sum');
  }

  clickAgent() {
    this.#agentDropdown.clickElement();
  }

  clickFirstAgent() {
    this.#agentDropdownElements.clickElement();
  }

  clickRandomDuration() {
    this.#policyDurationElements.getElements().then((durationsElementsList) => {
      const randomIndex = Randomizer.getRandomInteger(durationsElementsList.length - 1);
      const randomDurationElement = new Button(new TAG(durationsElementsList[randomIndex]), 'random duration element');
      randomDurationElement.clickElement();
    });
  }

  getChosenDuration() {
    return this.#policyDurationChosen.getText();
  }

  getAllCountries() {
    return this.#countriesDropdownHighlighted.createListOfElements(this.#countriesDropdown);
  }

  clickNRandomCountries(countries, count) {
    this.#countriesDropdownButton.chooseRandomElementsFromDropdownByText(
      this.#countriesDropdown,
      {
        valuesListPromise: countries,
        count,
        typeAndEnter: true,
      },
    );
  }

  clickRandomPurpose() {
    this.#purposeDropdown.chooseRandomElementsFromDropdownByText(this.#purposeElements);
  }

  inputRandomBeginDate() {
    const { startDate, startMonthDifference } = Randomizer
      .getRandomDatesIntervalFromTomorrow(...JSONLoader.testData.timeIncrement);
    const beginDateButton = new Button(new XPATH(`//td[@title="${TimeUtils.reformatDateFromDMYToYMD(startDate)}"]`), 'begin date button');
    this.#beginDateCalendarButton.openCalendarAndFlipMonthsMST(
      this.#calendarRightArrowButton,
      startMonthDifference,
    );
    beginDateButton.clickElement();
  }

  inputRandomDates() {
    const {
      startDate, finishDate, startMonthDifference, finishMonthDifference,
    } = Randomizer
      .getRandomDatesIntervalFromTomorrow(...JSONLoader.testData.timeIncrement);
    const beginDateButton = new Button(new XPATH(`//td[@title="${TimeUtils.reformatDateFromDMYToYMD(startDate)}"]`), 'begin date button');
    this.#beginDateCalendarButton.openCalendarAndFlipMonthsMST(
      this.#calendarRightArrowButton,
      startMonthDifference,
    );
    beginDateButton.clickElement();

    const endDateButton = new Button(
      new XPATH(`//div[contains(@class, "ant-picker-dropdown") and not(contains(@style, "none"))]/descendant::td[@title="${TimeUtils.reformatDateFromDMYToYMD(finishDate)}"]`),
      'end date button',
    );
    this.#endDateCalendarButton.flipMonthsMST(
      this.#calendarRightArrowButton,
      finishMonthDifference,
    );
    endDateButton.clickElement();
  }

  clickRandomPurposeWithoutEducation() {
    this.#purposeDropdown.chooseRandomElementsFromDropdownByText(
      this.#purposeElements,
      {
        exceptionElementsList: [this.#purposeEducation],
      },
    );
  }

  clickRandomNumberOfDays() {
    this.#numberOfDaysElements.getElements().then((numberOfDaysElementsList) => {
      const randomIndex = Randomizer.getRandomInteger(numberOfDaysElementsList.length - 1);
      const randomNumberOfDaysElement = new Button(new TAG(numberOfDaysElementsList[randomIndex]), 'random number of days element');
      randomNumberOfDaysElement.clickElement();
    });
  }

  clickRandomSum() {
    this.#sumDropdown.chooseRandomElementsFromDropdownByText(this.#sumElements);
  }

  clickRandomAdditionalCheckboxes() {
    this.#additionalCheckboxLabel.clickCheckboxesByText({ checkboxParentTag: 'label' });
  }

  inputDateOfBirth(birthDate) {
    this.#clientDateOfBirth.inputData(birthDate);
  }

  getBeginDateTitle() {
    return this.#beginDateCalendarButton.getValue();
  }

  getEndDateTitle() {
    return this.#endDateCalendarButton.getValue();
  }

  getChosenSum() {
    return this.#chosenSum.getText();
  }

  getShownSum() {
    return this.#sumField.getText();
  }

  clickCalculate() {
    this.#calculateButton.clickElement();
  }

  clickContinue() {
    this.#continueButton.scrollElementToView();
    this.#continueButton.clickElement();
  }

  totalSumIsVisible() {
    return this.#totalSum.elementIsVisible();
  }
}

module.exports = new MSTStep1();
