const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Label = require('../../../main/elements/baseElementChildren/label');
const Switch = require('../../../main/elements/baseElementChildren/switch');

class MutualStep2 extends BaseForm {
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

  #classIDLabel;

  #driverLicenceTypeLabel;

  #driverLicenceNumberLabel;

  #driverLicenceIssueDateLabel;

  #experienceLessThan2YearsSwitch;

  #isPensionerLabel;

  #isInvalidLabel;

  #isPDLLabel;

  #insuredLastnameTabLabel;

  constructor() {
    super(new XPATH('//a[@href="/mutual"]'), 'Mutual step 1');

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
    this.#isPDLLabel = new Label(new XPATH('//label[@title="ПДЛ"]/following::span[@class="font-bold"]'), 'is PDL label');
    this.#insuredLastnameTabLabel = new Label(new XPATH('//div[@role="tab" and @tabindex=0]'), 'insured lastname tab label');
    this.#classIDLabel = new Label(new XPATH('//label[@title=\'Класс "бонус-малус"\']/following::span[@class="font-bold"]'), 'class ID label');
    this.#driverLicenceTypeLabel = new Label(new XPATH('//label[@title="Тип вод. уд"]/following::span[@class="font-bold"]'), 'driver licence type label');
    this.#driverLicenceNumberLabel = new Label(new XPATH('//label[@title="Номер вод. уд."]/following::span[@class="font-bold"]'), 'driver licence number label');
    this.#driverLicenceIssueDateLabel = new Label(new XPATH('//label[@title="Дата выдачи вод. уд."]/following::span[@class="font-bold"]'), 'driver licence issue date label');
    this.#experienceLessThan2YearsSwitch = new Switch(new XPATH('//label[@title="Стаж вождения менее 2-х лет"]/following::button[@role="switch"]'), 'experience less than 2 years switch');
    this.#isPensionerLabel = new Label(new XPATH('//label[@title="Является пенсионером"]/following::span[@class="font-bold"]'), 'is pensioner label');
    this.#isInvalidLabel = new Label(new XPATH('//label[@title="Является инвалидом"]/following::span[@class="font-bold"]'), 'is invalid label');
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

  getIsPDLText() {
    return this.#isPDLLabel.getText();
  }

  getInsuredLastnameTabText() {
    return this.#insuredLastnameTabLabel.getText().then((text) => text.slice(0, text.indexOf(' ')));
  }

  getClassIDText() {
    return this.#classIDLabel.getText();
  }

  getDriverLicenceTypeText() {
    return this.#driverLicenceTypeLabel.getText();
  }

  getDriverLicenceNumberText() {
    return this.#driverLicenceNumberLabel.getText();
  }

  getDriverLicenceIssueDateText() {
    return this.#driverLicenceIssueDateLabel.getText();
  }

  experienceLessThan2YearsSwitchIsChecked() {
    return this.#experienceLessThan2YearsSwitch.isChecked();
  }

  getIsPensionerText() {
    return this.#isPensionerLabel.getText();
  }

  getIsInvalidText() {
    return this.#isInvalidLabel.getText();
  }
}

module.exports = new MutualStep2();
