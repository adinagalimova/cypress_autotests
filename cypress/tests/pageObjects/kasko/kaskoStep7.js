const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Label = require("../../../main/elements/baseElementChildren/label");
const Textbox = require("../../../main/elements/baseElementChildren/textbox");
const StrUtils = require('../../../main/utils/str/strUtils');
const Randomizer = require("../../../main/utils/random/randomizer");
const JSONLoader = require("../../../main/utils/data/JSONLoader");

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

  constructor(policyStartDate) {
    super(new XPATH('//input[@id=\'form_item_insurance_start_date\']'), 'Kasko step 7 page');
    this.#policyStartDateButton = new Button(new XPATH(`//td[@title="${policyStartDate}"]`), 'policy start date button');

    this.#holderLabel = new Label(new XPATH('//label[@title=\'Страхователь\']//following::span'), 'holder label');
    this.#beneficiaryLabel = new Label(new XPATH('//label[@title=\'Выгодоприобретатель\']//following::span'), 'beneficiary label');
    this.#insuredCarLabel = new Label(new XPATH('//label[@title=\'Застрахованный ТС\']//following::span'), 'insured car label');
    this.#policyStartDateCalendarButton = new Button(new XPATH('//input[@id="form_item_insurance_start_date"]//parent::div'), 'policy start date calendar button');
    this.#calendarRightArrowButton = new Button(new XPATH('//button[contains(@class, "ant-picker-header-next-btn")]'), 'right calendar arrow button');
    this.#additionalInfoTextbox = new Textbox(new XPATH('//textarea[@id=\'form_item_additional_info\']'), 'additional info textbox');
    this.#saveButton = new Button(new XPATH('//span[text()="Сохранить черновик"]/parent::button'), 'save button');
    this.#issueButton = new Button(new XPATH('//span[text()="Выписать полис"]/parent::button'), 'issue button');
  }

  getHolderLabelText() {
    return this.#holderLabel.getText();
  }

  getBeneficiaryLabelText() {
    return this.#beneficiaryLabel.getText();
  }

  getInsuredCarLabelText() {
    return this.#insuredCarLabel.getText();
  }

  choosePolicyStartDate() {
    this.#policyStartDateCalendarButton.clickElement();
    const dates = Randomizer.getRandomDatesIntervalFromTomorrow(...JSONLoader.testData.timeIncrementForKaskoInstallmentPaymentFirstDate);
    const newInstance = new KaskoStep7(dates.startDate);
    this.#policyStartDateCalendarButton.flipCalendarMonth(this.#calendarRightArrowButton, dates.startMonthDifference);
    newInstance.#policyStartDateButton.clickElement();
  }

  inputAdditionalInfo() {
    this.#additionalInfoTextbox.inputData('autotest');
  }

  clickSaveButton() {
    this.#saveButton.clickElement();
  }

  clickIssueButton() {
    this.#issueButton.clickElement();
  }

}

module.exports = new KaskoStep7();