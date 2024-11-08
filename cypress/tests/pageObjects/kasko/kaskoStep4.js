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

  #carMarkDropdownButton;

  #carMarkFromRegCert;

  #carModelDropdownButton;

  #carModelFromRegCert;

  #carManufacturedYearTextbox;

  #carManufacturedYearFromRegCert;

  #engineVolumeTextbox;

  #engineVolumeFromRegCert;

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
    this.#carMarkDropdownButton = new Textbox(new XPATH('//input[@id="form_item_mark_id"]/following::span[@class="ant-select-selection-item"]'), 'car mark dropdown button');
    this.#carMarkFromRegCert = new Label(new XPATH('//label[@for="form_item_mark_id" and @title="Марка"]//parent::div//following-sibling::div//descendant::div[contains(text(), "По техпаспорту:")]'), 'car mark from reg cert');
    this.#carModelDropdownButton = new Button(new XPATH('//input[@id="form_item_model_id"]/following::span[@class="ant-select-selection-item"]'), 'car model dropdown button');
    this.#carModelFromRegCert = new Label(new XPATH('//label[@for="form_item_model_id" and @title="Модель"]//parent::div//following-sibling::div//descendant::div[contains(text(), "По техпаспорту:")]'), 'car model from reg cert');
    this.#carManufacturedYearTextbox = new Textbox(new XPATH('//input[@id="form_item_born"]'), 'car manufactured year textbox');
    this.#carManufacturedYearFromRegCert = new Label(new XPATH('//label[@for="form_item_born" and @title="Год авто"]//parent::div//following-sibling::div//descendant::div[contains(text(), "По техпаспорту:")]'), 'car year from reg cert');
    this.#engineVolumeTextbox = new Textbox(new XPATH('//input[@id="form_item_car_volume"]'), 'car engine volume');
    this.#engineVolumeFromRegCert = new Label(new XPATH('//label[@for="form_item_car_volume" and @title="Объем двигателя, л"]//parent::div//following-sibling::div//descendant::div[contains(text(), "По техпаспорту:")]'), 'car engine volume from reg cert');
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

  getCarMarkText() {
    return this.#carMarkDropdownButton.getText()
        .then((text) => text.toUpperCase());
  }

  getCarMarkFromRegCertElement() {
    return this.#carMarkFromRegCert.getElement()
  }

  getCarModelText() {
    return this.#carModelDropdownButton.getText()
  }

  getCarModelFromRegCertElement() {
    return this.#carModelFromRegCert.getElement()
  }

  getCarManufacturedYearElement() {
    return this.#carManufacturedYearTextbox.getElement();
  }

  getCarManufacturedYearFromRegCertElement() {
    return this.#carManufacturedYearFromRegCert.getElement();
  }

  getEngineVolumeElement() {
    return this.#engineVolumeTextbox.getElement();
  }

  getEngineVolumeFromRegCertElement() {
    return this.#engineVolumeFromRegCert.getElement();
  }

  getInsuranceSumText() {
    return this.#insuranceSumTextbox.getText();
  }

  clickCalculateButton() {
    this.#calculateButton.scrollElementToView();
    this.#calculateButton.clickElement();
  }

  clickSaveButton() {
    this.#saveButton.clickElement();
  }
}

module.exports = new KaskoStep4();
