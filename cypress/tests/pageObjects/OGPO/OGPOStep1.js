const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Switch = require('../../../main/elements/baseElementChildren/switch');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const RadioButton = require('../../../main/elements/baseElementChildren/radioButton');

class OGPOStep1 extends BaseForm {
  #juridicalSwitch;

  #IPSwitch;

  #residentSwitch;

  #IINTextbox;

  #firstNameTextbox;

  #lastNameTextbox;

  #middleNameTextbox;

  #dateOfBirth;

  #sexRadioButton;

  #documentTypeDropdownButton;

  #documentNumberTextbox;

  #documentIssueDateTextbox;

  #addressTextbox;

  #emailTextbox;

  #phoneTextbox;

  #insuredSwitch;

  #PDLSwitch;

  #saveButton;

  #nextButton;

  #searchClientButton;

  constructor() {
    super(new XPATH('//button[@id="form_item_holder_is_insured"]'), 'OGPO step 1');
    this.#juridicalSwitch = new Switch(new XPATH('//label[@title="Юр. лицо"]/following::button[@role="switch"]'), 'juridical switch');
    this.#IPSwitch = new Switch(new XPATH('//label[@title="ИП"]/following::button[@role="switch"]'), 'IP switch');
    this.#residentSwitch = new Switch(new XPATH('//label[@title="Резидент"]/following::button[@role="switch"]'), 'resident switch');
    this.#IINTextbox = new Textbox(new XPATH('//input[@id="form_item_iin"]'), 'IIN textbox');
    this.#firstNameTextbox = new Textbox(new XPATH('//input[@id="form_item_first_name"]'), 'first name textbox');
    this.#lastNameTextbox = new Textbox(new XPATH('//input[@id="form_item_last_name"]'), 'last name textbox');
    this.#middleNameTextbox = new Textbox(new XPATH('//input[@id="form_item_middle_name"]'), 'middle name textbox');
    this.#dateOfBirth = new Textbox(new XPATH('//input[@id="form_item_born"]'), 'date of birth textbox');
    this.#sexRadioButton = new RadioButton(new XPATH('//span[contains(@class, "ant-radio-checked")]/following::span'), 'sex radio button');
    this.#documentTypeDropdownButton = new Button(new XPATH('//input[@id="form_item_document_type_id"]/following::span[@class="ant-select-selection-item"]'), 'document type dropdown button');
    this.#documentNumberTextbox = new Textbox(new XPATH('//input[@id="form_item_document_number"]'), 'document number textbox');
    this.#documentIssueDateTextbox = new Textbox(new XPATH('//input[@id="form_item_document_gived_date"]'), 'document issue date textbox');
    this.#addressTextbox = new Textbox(new XPATH('//input[@id="form_item_address"]'), 'address textbox');
    this.#emailTextbox = new Textbox(new XPATH('//input[@id="form_item_email"]'), 'email textbox');
    this.#phoneTextbox = new Textbox(new XPATH('//input[@id="form_item_mobile_phone"]'), 'phone textbox');
    this.#insuredSwitch = new Switch(new XPATH('//button[@id="form_item_holder_is_insured"]'), 'insured switch');
    this.#PDLSwitch = new Switch(new XPATH('//label[@title="ПДЛ"]/following::button[@role="switch"]'), 'PDL switch');
    this.#saveButton = new Button(new XPATH('//span[text()="Сохранить"]'), 'save button');
    this.#nextButton = new Button(new XPATH('//span[text()="Далее"]//parent::button'), 'next button');
    this.#searchClientButton = new Button(new XPATH('//span[text()="Поиск"]'), 'search client button');
  }

  juridicalSwitchIsChecked() {
    return this.#juridicalSwitch.isChecked();
  }

  IPSwitchIsChecked() {
    return this.#IPSwitch.isChecked();
  }

  residentSwitchIsChecked() {
    return this.#residentSwitch.isChecked();
  }

  insuredSwitchIsChecked() {
    return this.#insuredSwitch.isChecked();
  }

  PDLSwitchIsChecked() {
    return this.#PDLSwitch.isChecked();
  }

  getNextButtonElement() {
    return this.#nextButton.getElement();
  }

  inputIIN(IIN) {
    this.#juridicalSwitch.scrollElementToView();
    this.#IINTextbox.inputData(IIN);
  }

  getFirstNameElement() {
    return this.#firstNameTextbox.getElement();
  }

  getLastNameElement() {
    return this.#lastNameTextbox.getElement();
  }

  getOrSetMiddleNameElement(middleName) {
    if (this.#middleNameTextbox.getText !== middleName) {
      this.#middleNameTextbox.clearData();
      this.#middleNameTextbox.inputData(middleName);
    }

    return this.#middleNameTextbox.getElement();
  }

  getDateOfBirthElement() {
    return this.#dateOfBirth.getElement();
  }

  getSexText() {
    return this.#sexRadioButton.getText();
  }

  getDocumentTypeText() {
    return this.#documentTypeDropdownButton.getText();
  }

  getDocumentNumberElement() {
    return this.#documentNumberTextbox.getElement();
  }

  getDocumentIssueDateElement() {
    return this.#documentIssueDateTextbox.getElement();
  }

  inputAddress() {
    this.#addressTextbox.scrollElementToView();
    this.#addressTextbox.clearData();
    this.#addressTextbox.inputData(JSONLoader.testData.clientAddress);
  }

  inputEmail() {
    this.#emailTextbox.scrollElementToView();
    this.#emailTextbox.clearData();
    this.#emailTextbox.inputData(JSONLoader.testData.clientEmail);
  }

  inputPhone() {
    this.#phoneTextbox.scrollElementToView();
    this.#phoneTextbox.clearData();
    this.#phoneTextbox.inputData(JSONLoader.testData.clientPhone);
  }

  clickSaveButton() {
    this.#saveButton.scrollElementToView();
    this.#saveButton.clickElement();
  }

  clickNextButton() {
    this.#nextButton.clickElement();
  }

  clickSearchClientButton() {
    this.#searchClientButton.clickElement();
  }

  clickInsuredSwitch() {
    this.#insuredSwitch.clickElement();
  }
}

module.exports = new OGPOStep1();
