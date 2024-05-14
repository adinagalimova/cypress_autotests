const moment = require('moment');
const BaseForm = require('../../main/baseForm');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Randomizer = require('../../main/utils/random/randomizer');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const Label = require('../../main/elements/baseElementChildren/label');
const RadioButton = require('../../main/elements/baseElementChildren/radioButton');
const Switch = require('../../main/elements/baseElementChildren/switch');
const DataUtils = require('../../main/utils/data/dataUtils');

class MSTPagePartOne extends BaseForm {
  #agentDropdown;

  #agentDropdownElements;

  #policyDuration;

  #policyDurationElements;

  #policyDurationChosen;

  #countriesDropdown;

  #countriesDropdownHighlighted;

  constructor(beginDate) {
    super(new XPATH('//span[text()="на год"]'), 'MST page Part One');
    this.#agentDropdown = new Button(new XPATH('//div[@class="ant-col ant-col-19 ant-form-item-control css-1eslcgx"]'), 'agent dropdown');
    this.#agentDropdownElements = new Textbox(new XPATH('//div[@class="ant-select-item-option-content"]'), 'agent dropdown elements');
    this.#policyDuration = new Textbox(new XPATH('//label[@title="Срок полиса"]'), 'policy duration');
    this.#policyDurationElements = new Textbox(new XPATH('//div[@class="ant-radio-group ant-radio-group-solid css-1eslcgx"]/descendant::label'), 'policy duration elements');
    this.#policyDurationChosen = new Textbox(new XPATH('//label[@class="ant-radio-button-wrapper ant-radio-button-wrapper-checked ant-radio-button-wrapper-in-form-item css-1eslcgx"]'), 'policy duration chosen one');
    this.#countriesDropdown = new Textbox(new XPATH('//label[text()="Территория"]/parent::div/following::div/descendant::div'), 'countries dropdown');
    this.#countriesDropdownHighlighted = new Textbox(new XPATH('//div[@class="ant-select-item ant-select-item-option ant-select-item-option-active"]'), 'countries dropdown highlighted');
  }

  clickAgent() {
    return this.#agentDropdown.clickElement();
  }

  clickFirstAgent() {
    return this.#agentDropdownElements.clickElement();
  }

  clickRandomDuration() {
    return this.#policyDurationElements.clickRandomElementsFromDropdownByText(this.#policyDuration);
  }

  getChosenDuration() {
    return this.#policyDurationChosen.getText();
  }

  getAllCountries() {
    return this.#countriesDropdownHighlighted.createListOfElements(this.#countriesDropdown);
  }

  getCountriesFromRequest() {
    const excludedCountries = new Set(JSONLoader.testData.MSTExcludedCountries);
    const countries = [];
    cy.intercept('countries*', (request) => {
      request.continue((response) => {
        response.body.forEach((country) => {
          if (!excludedCountries.has(country.title)) {
            countries.push(country.title);
          }
        });
      });
    });

    return cy.wrap(countries);
  }

  clickThreeCountries(elementsArray) {
    return this.#countriesDropdownHighlighted.clickElementsFromDropdownByText(elementsArray, this.#countriesDropdown, 3);
  }
}

module.exports = new MSTPagePartOne();
