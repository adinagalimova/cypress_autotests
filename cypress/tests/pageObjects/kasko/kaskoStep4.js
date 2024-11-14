const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const Label = require('../../../main/elements/baseElementChildren/label');

class KaskoStep4 extends BaseForm {
  #regNumTextbox;

  #regCertNumTextbox;

  #searchCarButton;

  #carVINTextbox;

  #carRegionDropdownButton;

  #carRegDateTextbox;

  #carMarkTextbox;

  #carMarkFromRegCert;

  #carModelTextbox;

  #carModelFromRegCert;

  #carManufacturedYearTextbox;

  #insuranceSumTextbox;

  #calculateButton;

  #saveButton;

  constructor() {
    super(new XPATH('//input[@id="form_item_number"]'), 'Kasko step 4 page');
    this.#regNumTextbox = new Textbox(new XPATH('//input[@id="form_item_number"]'), 'reg num textbox');
    this.#regCertNumTextbox = new Textbox(new XPATH('//input[@id="form_item_passport_number"]'), 'reg cert num textbox');
    this.#searchCarButton = new Button(new XPATH('//span[text()="Поиск"]/parent::button'), 'search car button');
    this.#carVINTextbox = new Textbox(new XPATH('//input[@id="form_item_vin"]'), 'car VIN textbox');
    this.#carRegionDropdownButton = new Button(new XPATH('//input[@id="form_item_registration_region_id"]/following::span[@class="ant-select-selection-item"]'), 'car region dropdown button');
    this.#carRegDateTextbox = new Textbox(new XPATH('//input[@id="form_item_passport_date"]'), 'car reg date textbox');
    this.#carMarkTextbox = new Textbox(new XPATH('//input[@id="form_item_mark"]'), 'car mark textbox');
    this.#carMarkFromRegCert = new Label(new XPATH('//label[@for="form_item_mark" and @title="Марка"]//parent::div//following-sibling::div//descendant::div[contains(text(), "Марка по расчету:")]'), 'car mark from reg cert');
    this.#carModelTextbox = new Button(new XPATH('//input[@id="form_item_model"]'), 'car model textbox');
    this.#carModelFromRegCert = new Label(new XPATH('//label[@for="form_item_model" and @title="Модель"]//parent::div//following-sibling::div//descendant::div[contains(text(), "Модель по расчету:")]'), 'car model from reg cert');
    this.#carManufacturedYearTextbox = new Textbox(new XPATH('//input[@id="form_item_born"]'), 'car manufactured year textbox');
    this.#insuranceSumTextbox = new Textbox(new XPATH('//input[@id="form_item_insurance_sum"]'), 'insurance sum textbox');
    this.#calculateButton = new Button(new XPATH('//span[text()=\'Рассчитать\']/parent::button'), 'calculate button');
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

  getCarVINElement() {
    return this.#carVINTextbox.getElement();
  }

  getCarRegionText() {
    return this.#carRegionDropdownButton.getText();
  }

  getCarRegDateElement() {
    return this.#carRegDateTextbox.getElement();
  }

  getCarMarkElement() {
    return this.#carMarkTextbox.getElement();
  }

  getCarMarkFromRegCertText() {
    return this.#carMarkFromRegCert.getText();
  }

  getCarModelElement() {
    return this.#carModelTextbox.getElement();
  }

  getCarModelFromRegCertText() {
    return this.#carModelFromRegCert.getText();
  }

  getCarManufacturedYearElement() {
    return this.#carManufacturedYearTextbox.getElement();
  }

  getInsuranceSumText() {
    return this.#insuranceSumTextbox.getText();
  }

  clickSaveButton() {
    this.#saveButton.clickElement();
  }
}

module.exports = new KaskoStep4();
