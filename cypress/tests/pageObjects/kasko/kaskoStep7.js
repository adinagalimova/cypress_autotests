const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Label = require('../../../main/elements/baseElementChildren/label');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const Randomizer = require('../../../main/utils/random/randomizer');
const JSONLoader = require('../../../main/utils/data/JSONLoader');

class KaskoStep7 extends BaseForm {
  #holderLabel;

  #beneficiaryLabel;

  #insuredCarLabel;

  #policyStartDateCalendarButton;

  #policyStartDateButton;

  #calendarRightArrowButton;

  #additionalInfoTextbox;

  #saveButton;

  #issueButton;

  #policyNumberLabel;

  #paymentCodeLabel;

  constructor(policyStartDate) {
    super(new XPATH('//input[@id=\'form_item_insurance_start_date\']'), 'Kasko step 7 page');
    this.#policyStartDateButton = new Button(new XPATH(`//td[@title="${policyStartDate}"]`), 'policy start date button');

    this.#holderLabel = new Label(new XPATH('//label[@title=\'Страхователь\']//following::span'), 'holder label');
    this.#beneficiaryLabel = new Label(new XPATH('//label[@title=\'Выгодоприобретатель\']//following::span'), 'beneficiary label');
    this.#insuredCarLabel = new Label(new XPATH('//label[@title=\'Застрахованный ТС\']//following::span'), 'insured car label');
    this.#policyStartDateCalendarButton = new Button(new XPATH('//input[@id="form_item_insurance_start_date"]'), 'policy start date calendar button');
    this.#calendarRightArrowButton = new Button(new XPATH('//button[contains(@class, "ant-picker-header-next-btn")]'), 'right calendar arrow button');
    this.#additionalInfoTextbox = new Textbox(new XPATH('//textarea[@id=\'form_item_additional_info\']'), 'additional info textbox');
    this.#saveButton = new Button(new XPATH('//span[text()="Сохранить черновик"]/parent::button'), 'save button');
    this.#issueButton = new Button(new XPATH('//span[text()="Выписать полис"]/parent::button'), 'issue button');
    this.#policyNumberLabel = new Button(new XPATH('//strong'), 'policy number label');
    this.#paymentCodeLabel = new Label(new XPATH('//strong[text()="Код для оплаты через Kaspi: "]//following::code'), 'payment code label');
  }

  getHolderLabelText() {
    return this.#holderLabel.getText();
  }

  getBeneficiaryLabelTextboxElement() {
    return this.#beneficiaryLabel.getElement();
  }

  getInsuredCarLabelText() {
    return this.#insuredCarLabel.getText();
  }

  choosePolicyStartDate() {
    this.#policyStartDateCalendarButton.clickElement();
    const dates = Randomizer
      .getRandomDatesIntervalFromTomorrow(
        ...JSONLoader.testData.timeIncrementForKaskoInstallmentPaymentFirstDate,
      );
    const newInstance = new KaskoStep7(dates.startDate);
    this.#policyStartDateCalendarButton
      .flipCalendarMonth(this.#calendarRightArrowButton, dates.startMonthDifference);
    newInstance.#policyStartDateButton.clickElement();
  }

  inputAdditionalInfo() {
    this.#additionalInfoTextbox.inputData(''.concat(
      Randomizer.getRandomString(true, true, true, true, false, 10, 30),
      ' ',
      'autotest',
    ));
  }

  getAdditionalInfoTextboxValue() {
    return this.#additionalInfoTextbox.getValue();
  }

  clickSaveButton() {
    this.#saveButton.clickElement();
  }

  clickIssueButton() {
    this.#issueButton.clickElement();
  }

  getPolicyStartDateTitle() {
    return this.#policyStartDateCalendarButton.getAttributeValue({ attrName: 'title' });
  }

  getPolicyNumberText() {
    return this.#policyNumberLabel.getText().then((text) => text.slice(14));
  }

  getPaymentCode() {
    return this.#paymentCodeLabel.getText();
  }
}

module.exports = new KaskoStep7();
