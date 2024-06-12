const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const Switch = require('../../../main/elements/baseElementChildren/switch');
const StrUtils = require('../../../main/utils/str/strUtils');

class KaskoStep1 extends BaseForm {
  #agentManagerDropdown;

  #agentManagerDropdownElement;

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
    this.#agentManagerDropdown = new Button(new XPATH('//input[@id=\'form_item_agent_id_1c\']'), 'agent manager dropdown');
    this.#agentManagerDropdownElement = new Button(new XPATH(`//div[@login='${Cypress.env().login}']`), 'agent manager dropdown element');
    this.#carMarkDropdown = new Button(new XPATH('//input[@id=\'form_item_mark_id\']'), 'car mark dropdown');
    this.#carMarkDropdownElement = new Button(new XPATH(`//div[@class='ant-select-item-option-content' and text()='${StrUtils.toTitleCase(JSONLoader.testData.carMark)}']`), 'car mark dropdown element');
    this.#carModelDropdown = new Button(new XPATH('//input[@id=\'form_item_model_id\']'), 'car model dropdown');
    this.#carModelDropdownElement = new Button(new XPATH(`//div[@class='ant-select-item-option-content' and text()='${StrUtils.toTitleCase(JSONLoader.testData.carModel)}']`), 'car model dropdown element');
    this.#carManufacturedYearTextbox = new Textbox(new XPATH('//input[@id=\'form_item_born\']'), 'car manufactured date textbox');
    this.#carEngineVolumeTextbox = new Textbox(new XPATH('//input[@id=\'form_item_car_volume\']'), 'car engine volume textbox');
    this.#insuranceSumTextbox = new Textbox(new XPATH('//input[@id=\'form_item_insurance_sum\']'), 'insurance sum textbox');
    this.#calculateButton = new Button(new XPATH('//span[text()=\'Рассчитать\']/parent::button'), 'calculate button');
    this.#additionalEquipmentSwitch = new Switch(new XPATH('//button[@role=\'switch\' and @id=\'form_item_has_additional\']'), 'additional equipment switch');
    this.#usedAutoSwitch = new Switch(new XPATH('//button[@role=\'switch\' and @id=\'form_item_is_bu\']'), 'used auto switch');
    this.#saveButton = new Button(new XPATH('//span[text()=\'Сохранить\']/parent::button'), 'save button');
  }

  chooseAgentManager() {
    this.#agentManagerDropdown.clickElement();
    this.#agentManagerDropdownElement.clickElement();
  }

  chooseCarMark() {
    this.#carMarkDropdown.clickElement();
    this.#carMarkDropdown.inputData(JSONLoader.testData.carMark);
    this.#carMarkDropdownElement.clickElement();
  }

  chooseCarModel() {
    this.#carModelDropdown.clickElement();
    this.#carModelDropdown.inputData(JSONLoader.testData.carModel);
    this.#carModelDropdownElement.clickElement();
  }

  inputCarManufacturedYear() {
    this.#carManufacturedYearTextbox.inputData(JSONLoader.testData.carManufacturedYear);
  }

  inputCarEngineVolume() {
    const carEngineVolume = (Number(JSONLoader.testData.carEngineVolume) / 1000).toFixed(1);
    this.#carEngineVolumeTextbox.inputData(carEngineVolume, true);
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
