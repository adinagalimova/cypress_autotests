const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');

class VMSStep1 extends BaseForm {
  #uploadPassportButton;

  constructor() {
    super(new XPATH('//button//span[text()="Загрузить паспорт"]'), 'VMS page step one');
    this.#uploadPassportButton = new Button(new XPATH('//button//span[text()="Загрузить паспорт"]//preceding::input[@type="file"]'), 'upload passport button');
  }

  uploadPassport(path) {
    this.#uploadPassportButton.uploadFile(path);
  }
}

module.exports = new VMSStep1();
