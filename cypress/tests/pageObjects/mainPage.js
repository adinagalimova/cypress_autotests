const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');

class MainPage extends BaseForm {
  #OGPOButton;

  #mutualButton;

  #kaskoButton;

  #MSTButton;

  constructor() {
    super(new XPATH('//div[@class="ant-card-body"]'), 'main page');
    this.#OGPOButton = new Button(new XPATH('//a[@href="/ogpo/create"]'), 'OGPO button');
    this.#mutualButton = new Button(new XPATH('//a[@href="/mutual"]'), 'Mutual button');
    this.#MSTButton = new Button(new XPATH('//a[@href="/mst/create"]'), 'MST button');
    this.#kaskoButton = new Button(new XPATH('//a[@href="/kasko/create"]'), 'kasko button');
  }

  clickOGPOButton() {
    this.#OGPOButton.clickElement();
  }

  clickMutualButton() {
    this.#mutualButton.clickElement();
  }

  clickKaskoButton() {
    this.#kaskoButton.clickElement();
  }

  clickMSTButton() {
    this.#MSTButton.clickElement();
  }
}

module.exports = new MainPage();
