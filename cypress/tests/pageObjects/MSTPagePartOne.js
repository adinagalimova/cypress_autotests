const moment = require('moment');
const BaseForm = require('../../main/baseForm');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Randomizer = require('../../main/utils/random/randomizer');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const Label = require('../../main/elements/baseElementChildren/label');
const RadioButton = require('../../main/elements/baseElementChildren/radioButton');
const Switch = require('../../main/elements/baseElementChildren/switch');
const DataUtils = require('../../main/utils/data/dataUtils');

class MSTPagePartOne extends BaseForm {
  #agentDropdown;

  #agentDropdownElements;

  #policyDuration;

  #policyDurationElements;

  #policyDurationChosen;

  #countriesDropdown;

  #countriesDropdownHighlighted;

  #purposeDropdown;

  #purposeElements;

  #beginDateCalendarButton;

  #calendarRightArrowButton;

  #beginDateButton;

  #endDateCalendarButton;

  #endDateButton;

  #purposeEducation;

  #numberOfDays;

  #numberOfDaysElements;

  #sumDropdown;

  #sumElements;

  #additionalCheckboxLabel;

  #clientDOB;

  constructor(beginDate, endDate) {
    super(new XPATH('//span[text()="на год"]'), 'MST page Part One');
    this.#agentDropdown = new Button(new XPATH('//div[@class="ant-col ant-col-19 ant-form-item-control css-1eslcgx"]'), 'agent dropdown');
    this.#agentDropdownElements = new Textbox(new XPATH('//div[@class="ant-select-item-option-content"]'), 'agent dropdown elements');
    this.#policyDuration = new Button(new XPATH('//label[@title="Срок полиса"]'), 'policy duration');
    this.#policyDurationElements = new Textbox(new XPATH('//div[@id="form_item_range"]/descendant::label'), 'policy duration elements');
    this.#policyDurationChosen = new Textbox(new XPATH('//label[@class="ant-radio-button-wrapper ant-radio-button-wrapper-checked ant-radio-button-wrapper-in-form-item css-1eslcgx"]'), 'policy duration chosen one');
    this.#countriesDropdown = new Button(new XPATH('//label[text()="Территория"]/parent::div/following::div/descendant::div'), 'countries dropdown');
    this.#countriesDropdownHighlighted = new Textbox(new XPATH('//div[@class="ant-select-item ant-select-item-option ant-select-item-option-active"]'), 'countries dropdown highlighted');
    this.#purposeDropdown = new Button(new XPATH('//span[text()="Выберите цель поездки"]/parent::div'), 'purpose dropdown');
    this.#purposeElements = new Textbox(new XPATH('//div[@id="form_item_purpose_id_list"]/following::div/descendant::div[@aria-selected="false"]'), 'purpose elements');
    this.#beginDateCalendarButton = new Button(new XPATH('//input[@placeholder="Дата начала"]'), 'begin date calendar button');
    this.#calendarRightArrowButton = new Button(new XPATH('//div[contains(@class, "ant-picker-dropdown") and not(contains(@style, "none"))]/descendant::button[contains(@class, "ant-picker-header-next-btn")]'), 'calendar right arrow button');
    this.#beginDateButton = new Button(new XPATH(`//td[@title="${beginDate}"]`), 'begin date button');
    this.#endDateCalendarButton = new Button(new XPATH('//input[@placeholder="Дата окончания"]'), 'end date calendar button');
    this.#endDateButton = new Button(new XPATH(`//td[@title="${endDate}"]`), 'end date button');
    this.#purposeEducation = new Textbox(new XPATH('//div[text()="Обучение"]'), 'purpose education');
    this.#numberOfDays = new Button(new XPATH('//label[@title="Кол.во дней"]'), 'number of days');
    this.#numberOfDaysElements = new Textbox(new XPATH('//div[@id="form_item_insured_days"]/descendant::label'), 'policy duration elements');
    this.#sumDropdown = new Button(new XPATH('//span[text()="Выберите страховую сумму"]/parent::div'), 'sum dropdown');
    this.#sumElements = new Textbox(new XPATH('//div[@id="form_item_amount_sum_list"]/following::div/descendant::div[@aria-selected="false"]'), 'sum elements');
    this.#additionalCheckboxLabel = new Label(new XPATH('//label[@class="ant-checkbox-wrapper ant-checkbox-wrapper-in-form-item css-1eslcgx"]/descendant::span[not(@*)]'), 'additional checkbox');
    this.#clientDOB = new Button(new XPATH('//input[@placeholder="Дата рождения"]'), 'client date of birth');
  }

