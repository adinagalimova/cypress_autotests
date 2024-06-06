const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');

class OGPOStep3 extends BaseForm {
  #saveButton;

  #nextButton;

  #searchVehicleButton;

  #searchVehicleByVINButton;

  #regNumTextbox;

  #regCertNumTextbox;

  #carRegDateTextbox;

  #carRegionDropdownButton;

  #carRegionDropdownElement;

  #carVINTextbox;

  #carTypeDropdownButton;

  #carManufacturedYearDropdownButton;

  #carEngineVolumeTextbox;

  #carMarkTextbox;

  #carModelTextbox;

  constructor() {
    super(new XPATH('//label[@for="form_item_vin"]/following::span[text()="Найти"]/parent::button'), 'OGPO step 3');

    this.#saveButton = new Button(new XPATH('//span[text()="Сохранить"]'), 'save button');
    this.#nextButton = new Button(new XPATH('//span[text()="Далее"]//parent::button'), 'next button');
    this.#regNumTextbox = new Textbox(new XPATH('//input[@id="form_item_reg_num"]'), 'reg num textbox');
    this.#regCertNumTextbox = new Textbox(new XPATH('//input[@id="form_item_reg_cert_num"]'), 'reg cert num textbox');
    this.#searchVehicleButton = new Button(new XPATH('//label[@for="form_item_vin"]/preceding::span[text()="Найти"]/parent::button'), 'search vehicle button');
    this.#searchVehicleByVINButton = new Button(new XPATH('//label[@for="form_item_vin"]/following::span[text()="Найти"]/parent::button'), 'search vehicle by VIN button');
    this.#carRegDateTextbox = new Textbox(new XPATH('//input[@id="form_item_dt_reg_cert"]'), 'car reg date textbox');
    this.#carRegionDropdownButton = new Button(new XPATH('//input[@id="form_item_region_id"]/following::span[@class="ant-select-selection-item"]'), 'car region dropdown button');
    this.#carRegionDropdownElement = new Button(new XPATH(`//div[@class="ant-select-item-option-content" and text()="${JSONLoader.testData.carRegion}"]`), 'car region dropdown element');
    this.#carVINTextbox = new Textbox(new XPATH('//input[@id="form_item_vin"]'), 'car VIN textbox');
    this.#carTypeDropdownButton = new Button(new XPATH('//input[@id="form_item_type_id"]/following::span[@class="ant-select-selection-item"]'), 'car type dropdown button');
    this.#carManufacturedYearDropdownButton = new Button(new XPATH('//input[@id="form_item_year"]/following::span[@class="ant-select-selection-item"]'), 'car manufactured year dropdown button');
    this.#carEngineVolumeTextbox = new Textbox(new XPATH('//input[@id="form_item_engine_volume"]'), 'engine volume textbox');
    this.#carMarkTextbox = new Textbox(new XPATH('//input[@id="form_item_mark"]'), 'car mark textbox');
    this.#carModelTextbox = new Textbox(new XPATH('//input[@id="form_item_model"]'), 'car model textbox');
  }

  getNextButtonElement() {
    return this.#nextButton.getElement();
  }

  clickSaveButton() {
    this.#saveButton.scrollElementToView();
    this.#saveButton.clickElement();
  }

  clickNextButton() {
    this.#nextButton.clickElement();
  }

  inputVehicleData() {
    if (JSONLoader.configData.verification) {
      this.#regNumTextbox.inputData(JSONLoader.testData.carNumber);
      this.#regCertNumTextbox.inputData(JSONLoader.testData.carRegistration);
    } else {
      this.#carVINTextbox.inputData(JSONLoader.testData.carVIN);
    }
  }

  inputVehicleDataWithDisabledVerification() {
    if (!JSONLoader.configData.verification) {
      this.#regNumTextbox.inputData(JSONLoader.testData.carNumber);
      this.#regCertNumTextbox.inputData(JSONLoader.testData.carRegistration);
      this.#carRegDateTextbox.inputData(JSONLoader.testData.carRegDate);
      this.#carRegionDropdownButton.clickElement();
      this.#carRegionDropdownElement.clickElement();
    }
  }

  clickSearchVehicleButton() {
    if (JSONLoader.configData.verification) {
      this.#searchVehicleButton.clickElement();
    } else {
      this.#searchVehicleByVINButton.clickElement();
    }
  }

  getCarRegDateElement() {
    return this.#carRegDateTextbox.getElement();
  }

  getCarRegionText() {
    return this.#carRegionDropdownButton.getText();
  }

  getCarVINElement() {
    return this.#carVINTextbox.getElement();
  }

  getCarTypeText() {
    return this.#carTypeDropdownButton.getText();
  }

  getCarManufacturedYearText() {
    return this.#carManufacturedYearDropdownButton.getText();
  }

  getCarEngineVolumeElement() {
    return this.#carEngineVolumeTextbox.getElement();
  }

  getCarMarkElement() {
    return this.#carMarkTextbox.getElement();
  }

  getCarModelElement() {
    return this.#carModelTextbox.getElement();
  }
}

module.exports = new OGPOStep3();
