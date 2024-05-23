const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Label = require("../../../main/elements/baseElementChildren/label");
const StrUtils = require('../../../main/utils/str/strUtils');
const Randomizer = require("../../../main/utils/random/randomizer");
const JSONLoader = require("../../../main/utils/data/JSONLoader");

class KaskoStep6 extends BaseForm {
  #insurancePeriodDropdownButton;
  #premiumLabel;
  #paymentTypeDropdownButton;
  #installmentPaymentCountDropdownButton;
  #installmentFirstPaymentCalendarButton;
  #installmentFirstPaymentDateButton;
  #calendarRightArrowButton;
  #saveButton;

  constructor(installmentPaymentStartDate) {
    super(new XPATH('//input[@id=\'form_item_insurance_period\']'), 'Kasko step 6 page');
    this.#installmentFirstPaymentDateButton = new Button(new XPATH(`//td[@title="${installmentPaymentStartDate}"]`), 'installment payment start date button');

    this.#insurancePeriodDropdownButton = new Button(new XPATH('//input[@id=\'form_item_insurance_period\']/parent::span/parent::div'), 'insurance period dropdown button');
    this.#premiumLabel = new Label(new XPATH('//label[text()=\'Страховая премия\']/following::b'), 'premium label');
    this.#paymentTypeDropdownButton = new Button(new XPATH('//input[@id=\'form_item_payment_type\']/parent::span/parent::div'), 'payment type dropdown button');
    this.#installmentFirstPaymentCalendarButton = new Button(new XPATH('//input[@id="form_item_payment_start_date"]//parent::div'), 'installment first payment calendar button');
    this.#installmentPaymentCountDropdownButton = new Button(new XPATH('//input[@id=\'form_item_payment_count\']/parent::span/parent::div'), 'installment payment count dropdown button');
    this.#calendarRightArrowButton = new Button(new XPATH('//button[contains(@class, "ant-picker-header-next-btn")]'), 'right calendar arrow button');
    this.#saveButton = new Button(new XPATH('//span[text()="Сохранить"]/parent::button'), 'save button');
  }

  chooseInsurancePeriod() {
    this.#insurancePeriodDropdownButton.clickElement();
    this.#insurancePeriodDropdownButton.clickArrowButtonRandomNumberOfTimes(true, 12);
  }

  getPremiumElement() {
    return this.#premiumLabel.getText().then((text) => StrUtils.removeAllNonNumbersFromString(text));
  }

  choosePaymentType() {
    this.#paymentTypeDropdownButton.clickElement();
    this.#paymentTypeDropdownButton.clickArrowButtonRandomNumberOfTimes(false, 2);
  }

  getPaymentType() {
    return this.#paymentTypeDropdownButton.getText();
  }

  chooseInstallmentPaymentCount() {
    this.#installmentPaymentCountDropdownButton.clickElement();
    this.#installmentPaymentCountDropdownButton.clickArrowButtonRandomNumberOfTimes(false, 12);
  }

  chooseInstallmentFirstPaymentDate() {
    this.#installmentFirstPaymentCalendarButton.clickElement();
    const dates = Randomizer.getRandomDatesIntervalFromTomorrow(...JSONLoader.testData.timeIncrement);
    const newInstance = new KaskoStep6(dates.startDate);
    this.#installmentFirstPaymentCalendarButton.flipCalendarMonth(this.#calendarRightArrowButton, dates.startMonthDifference);
    newInstance.#installmentFirstPaymentDateButton.clickElement();
  }

  clickSaveButton() {
    this.#saveButton.clickElement();
  }

}

module.exports = new KaskoStep6();