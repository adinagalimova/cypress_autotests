const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');
const Switch = require('../../../main/elements/baseElementChildren/switch');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const RadioButton = require('../../../main/elements/baseElementChildren/radioButton');

class OGPOStep2 extends BaseForm {
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

  #classIDLabel;

  #driverLicenceTypeDropdownButton;

  #driverLicenceNumberTextbox;

  #driverLicenceIssueDateTextbox;

  #experienceLessThan2YearsSwitch;

  #pensionerSwitch;

  #invalidSwitch;

  constructor() {
    super(new XPATH('//input[@id="form_item_driver_certificate"]'), 'OGPO step 2');
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
    this.#classIDLabel = new Label(new XPATH('//label[@for="form_item_class"]/following::span'), 'insured class ID label');
    this.#driverLicenceTypeDropdownButton = new Button(new XPATH('//input[@id="form_item_driver_certificate_type_id"]/following::span[@class="ant-select-selection-item"]'), 'driver licence type dropdown button');
    this.#driverLicenceNumberTextbox = new Textbox(new XPATH('//input[@id="form_item_driver_certificate"]'), 'driver licence number textbox');
    this.#driverLicenceIssueDateTextbox = new Textbox(new XPATH('//input[@id="form_item_driver_certificate_date"]'), 'driver licence issue date textbox');
    this.#experienceLessThan2YearsSwitch = new Switch(new XPATH('//label[@title="Стаж менее 2-х лет"]/following::button[@role="switch"]'), 'experience less than 2 years switch');
    this.#pensionerSwitch = new Switch(new XPATH('//label[@title="Является пенсионером"]/following::button[@role="switch"]'), 'pensioner switch');
    this.#invalidSwitch = new Switch(new XPATH('//label[@title="Является инвалидом"]/following::button[@role="switch"]'), 'invalid switch');
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

  PDLSwitchIsChecked() {
    return this.#PDLSwitch.isChecked();
  }

  experienceLessThan2YearsSwitchIsChecked() {
    return this.#experienceLessThan2YearsSwitch.isChecked();
  }

  pensionerSwitchIsChecked() {
    return this.#pensionerSwitch.isChecked();
  }

  invalidSwitchIsChecked() {
    return this.#invalidSwitch.isChecked();
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

  getClassIDLabelText() {
    return this.#classIDLabel.getText();
  }

  getDriverLicenceTypeText() {
    return this.#driverLicenceTypeDropdownButton.getText();
  }

  getDriverLicenceNumberElement() {
    return this.#driverLicenceNumberTextbox.getElement();
  }

  getDriverLicenceIssueDateElement() {
    return this.#driverLicenceIssueDateTextbox.getElement();
  }
}

module.exports = new OGPOStep2();
