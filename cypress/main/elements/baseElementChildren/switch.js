const BaseElement = require('../baseElement');

class Switch extends BaseElement {
  isChecked() {
    return this.getAttributeValue('aria-checked').then((value) => JSON.parse(value));
  }
}

module.exports = Switch;
