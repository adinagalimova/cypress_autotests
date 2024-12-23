const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');

class MainPage extends BaseForm {
  #OGPOButton;

  #mutualButton;

  #kaskoButton;

  #MSTButton;

  #VMSButton;

  constructor() {
    super(new XPATH('//div[@class="ant-card-body"]'), 'main page');
    this.#OGPOButton = new Button(new XPATH('//a[@href="/ogpo/create"]'), 'OGPO button');
    this.#mutualButton = new Button(new XPATH('//a[@href="/mutual"]'), 'Mutual button');
    this.#MSTButton = new Button(new XPATH('//a[@href="/mst/create"]'), 'MST button');
    this.#kaskoButton = new Button(new XPATH('//a[@href="/kasko/create"]'), 'kasko button');
    this.#VMSButton = new Button(new XPATH('//a[@href="/vms/create"]'), 'VMS button');
    // this.#quoteButton = new Button(new XPATH('//a[@href="/quotes/create"]'), 'Quote button');
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

  clickVMSButton() {
    this.#VMSButton.clickElement();
  }

  clickQuoteButton() { // eslint-disable-line class-methods-use-this
    // this.#quoteButton.clickElement();
    if (JSONLoader.configData.environment === 'localhost') {
      cy.open('http://localhost:3000/quotes', { failOnStatusCode: false });
    } else if (JSONLoader.configData.environment === 'dev') {
      cy.open('https://adp-dev.amanat.systems/quotes', { failOnStatusCode: false });
    }
  }
}

module.exports = new MainPage();