  clickAgent() {
    return this.#agentDropdown.clickElement();
  }

  clickFirstAgent() {
    return this.#agentDropdownElements.clickElement();
  }

  clickRandomDuration() {
    return this.#policyDurationElements.clickRandomElementsFromDropdownByText(this.#policyDuration);
  }

  getChosenDuration() {
    return this.#policyDurationChosen.getText();
  }

  getAllCountries() {
    return this.#countriesDropdownHighlighted.createListOfElements(this.#countriesDropdown);
  }

  getCountriesFromRequest() {
    const excludedCountries = new Set(JSONLoader.testData.MSTExcludedCountries);
    const countries = [];
    cy.intercept('countries*', (request) =>
      request.continue((response) =>
        response.body.forEach((country) => {
          if (!excludedCountries.has(country.title)) countries.push(country.title);
        })));

    return cy.wrap(countries);
  }

  clickThreeRandomCountries(elementsArray) {
    return this.#countriesDropdownHighlighted.clickElementsFromDropdownByText(
      elementsArray,
      this.#countriesDropdown,
      JSONLoader.testData.countriesCount
    );
  }

  clickRandomPurpose() {
    return this.#purposeElements.clickRandomElementsFromDropdownByText(this.#purposeDropdown);
  }

  inputRandomBeginDate() {
    const dates = Randomizer
      .getRandomDatesIntervalFromTomorrow(...JSONLoader.testData.timeIncrement);
    const newInstance = new MSTPagePartOne(dates.startDate);
    this.#beginDateCalendarButton.flipCalendarMonth(
      this.#calendarRightArrowButton,
      dates.startMonthDifference,
    );
    newInstance.#beginDateButton.clickElement();
  }

  inputRandomDates() {
    const dates = Randomizer
      .getRandomDatesIntervalFromTomorrow(...JSONLoader.testData.timeIncrement);
    const newInstance = new MSTPagePartOne(dates.startDate, dates.finishDate);
    this.#beginDateCalendarButton.flipCalendarMonth(
      this.#calendarRightArrowButton,
      dates.startMonthDifference,
    );
    newInstance.#beginDateButton.clickElement();
    this.#endDateCalendarButton.flipCalendarMonth(
      this.#calendarRightArrowButton,
      dates.finishMonthDifference,
    );
    newInstance.#endDateButton.clickElement();
  }

  clickRandomPurposeWithoutEducation() {
    return this.#purposeElements.clickRandomElementsFromDropdownByText(this.#purposeDropdown, this.#purposeEducation);
  }

  clickPurposeDropdown() {
    return this.#purposeDropdown.clickElement();
  }

  clickRandomNumberOfDays() {
    return this.#numberOfDaysElements.clickRandomElementsFromDropdownByText(this.#numberOfDays);
  }

  clickRandomSum() {
    return this.#sumElements.clickRandomElementsFromDropdownByText(this.#sumDropdown);
  }

  clickRandomAdditionalCheckboxes() {
    this.#additionalCheckboxLabel.clickCheckboxesByText({ checkboxParent: 'label' });
  }

  inputDOB(birthDate) {
    this.#clientDOB.inputData(birthDate);
  }
}

module.exports = new MSTPagePartOne();
