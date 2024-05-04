const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Label = require("../../../main/elements/baseElementChildren/label");
const StrUtils = require('../../../main/utils/str/strUtils');

class KaskoStep6 extends BaseForm {
  #insurancePeriodDropdownButton;
  #insurancePeriodDropdownElement;
  #premiumLabel;
  #paymentTypeDropdownButton;
  #paymentTypeDropdownElement;
  #saveButton;

  constructor() {
    super(new XPATH('//input[@id=\'form_item_insurance_period\']'), 'Kasko step 6 page');

    this.#insurancePeriodDropdownButton = new Button(new XPATH('//input[@id=\'form_item_insurance_period\']/parent::span/parent::div'), 'insurance period dropdown button');
    this.#insurancePeriodDropdownElement = new Button(new XPATH('//div[text()[contains(., \'6 месяцев\')]]'), 'insurance period dropdown element');
    this.#premiumLabel = new Label(new XPATH('//label[text()=\'Страховая премия\']/following::b'), 'premium label');
    this.#paymentTypeDropdownButton = new Button(new XPATH('//input[@id=\'form_item_payment_type\']/parent::span/parent::div'), 'payment type dropdown button');
    this.#paymentTypeDropdownElement = new Button(new XPATH('//div[text()[contains(., \'Единовременно\')]]'), 'payment type dropdown element');
    this.#saveButton = new Button(new XPATH('//span[text()="Сохранить"]/parent::button'), 'save button');
  }

  chooseInsurancePeriod() {
    this.#insurancePeriodDropdownButton.clickElement();
    this.#insurancePeriodDropdownElement.clickElement();
  }

  getPremiumElement() {
    return this.#premiumLabel.getText().then((text) => StrUtils.removeAllNonNumbersFromString(text));
  }

  choosePaymentType() {
    this.#paymentTypeDropdownButton.clickElement();
    this.#paymentTypeDropdownElement.clickElement();
  }

  clickSaveButton() {
    this.#saveButton.clickElement();
  }

}

module.exports = new KaskoStep6();