const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const Randomizer = require('../../../main/utils/random/randomizer');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const Label = require('../../../main/elements/baseElementChildren/label');
const Checkbox = require('../../../main/elements/baseElementChildren/checkbox');

class KaskoStep3 extends BaseForm {
  #IINTextbox;

  #searchClientButton;

  #fullNameTextbox;

  #documentTypeDropdownButton;

  #documentNumberTextbox;

  #documentIssueDateTextbox;

  #documentIssuedByTextbox;

  #addressTextbox;

  #emailTextbox;

  #phoneTextbox;

  #PDLCheckbox;

  #saveButton;

  constructor() {
    super(new XPATH('//input[@id="form_item_iin"]'), 'Kasko step 3 page');
    this.#IINTextbox = new Label(new XPATH('//input[@id="form_item_iin"]'), 'IIN textbox');
    this.#searchClientButton = new Button(new XPATH('//span[text()="Поиск"]/parent::button'), 'search client button');
    this.#fullNameTextbox = new Label(new XPATH('//input[@id="form_item_fio"]'), 'full name textbox');
    this.#documentTypeDropdownButton = new Button(new XPATH('//input[@id="form_item_document_type_id"]/following::span[@class="ant-select-selection-item"]'), 'document type dropdown button');
    this.#documentNumberTextbox = new Textbox(new XPATH('//input[@id="form_item_document_number"]'), 'document number textbox');
    this.#documentIssueDateTextbox = new Textbox(new XPATH('//input[@id="form_item_document_gived_date"]'), 'document issue date textbox');
    this.#documentIssuedByTextbox = new Textbox(new XPATH('//input[@id="form_item_document_gived_by"]'), 'document issued by textbox');
    this.#addressTextbox = new Textbox(new XPATH('//input[@id="form_item_address"]'), 'address textbox');
    this.#phoneTextbox = new Textbox(new XPATH('//input[@id="form_item_phone"]'), 'phone textbox');
    this.#emailTextbox = new Textbox(new XPATH('//input[@id="form_item_email"]'), 'email textbox');
    this.#PDLCheckbox = new Checkbox(new XPATH('//input[@id="form_item_pdl"]'), 'PDL checkbox');
    this.#saveButton = new Button(new XPATH('//span[text()="Сохранить"]/parent::button'), 'save button');
  }

  inputIIN(IIN) {
    this.#IINTextbox.inputData(IIN);
  }

  clickSearchClientButton() {
    this.#searchClientButton.clickElement();
  }

  getOrSetFullNameElement() {
    const fullName = ''.concat(
      JSONLoader.testData.clientLastName,
      ' ',
      JSONLoader.testData.clientFirstName,
      ' ',
      JSONLoader.testData.clientMiddleName,
    );
    if (this.#fullNameTextbox.getText !== fullName) {
      this.#fullNameTextbox.clearData();
      this.#fullNameTextbox.inputData(fullName);
    }

    return this.#fullNameTextbox.getElement();
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

  getDocumentIssuedByElement() {
    return this.#documentIssuedByTextbox.getElement();
  }

  inputAddress(address) {
    this.#addressTextbox.scrollElementToView();
    this.#addressTextbox.clearData();
    this.#addressTextbox.inputData(address);
  }

  inputPhone(phone) {
    this.#phoneTextbox.scrollElementToView();
    this.#phoneTextbox.clearData();
    this.#phoneTextbox.inputData(phone);
  }

  inputEmail(email) {
    this.#emailTextbox.scrollElementToView();
    this.#emailTextbox.clearData();
    this.#emailTextbox.inputData(email);
  }

  randomlyClickPDLCheckbox() {
    const random = Randomizer.getRandomInteger(1);
    if (random) this.#PDLCheckbox.clickElement();
  }

  clickSaveButton() {
    this.#saveButton.clickElement();
  }
}

module.exports = new KaskoStep3();
