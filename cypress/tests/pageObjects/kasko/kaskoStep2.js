const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');

class KaskoStep2 extends BaseForm {
  #tariffRows;

  constructor() {
    super(new XPATH('//span[text()=\'Агентское вознаграждение\']'), 'Kasko step 2 page');

    this.#tariffRows = new Label(new XPATH('//tr[@class=\'ant-table-row ant-table-row-level-0\']'), 'tariff rows');
  }

  clickRandomTariff() {
    this.#tariffRows.clickRandomKaskoTariff();
  }
}

module.exports = new KaskoStep2();
