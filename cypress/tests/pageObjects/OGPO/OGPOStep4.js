const moment = require('moment');
const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const Randomizer = require('../../../main/utils/random/randomizer');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Label = require('../../../main/elements/baseElementChildren/label');

class OGPOStep4 extends BaseForm {
  #nextButton;

  #periodDropdownButton;

  #beginDateCalendarButton;

  #endDateCalendarButton;

  #calendarRightArrowButton;

  #calculatePremiumButton;

  #sumToPayLabel;

  constructor() {
    super(new XPATH('//input[@id="form_item_period"]//following::span[@class="ant-select-selection-item"]'), 'OGPO step 4');
    this.#nextButton = new Button(new XPATH('//span[text()="Далее"]//parent::button'), 'next button');
    this.#periodDropdownButton = new Button(new XPATH('//input[@id="form_item_period"]//following::span[@class="ant-select-selection-item"]'), 'period dropdown button');
    this.#beginDateCalendarButton = new Button(new XPATH('//input[@id="form_item_date_beg"]'), 'begin date calendar button');
    this.#endDateCalendarButton = new Button(new XPATH('//input[@id="form_item_date_end"]'), 'end date calendar button');
    this.#calendarRightArrowButton = new Button(new XPATH('//button[contains(@class, "ant-picker-header-next-btn")]'), 'right calendar arrow button');
    this.#calculatePremiumButton = new Button(new XPATH('//span[text()="Рассчитать премию"]//ancestor::button[@type="submit"]'), 'calculate premium button');
    this.#sumToPayLabel = new Label(new XPATH('//label[@title="Страховая премия"]//parent::div[contains(@class, "ant-col")]/parent::div[contains(@class, "ant-row")]/descendant::span[@class="ant-form-text"]'), 'sum to pay label');
  }

  clickCalculatePremiumButton() {
    this.#calculatePremiumButton.clickElement();
  }

  getNextButtonElement() {
    return this.#nextButton.getElement();
  }

  getSumToPay() {
    return this.#sumToPayLabel.getText().then((text) => text.slice(0, -3));
  }

  inputRandomBeginDate() {
    const dates = Randomizer
      .getRandomDatesIntervalFromTomorrow(...JSONLoader.testData.timeIncrement);
    const beginDateButton = new Button(new XPATH(`//td[@title="${dates.startDate}"]`), 'begin date button');
    this.#beginDateCalendarButton.openCalendarAndFlipMonths(
      this.#calendarRightArrowButton,
      dates.startMonthDifference,
    );
    beginDateButton.clickElement();
  }

  getPeriodText() {
    return this.#periodDropdownButton.getText();
  }

  calculateEndDate() {
    return this.getBeginDateTitle().then((value) => {
      const endDate = moment(value, JSONLoader.testData.datesFormatFrontEnd)
        .add(1, 'year').subtract(1, 'day').format(JSONLoader.testData.datesFormatFrontEnd);
      return cy.wrap(endDate);
    });
  }

  getBeginDateTitle() {
    return this.#beginDateCalendarButton.getAttributeValue({ attrName: 'title' });
  }

  getEndDateTitle() {
    return this.#endDateCalendarButton.getAttributeValue({ attrName: 'title' });
  }

  clickNextButton() {
    this.#nextButton.clickElement();
  }
}

module.exports = new OGPOStep4();
