const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');
const Button = require('../../../main/elements/baseElementChildren/button');

class OGPOStep5 extends BaseForm {
  #holderLabel;

  #listOfInsuredPeopleLabel;

  #listOfCarsLabel;

  #insurancePeriodBeforeIssuingLabel;

  #insurancePeriodAfterIssuingLabel;

  #issuePolicyButton;

  #statusLabel;

  #creationDateLabel;

  #policyNumberLabel;

  #sumToPayLabel;

  #paymentCodeLabel;

  #mutualButton;

  #confirmIssueMutualButton;

  constructor() {
    super(new XPATH('//label[@title="Список застрахованных"]/following::div[@class="w-fit"]/div'), 'OGPO step 5');
    this.#holderLabel = new Label(new XPATH('//label[@title="Страхователь"]/following::div[@class="ant-form-item-control-input-content"]/span'), 'holder label');
    this.#listOfInsuredPeopleLabel = new Label(new XPATH('//label[@title="Список застрахованных"]/following::div[@class="w-fit"]/div'), 'list of insured people label');
    this.#listOfCarsLabel = new Label(new XPATH('//label[@title="Список ТС"]/following::div[@class="w-fit"]/div'), 'list of insured cars label');
    this.#insurancePeriodBeforeIssuingLabel = new Label(new XPATH('//label[@title="Период страхования"]/following::span[@class="ant-form-text"]'), 'insurance period before issuing label');
    this.#sumToPayLabel = new Label(new XPATH('//label[@title="Страховая премия"]//parent::div[contains(@class, "ant-col")]/parent::div[contains(@class, "ant-row")]/descendant::span[@class="ant-form-text"]'), 'sum to pay label');
    this.#issuePolicyButton = new Button(new XPATH('//button[contains(@class,"ant-btn-primary")]'), 'issue policy button');
    this.#policyNumberLabel = new Label(new XPATH('//label[@title="Номер полиса"]/following::span[@class="font-bold"]'), 'policy number label');
    this.#statusLabel = new Label(new XPATH('//label[@title="Статус"]//parent::div[contains(@class, "ant-col")]/parent::div[contains(@class, "ant-row")]/descendant::span[@class="font-bold"]'), 'status label');
    this.#creationDateLabel = new Label(new XPATH('//label[@title="Дата создания"]//parent::div[contains(@class, "ant-col")]/parent::div[contains(@class, "ant-row")]/descendant::span[@class="font-bold"]'), 'creation date label');
    this.#insurancePeriodAfterIssuingLabel = new Label(new XPATH('//label[@title="Период страхования"]/following::span[@class="font-bold"]'), 'insurance period after issuing label');
    this.#paymentCodeLabel = new Label(new XPATH('//strong[text()="Код для оплаты через Kaspi: "]//following::code//child::span'), 'payment code label');
    this.#mutualButton = new Button(new XPATH('//span[text()=\'Создать "обоюдку"\']/parent::button'), 'Mutual button');
    this.#confirmIssueMutualButton = new Button(new XPATH('//span[text()="Да"]/parent::button'), 'confirm issue Mutual button');
  }

  getPolicyNumberText() {
    return this.#policyNumberLabel.getText();
  }

  clickConfirmIssueMutualButton() {
    this.#confirmIssueMutualButton.clickElement();
  }

  clickMutualButton() {
    this.#mutualButton.clickElement();
  }

  getSlicedCreationDate() {
    return this.#creationDateLabel.getText()
      .then((text) => text.slice(0, 10));
  }

  clickIssuePolicyButton() {
    this.#issuePolicyButton.clickElement();
  }

  getStatusText() {
    return this.#statusLabel.getText();
  }

  getHolderText() {
    return this.#holderLabel.getText();
  }

  getListOfInsuredPeopleText() {
    return this.#listOfInsuredPeopleLabel.getText();
  }

  getListOfCarsText() {
    return this.#listOfCarsLabel.getText();
  }

  getInsurancePeriodBeforeIssuingText() {
    return this.#insurancePeriodBeforeIssuingLabel.getText();
  }

  getInsurancePeriodAfterIssuingText() {
    return this.#insurancePeriodAfterIssuingLabel.getText();
  }

  getSumToPay() {
    return this.#sumToPayLabel.getText()
      .then((text) => text.slice(0, -3));
  }

  getPaymentCode() {
    return this.#paymentCodeLabel.getText();
  }
}

module.exports = new OGPOStep5();
