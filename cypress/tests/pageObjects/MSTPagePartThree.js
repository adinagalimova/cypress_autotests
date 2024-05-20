const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const Checkbox = require('../../main/elements/baseElementChildren/checkbox');

class MSTPagePartThree extends BaseForm {
  #residencyCheckboxActive;

  constructor(beginDate, endDate) {
    super(new XPATH('//th[text()="Премия(тг.)"]'), 'MST page part three');
    this.#residencyCheckboxActive = new Checkbox(new XPATH('//span[text()="Резидент"]/preceding::span[@class="ant-checkbox css-1eslcgx ant-checkbox-checked"]'), 'residency checkbox active');
  }

  residencyCheckboxOn() {
    return this.#residencyCheckboxActive.elementIsVisible();
  }
}

module.exports = new MSTPagePartThree();
