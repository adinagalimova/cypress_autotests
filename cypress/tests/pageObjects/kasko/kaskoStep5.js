const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const Label = require("../../../main/elements/baseElementChildren/label");
const Switch = require("../../../main/elements/baseElementChildren/switch");

class KaskoStep5 extends BaseForm {
  #naturalPersonSwitch;
  #IINBINTextbox;
  #searchBeneficiaryButton;
  #beneficiaryFullNameTextbox;
  #saveButton;

  constructor() {
    super(new XPATH('//input[@id="form_item_number"]'), 'Kasko step 4 page');

    this.#naturalPersonSwitch = new Switch(new XPATH('//label[@title=\'Юр. лицо\']/following::button[@role=\'switch\']'), 'natural person switch');
    this.#IINTextbox = new Label(new XPATH('//input[@id="form_item_iin"]'), 'IIN textbox');
    this.#searchClientButton = new Button(new XPATH('//span[text()="Поиск"]/parent::button'), 'search client button');
    this.#saveButton = new Button(new XPATH('//span[text()="Сохранить"]/parent::button'), 'save button');
  }

  inputCarRegNum(regNum) {
    this.#regNumTextbox.inputData(regNum);
  }

  inputCarRegCertNum(regCertNum) {
    this.#regCertNumTextbox.inputData(regCertNum);
  }

  clickSearchCarButton() {
    this.#searchCarButton.clickElement();
  }

  getCarMarkElement() {
    return this.#carMarkTextbox.getElement();
  }

  getCarModelElement() {
    return this.#carModelTextbox.getElement();
  }

  getCarManufacturedYearElement() {
    return this.#carManufacturedYearTextbox.getElement();
  }

  getCarVINElement() {
    return this.#carVINTextbox.getElement();
  }

  getCarRegionText() {
    return this.#carRegionDropdownButton.getText();
  }

  getCarRegDateElement() {
    return this.#carRegDateTextbox.getElement();
  }

  getInsuranceSumText() {
    return this.#insuranceSumTextbox.getText();
  }

  clickSaveButton() {
    this.#saveButton.clickElement();
  }

}

module.exports = new KaskoStep5();