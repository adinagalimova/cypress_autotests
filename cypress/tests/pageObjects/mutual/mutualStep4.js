const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');

class MutualStep4 extends BaseForm {
  #OGPOPolicyNumberLabel;

  #OGPOPolicyStatusLabel;

  #OGPOPolicyIssueDateLabel;

  #OGPOInsurancePeriodLabel;

  #OGPOHolderLabel;

  #OGPOListOfInsuredPeopleLabel;

  #OGPOListOfCarsLabel;

  constructor() {
    super(new XPATH('//label[@title="Номер полиса"]/following::span[@class="font-bold"]'), 'Mutual step 4');
    this.#OGPOPolicyNumberLabel = new Label(new XPATH('//label[@title="Номер полиса"]/following::span[@class="font-bold"]'), 'OGPO policy number label');
    this.#OGPOPolicyStatusLabel = new Label(new XPATH('//label[@title="Статус"]/following::span[@class="font-bold"]'), 'OGPO policy status label');
    this.#OGPOPolicyIssueDateLabel = new Label(new XPATH('//label[@title="Дата создания"]/following::span[@class="font-bold"]'), 'OGPO policy issue date label');
    this.#OGPOInsurancePeriodLabel = new Label(new XPATH('//label[@title="Период страхования"]/following::span[@class="font-bold"]'), 'OGPO insurance period label');
    this.#OGPOHolderLabel = new Label(new XPATH('//label[@title="Страхователь"]/following::span[@class="font-bold"]'), 'OGPO holder label');
    this.#OGPOListOfInsuredPeopleLabel = new Label(new XPATH('//label[@title="Список застрахованных"]/following::div[@class="font-bold"]'), 'OGPO list of insured people label');
    this.#OGPOListOfCarsLabel = new Label(new XPATH('//label[@title="Список ТС"]/following::div[@class="font-bold"]'), 'OGPO list of insured cars label');
  }

  getOGPOPolicyNumberText() {
    return this.#OGPOPolicyNumberLabel.getText();
  }

  getOGPOPolicyStatusText() {
    return this.#OGPOPolicyStatusLabel.getText();
  }

  getSlicedOGPOPolicyIssueDateText() {
    return this.#OGPOPolicyIssueDateLabel.getText()
      .then((text) => text.slice(0, 10));
  }

  getOGPOInsurancePeriodText() {
    return this.#OGPOInsurancePeriodLabel.getText();
  }

  getOGPOHolderText() {
    return this.#OGPOHolderLabel.getText();
  }

  getOGPOListOfInsuredPeopleText() {
    return this.#OGPOListOfInsuredPeopleLabel.getText();
  }

  getOGPOListOfCarsText() {
    return this.#OGPOListOfCarsLabel.getText();
  }
}

module.exports = new MutualStep4();
