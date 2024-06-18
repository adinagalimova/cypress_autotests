const BaseForm = require('../../../main/baseForm');
const StrUtils = require('../../../main/utils/str/strUtils');
const TimeUtils = require('../../../main/utils/time/timeUtils');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const Randomizer = require('../../../main/utils/random/randomizer');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');
const Button = require('../../../main/elements/baseElementChildren/button');

class KaskoStep6 extends BaseForm {
  #insurancePeriodDropdownButton;

  #premiumLabel;

  #paymentTypeDropdownButton;

  #installmentPaymentCountDropdownButton;

  #installmentFirstPaymentCalendarButton;

  #calendarRightArrowButton;

  #saveButton;

  constructor() {
    super(new XPATH('//input[@id=\'form_item_insurance_period\']'), 'Kasko step 6 page');
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
    this.#insurancePeriodDropdownButton.clickArrowButtonRandomNumberOfTimes({ direction: 'up', numberOfElements: 12 });
  }

  getPremiumElement() {
    return this.#premiumLabel.getText()
      .then((text) => StrUtils.removeAllNonNumbersFromString(text));
  }

  choosePaymentType() {
    this.#paymentTypeDropdownButton.clickElement();
    this.#paymentTypeDropdownButton.clickArrowButtonRandomNumberOfTimes({ direction: 'down', numberOfElements: 2 });
  }

  getPaymentType() {
    return this.#paymentTypeDropdownButton.getText();
  }

  chooseInstallmentPaymentCount() {
    this.#installmentPaymentCountDropdownButton.clickElement();
    this.#installmentPaymentCountDropdownButton.clickArrowButtonRandomNumberOfTimes({ direction: 'down', numberOfElements: 12 });
  }

  chooseInstallmentFirstPaymentDate() {
    const { startDate, startMonthDifference } = Randomizer
      .getRandomDatesIntervalFromTomorrow(
        ...JSONLoader.testData.timeIncrementForKaskoInstallmentPaymentFirstDate,
      );
    const installmentFirstPaymentDateButton = new Button(
      new XPATH(`//td[@title="${TimeUtils.reformatDateFromDMYToYMD(startDate)}"]`),
      'installment payment start date button',
    );
    this.#installmentFirstPaymentCalendarButton
      .openCalendarAndFlipMonths(this.#calendarRightArrowButton, startMonthDifference);
    installmentFirstPaymentDateButton.clickElement();
  }

  clickSaveButton() {
    this.#saveButton.clickElement();
  }
}

module.exports = new KaskoStep6();
