const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');
const Button = require('../../../main/elements/baseElementChildren/button');
const Randomizer = require('../../../main/utils/random/randomizer');

class KaskoStep2 extends BaseForm {
  #tariffRows;

  constructor() {
    super(new XPATH('//span[text()=\'Агентское вознаграждение\']'), 'Kasko step 2 page');
    this.#tariffRows = new Label(new XPATH('//tr[@class=\'ant-table-row ant-table-row-level-0\']'), 'tariff rows');
  }

  clickRandomTariff() {
    this.#tariffRows.elementIsVisible();
    this.#tariffRows.elementIsDisplayed();
    this.#tariffRows.getElements().then((tariffs) => {
      const randomIndex = Randomizer.getRandomInteger(tariffs.length, 1);
      const tariff = new Button(new XPATH(`(//span[text()='Рассчитать'])[${randomIndex}]`), 'random tariff button');
      tariff.elementIsVisible();
      tariff.scrollElementToView();
      tariff.elementIsDisplayed();
      tariff.clickElement();
    });
  }
}

module.exports = new KaskoStep2();
