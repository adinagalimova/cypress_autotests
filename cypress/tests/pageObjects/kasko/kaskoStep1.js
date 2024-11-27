const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const Switch = require('../../../main/elements/baseElementChildren/switch');
const JSONLoader = require('../../../main/utils/data/JSONLoader');

class KaskoStep1 extends BaseForm {
  #agentDropdown;

  #agentDropdownElements;

  #carMarkDropdown;

  #carMarkDropdownElement;

  #carModelDropdown;

  #carModelDropdownElement;

  #carManufacturedYearTextbox;

  #carEngineVolumeTextbox;

  #insuranceSumTextbox;

  #calculateButton;

  #additionalEquipmentSwitch;

  #usedAutoSwitch;

  #saveButton;

  constructor() {
    super(new XPATH('//a[@href="/kasko"]'), 'Kasko step 1 page');
    this.#agentDropdown = new Button(new XPATH('//input[@id=\'form_item_agent_id_1c\']/parent::span/parent::div'), 'agent dropdown');
    this.#agentDropdownElements = new Button(new XPATH('//div[@class=\'rc-virtual-list-holder-inner\']/div'), 'agent dropdown elements');
    this.#carMarkDropdown = new Button(new XPATH('//input[@id=\'form_item_mark_id\']'), 'car mark dropdown');
    this.#carModelDropdown = new Button(new XPATH('//input[@id=\'form_item_model_id\']'), 'car model dropdown');
    this.#carManufacturedYearTextbox = new Textbox(new XPATH('//input[@id=\'form_item_born\']'), 'car manufactured date textbox');
    this.#carEngineVolumeTextbox = new Textbox(new XPATH('//input[@id=\'form_item_car_volume\']'), 'car engine volume textbox');
    this.#insuranceSumTextbox = new Textbox(new XPATH('//input[@id=\'form_item_insurance_sum\']'), 'insurance sum textbox');
    this.#calculateButton = new Button(new XPATH('//span[text()=\'Рассчитать\']/parent::button'), 'calculate button');
    this.#additionalEquipmentSwitch = new Switch(new XPATH('//button[@role=\'switch\' and @id=\'form_item_has_additional\']'), 'additional equipment switch');
    this.#usedAutoSwitch = new Switch(new XPATH('//button[@role=\'switch\' and @id=\'form_item_is_bu\']'), 'used auto switch');
    this.#saveButton = new Button(new XPATH('//span[text()=\'Сохранить\']/parent::button'), 'save button');
  }

  chooseAgent() {
    this.#agentDropdown.clickElement();
    this.#agentDropdownElements.getElements().then(() => {
      const agentButton = new Button(new XPATH(`//div[@login = '${JSONLoader.testData.agentLoginKASKO}']`), 'ЦСУ agent button');
      agentButton.elementIsVisible();
      agentButton.scrollElementToView();
      agentButton.elementIsDisplayed();
      agentButton.clickElement();
    });
  }

  chooseCarMark(carMark) {
    this.#carMarkDropdown.clickElement();
    this.#carMarkDropdown.inputData(carMark);
    this.#carMarkDropdownElement = new Button(new XPATH(`//div[@class='ant-select-item-option-content' and text()='${carMark}']`), 'car mark dropdown element');
    this.#carMarkDropdownElement.clickElement();
  }

  chooseCarModel(carModel) {
    this.#carModelDropdown.clickElement();
    this.#carModelDropdown.inputData(carModel);
    this.#carModelDropdownElement = new Button(new XPATH(`//div[@class='ant-select-item-option-content' and text()='${carModel}']`), 'car model dropdown element');
    this.#carModelDropdownElement.clickElement();
  }

  inputCarManufacturedYear(carManufacturedYear) {
    this.#carManufacturedYearTextbox.inputData(carManufacturedYear);
  }

  inputCarEngineVolume(carEngineVolume) {
    const carEngineVolumeToLiters = (Number(carEngineVolume) / 1000).toFixed(1);
    this.#carEngineVolumeTextbox.inputData(carEngineVolumeToLiters, { useCypressRealEvents: true });
  }

  inputInsuranceSumTextbox() {
    this.#insuranceSumTextbox.focusOnElement();
    this.#insuranceSumTextbox.clickElement();
    this.#insuranceSumTextbox.inputData('1');
  }

  clickCalculateButton() {
    this.#calculateButton.scrollElementToView();
    this.#calculateButton.clickElement();
  }

  getInsuranceSumText() {
    return this.#insuranceSumTextbox.getText();
  }

  additionalEquipmentSwitchIsChecked() {
    return this.#additionalEquipmentSwitch.isChecked();
  }

  usedAutoSwitchIsChecked() {
    return this.#usedAutoSwitch.isChecked();
  }

  clickSaveButton() {
    this.#saveButton.clickElement();
  }
}

module.exports = new KaskoStep1();
