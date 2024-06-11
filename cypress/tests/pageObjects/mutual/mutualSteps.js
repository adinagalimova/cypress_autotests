const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');

class MutualSteps extends BaseForm {
  #policiesButton;

  #holderStepButton;

  #insuredStepButton;

  #carStepButton;

  #OGPOPolicyStepButton;

  #issueMutualPolicyStepButton;

  constructor() {
    super(new XPATH('//a[@href="/mutual"]'), 'Mutual steps');
    this.#policiesButton = new Button(new XPATH('//a[@href="/mutual"]'), 'policies button');
    this.#holderStepButton = new Button(new XPATH('//div[text()="Страхователь"]'), 'holder step button');
    this.#insuredStepButton = new Button(new XPATH('//div[text()="Список застрахованных"]'), 'insured step button');
    this.#carStepButton = new Button(new XPATH('//div[text()="Список ТС"]'), 'car step button');
    this.#OGPOPolicyStepButton = new Button(new XPATH('//div[text()="Полис ОС ГПО ВТС"]'), 'OGPO policy step button');
    this.#issueMutualPolicyStepButton = new Button(new XPATH('//div[text()=\'Оформление "ОБВ"\']'), 'issue Mutual policy step button');
  }

  clickHolderStepButton() {
    this.#holderStepButton.elementIsVisible();
    this.#holderStepButton.clickElement();
  }

  clickInsuredStepButton() {
    this.#insuredStepButton.scrollElementToView();
    this.#insuredStepButton.clickElement();
  }

  clickCarStepButton() {
    this.#policiesButton.scrollElementToView();
    this.#carStepButton.clickElement();
  }

  clickOGPOPolicyStepButton() {
    this.#OGPOPolicyStepButton.scrollElementToView();
    this.#OGPOPolicyStepButton.clickElement();
  }

  clickIssueMutualPolicyStepButton() {
    this.#issueMutualPolicyStepButton.clickElement();
  }
}

module.exports = new MutualSteps();
