const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');
const Button = require('../../../main/elements/baseElementChildren/button');
const Switch = require('../../../main/elements/baseElementChildren/switch');

class MutualStep1 extends BaseForm {
  #juridicalSwitch;

  #IPSwitch;

  #residentSwitch;

  #policyForDevelopmentButton;

  #IINLabel;

  #lastNameLabel;

  #firstNameLabel;

  #middleNameLabel;

  #dateOfBirthLabel;

  #sexLabel;

  #documentTypeLabel;

  #documentNumberLabel;

  #documentIssueDateLabel;

  #addressLabel;

  #emailLabel;

  #mobileNumberLabel;

  #isPDLLabel;

  constructor() {
    super(new XPATH('//a[@href=\'/mutual\']'), 'Mutual step 1');
    this.#juridicalSwitch = new Switch(new XPATH('//label[@title="Юр. лицо"]/following::button[@role="switch"]'), 'juridical switch');
    this.#IPSwitch = new Switch(new XPATH('//label[@title="ИП"]/following::button[@role="switch"]'), 'IP switch');
    this.#residentSwitch = new Switch(new XPATH('//label[@title="Резидент"]/following::button[@role="switch"]'), 'resident switch');
    this.#policyForDevelopmentButton = new Button(new XPATH('//a[@href="/mutual/783/show"]'), 'policy for development button');
    this.#IINLabel = new Label(new XPATH('//label[@title="ИИН"]/following::span[@class="font-bold"]'), 'iin label');
    this.#lastNameLabel = new Label(new XPATH('//label[@title="Фамилия"]/following::span[@class="font-bold"]'), 'last name label');
    this.#firstNameLabel = new Label(new XPATH('//label[@title="Имя"]/following::span[@class="font-bold"]'), 'first name label');
    this.#middleNameLabel = new Label(new XPATH('//label[@title="Отчество"]/following::span[@class="font-bold"]'), 'middle name label');
    this.#dateOfBirthLabel = new Label(new XPATH('//label[@title="Дата рождения"]/following::span[@class="font-bold"]'), 'date of birth label');
    this.#sexLabel = new Label(new XPATH('//label[@title="Пол"]/following::span[@class="font-bold"]'), 'sex label');
    this.#documentTypeLabel = new Label(new XPATH('//label[@title="Тип документа"]/following::span[@class="font-bold"]'), 'document type label');
    this.#documentNumberLabel = new Label(new XPATH('//label[@title="Номер документа"]/following::span[@class="font-bold"]'), 'document number label');
    this.#documentIssueDateLabel = new Label(new XPATH('//label[@title="Дата выдачи"]/following::span[@class="font-bold"]'), 'document issue date label');
    this.#addressLabel = new Label(new XPATH('//label[@title="Адрес клиента"]/following::span[@class="font-bold"]'), 'address label');
    this.#emailLabel = new Label(new XPATH('//label[@title="E-Mail"]/following::span[@class="font-bold"]'), 'email label');
    this.#mobileNumberLabel = new Label(new XPATH('//label[@title="Мобильный телефон"]/following::span[@class="font-bold"]'), 'mobile number label');
    this.#isPDLLabel = new Label(new XPATH('//label[@title="ПДЛ"]/following::span[@class="font-bold"]'), 'is PDL label');
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

  clickPolicyForDevelopmentButton() {
    this.#policyForDevelopmentButton.clickElement();
  }

  getIINText() {
    return this.#IINLabel.getText();
  }

  getLastNameText() {
    return this.#lastNameLabel.getText();
  }

  getFirstNameText() {
    return this.#firstNameLabel.getText();
  }

  getMiddleNameText() {
    return this.#middleNameLabel.getText();
  }

  getDateOfBirthText() {
    return this.#dateOfBirthLabel.getText();
  }

  getSexText() {
    return this.#sexLabel.getText();
  }

  getDocumentTypeText() {
    return this.#documentTypeLabel.getText();
  }

  getDocumentNumberText() {
    return this.#documentNumberLabel.getText();
  }

  getDocumentIssueDateText() {
    return this.#documentIssueDateLabel.getText();
  }

  getAddressText() {
    return this.#addressLabel.getText();
  }

  getEmailText() {
    return this.#emailLabel.getText();
  }

  getMobileNumberText() {
    return this.#mobileNumberLabel.getText();
  }

  getIsPDLText() {
    return this.#isPDLLabel.getText();
  }
}

module.exports = new MutualStep1();
