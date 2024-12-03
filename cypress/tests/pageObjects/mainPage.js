const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');

class MainPage extends BaseForm {
  #OGPOButton;

  #mutualButton;

  #kaskoButton;

  #MSTButton;

  #estateButton;

  constructor() {
    super(new XPATH('//div[@class="ant-card-body"]'), 'main page');
    this.#OGPOButton = new Button(new XPATH('//a[@href="/ogpo/create"]'), 'OGPO button');
    this.#mutualButton = new Button(new XPATH('//a[@href="/mutual"]'), 'Mutual button');
    this.#MSTButton = new Button(new XPATH('//a[@href="/mst/create"]'), 'MST button');
    this.#kaskoButton = new Button(new XPATH('//a[@href="/kasko/create"]'), 'kasko button');
    this.#estateButton = new Button(new XPATH('//a[@href="/estate/create"]'), 'estate button');
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

  clickEstateButton() {
    this.#estateButton.clickElement();
  }

  clickQuoteButton() {
    // this.#quoteButton.clickElement();
    // cy.open('http://localhost:3000/quotes', { failOnStatusCode: false })
    cy.open('https://adp-dev.amanat.systems/quotes', { failOnStatusCode: false })
  }
}

module.exports = new MainPage();
