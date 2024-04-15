const BaseElement = require('../baseElement');

class Switch extends BaseElement {
    constructor(locator, name) {
        super(locator, name);
    }

    isChecked() {
        return this.getAttributeValue('aria-checked').then((value) => {
            return value === 'true';
        })
    }
}

module.exports = Switch;