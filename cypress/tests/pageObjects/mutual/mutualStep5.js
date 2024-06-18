const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');
const Button = require('../../../main/elements/baseElementChildren/button');

class MutualStep5 extends BaseForm {
  #statusLabel;

  #insurancePeriodLabel;

  #unifiedCombinedLimitLabel;

  #premiumLabel;

  #issuePolicyButton;

  #policyNumberLabel;

  #paymentCodeLabel;

  constructor() {
    super(new XPATH('//label[@title="Статус"]/following::span[@class="font-bold"]'), 'Mutual step 5');
    this.#statusLabel = new Label(new XPATH('//label[@title="Статус"]/following::span[@class="font-bold"]'), 'status label');
    this.#insurancePeriodLabel = new Label(new XPATH('//label[@title="Период страхования"]/following::span[@class="font-bold"]'), 'insurance period label');
    this.#unifiedCombinedLimitLabel = new Label(new XPATH('//label[@title="Единый комбинированный лимит"]/following::div[@class="font-bold"]'), 'unified combined limit label');
    this.#premiumLabel = new Label(new XPATH('//label[@title="Страховая премия"]/following::div[@class="font-bold"]'), 'premium label');
    this.#issuePolicyButton = new Button(new XPATH('//span[text()="Выписать полис"]'), 'issue policy button');
    this.#policyNumberLabel = new Label(new XPATH('//label[@title="Номер полиса"]/following::span[@class="font-bold"]'), 'policy number label');
    this.#paymentCodeLabel = new Label(new XPATH('//strong[text()="Код для оплаты через Kaspi: "]//following::code'), 'payment code label');
  }

  getStatusText() {
    return this.#statusLabel.getText();
  }

  getInsurancePeriodText() {
    return this.#insurancePeriodLabel.getText();
  }

  getUnifiedCombinedLimitText() {
    return this.#unifiedCombinedLimitLabel.getText();
  }

  getPremiumText() {
    return this.#premiumLabel.getText()
      .then((text) => text.slice(0, -3));
  }

  clickIssuePolicyButton() {
    this.#issuePolicyButton.clickElement();
  }

  getPolicyNumberText() {
    return this.#policyNumberLabel.getText();
  }

  getPaymentCode() {
    return this.#paymentCodeLabel.getText();
  }
}

module.exports = new MutualStep5();
