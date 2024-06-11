const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');

class KaskoStep4 extends BaseForm {
  #regNumTextbox;

  #regCertNumTextbox;

  #searchCarButton;

  #carMarkTextbox;

  #carModelTextbox;

  #carManufacturedYearTextbox;

  #carVINTextbox;

  #carRegionDropdownButton;

  #carRegionDropdownElement;

  #carRegDateTextbox;

  #insuranceSumTextbox;

  #saveButton;

  constructor() {
    super(new XPATH('//input[@id="form_item_number"]'), 'Kasko step 4 page');
    this.#regNumTextbox = new Textbox(new XPATH('//input[@id="form_item_number"]'), 'reg num textbox');
    this.#regCertNumTextbox = new Textbox(new XPATH('//input[@id="form_item_passport_number"]'), 'reg cert num textbox');
    this.#searchCarButton = new Button(new XPATH('//span[text()="Поиск"]/parent::button'), 'search car button');
    this.#carMarkTextbox = new Textbox(new XPATH('//input[@id="form_item_mark"]'), 'car mark textbox');
    this.#carModelTextbox = new Textbox(new XPATH('//input[@id="form_item_model"]'), 'car model textbox');
    this.#carManufacturedYearTextbox = new Textbox(new XPATH('//input[@id="form_item_born"]'), 'car manufactured year textbox');
    this.#carVINTextbox = new Textbox(new XPATH('//input[@id="form_item_vin"]'), 'car VIN textbox');
    this.#carRegionDropdownButton = new Button(new XPATH('//input[@id="form_item_registration_region_id"]/following::span[@class="ant-select-selection-item"]'), 'car region dropdown button');
    this.#carRegionDropdownElement = new Button(new XPATH(`//div[@class="ant-select-item-option-content" and text()="${JSONLoader.testData.carRegion}"]`), 'car region dropdown element');
    this.#carRegDateTextbox = new Textbox(new XPATH('//input[@id="form_item_passport_date"]'), 'car reg date textbox');
    this.#insuranceSumTextbox = new Textbox(new XPATH('//input[@id="form_item_insurance_sum"]'), 'insurance sum textbox');
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

module.exports = new KaskoStep4();
