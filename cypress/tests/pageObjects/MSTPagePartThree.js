const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const Checkbox = require('../../main/elements/baseElementChildren/checkbox');

class MSTPagePartThree extends BaseForm {
  #residencyCheckboxActive;

  #IINTextbox;

  #searchClientButton;

  #lastNameTextbox;

  #lastNameEngTextbox;

  #firstNameTextbox;

  #firstNameEngTextbox;

  #middleNameTextbox;

  #dateOfBirth;

  #documentTypeDropdownButton;

  #documentNumber;

  #documentIssuedDate;

  #documentIssuedBy;

  #sexDropdownButton;

  #address;

  #pdlCheckboxNotActive;

  #saveButton;

  #addButton;

  constructor(beginDate, endDate) {
    super(new XPATH('//th[text()="Премия(тг.)"]'), 'MST page part three');
    this.#residencyCheckboxActive = new Checkbox(new XPATH('//span[text()="Резидент"]/preceding::span[contains(@class, "ant-checkbox-checked")]'), 'residency checkbox active');
    this.#IINTextbox = new Textbox(new XPATH('//input[@placeholder="Введите ИИН клиента"]'), 'iin textbox');
    this.#searchClientButton = new Button(new XPATH('//span[text()="Поиск"]'), 'search button');
    this.#lastNameTextbox = new Textbox(new XPATH('//input[@id="form_item_last_name"]'), 'last name textbox');
    this.#lastNameEngTextbox = new Textbox(new XPATH('//input[@id="form_item_last_name_eng"]'), 'last name eng textbox');
    this.#firstNameTextbox = new Textbox(new XPATH('//input[@id="form_item_first_name"]'), 'first name textbox');
    this.#firstNameEngTextbox = new Textbox(new XPATH('//input[@id="form_item_first_name_eng"]'), 'first name eng textbox');
    this.#middleNameTextbox = new Textbox(new XPATH('//input[@id="form_item_middle_name"]'), 'middle name textbox');
    this.#dateOfBirth = new Textbox(new XPATH('//input[@id="form_item_born"]'), 'date of birth textbox');
    this.#documentTypeDropdownButton = new Textbox(new XPATH('//input[@id="form_item_document_type_id"]/following::span[@class="ant-select-selection-item"]'), 'document type');
    this.#documentNumber = new Textbox(new XPATH('//input[@id="form_item_document_number"]'), 'document number textbox');
    this.#documentIssuedDate = new Textbox(new XPATH('//input[@id="form_item_document_gived_date"]'), 'document issued date textbox');
    this.#documentIssuedBy = new Textbox(new XPATH('//input[@id="form_item_document_gived_by"]'), 'document issued by textbox');
    this.#sexDropdownButton = new Textbox(new XPATH('//label[@title="Пол"]/following::span[@class="ant-select-selection-item"]'), 'sex');
    this.#address = new Textbox(new XPATH('//input[@id="form_item_address"]'), 'address textbox');
    this.#pdlCheckboxNotActive = new Checkbox(new XPATH('//input[@id="form_item_pdl"]/parent::span[contains(@class, "ant-checkbox")]'), 'pdl checkbox not active');
    this.#saveButton = new Button(new XPATH('//span[text()="Сохранить"]'), 'save button');
    this.#addButton = new Button(new XPATH('//span[text()="Добавить"]'), 'add button');

  }

  residencyCheckboxOn() {
    return this.#residencyCheckboxActive.elementIsVisible();
  }

  residencyCheckboxOn() {
    return this.#residencyCheckboxActive.elementIsVisible();
  }

  inputIIN(IIN) {
    this.#addButton.scrollElementToView();
    this.#IINTextbox.inputData(IIN);
  }

  clickSearchClientButton() {
    this.#searchClientButton.clickElement();
  }

  getLastNameElement() {
    return this.#lastNameTextbox.getElement();
  }

  getLastNameEngElement() {
    return this.#lastNameEngTextbox.getElement();
  }

  getFirstNameElement() {
    return this.#firstNameTextbox.getElement();
  }

  getFirstNameEngElement() {
    return this.#firstNameEngTextbox.getElement();
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

  getDocumentTypeText() {
    return this.#documentTypeDropdownButton.getText();
  }

  getDocumentNumberElement() {
    return this.#documentNumber.getElement();
  }

  getDocumentIssuedDateElement() {
    return this.#documentIssuedDate.getElement();
  }

  getOrSetDocumentIssuedByElement(documentIssuedBy) {
    if (this.#documentIssuedBy.getText !== documentIssuedBy) {
      this.#documentIssuedBy.clearData();
      this.#documentIssuedBy.inputData(documentIssuedBy);
    }

    return this.#documentIssuedBy.getElement();
  }

  getSexText() {
    return this.#sexDropdownButton.getText();
  }

  getOrSetAddressElement(address) {
    if (this.#address.getText !== address) {
      this.#address.clearData();
      this.#address.inputData(address);
    }

    return this.#address.getElement();
  }

  PDLCheckboxOff() {
    return this.#pdlCheckboxNotActive.elementIsVisible();
  }

  clickSave() {
    this.#saveButton.scrollElementToView();
    this.#saveButton.clickElement();
  }
}

module.exports = new MSTPagePartThree();
