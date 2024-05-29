const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const Switch = require('../../../main/elements/baseElementChildren/switch');

class KaskoStep5 extends BaseForm {
  #naturalPersonSwitch;

  #IINBINTextbox;

  #searchBeneficiaryButton;

  #beneficiaryFullNameTextbox;

  #saveButton;

  constructor() {
    super(new XPATH('//button[@id="form_item_natural_person_bool"]'), 'Kasko step 5 page');

    this.#naturalPersonSwitch = new Switch(new XPATH('//button[@id="form_item_natural_person_bool"]'), 'natural person switch');
    this.#IINBINTextbox = new Textbox(new XPATH('//input[@id="form_item_iin"]'), 'IIN textbox');
    this.#searchBeneficiaryButton = new Button(new XPATH('//span[text()="Поиск"]/parent::button'), 'search beneficiary button');
    this.#beneficiaryFullNameTextbox = new Textbox(new XPATH('//input[@id="form_item_name"]'), 'beneficiary full name textbox');
    this.#saveButton = new Button(new XPATH('//span[text()="Сохранить"]/parent::button'), 'save button');
  }

  clickNaturalPersonSwitch() {
    this.#naturalPersonSwitch.clickElement();
  }

  inputIINBIN(IINBIN) {
    this.#IINBINTextbox.inputData(IINBIN);
  }

  clickSearchBeneficiaryButton() {
    this.#searchBeneficiaryButton.clickElement();
  }

  getBeneficiaryFullNameElement() {
    return this.#beneficiaryFullNameTextbox.getElement();
  }

  clickSaveButton() {
    this.#saveButton.clickElement();
  }
}

module.exports = new KaskoStep5();
