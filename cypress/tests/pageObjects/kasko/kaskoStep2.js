const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const Label = require('../../../main/elements/baseElementChildren/label');
const StrUtils = require('../../../main/utils/str/strUtils');
const Randomizer = require('../../../main/utils/random/randomizer');

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