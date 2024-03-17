const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');

class MainPage extends BaseForm {
    #OGPOButton;
    #shanyrakButton;

    constructor() {
        super(new XPATH('//div[@class="ant-card-body"]'), 'main page');
        this.#OGPOButton = new Label(new XPATH('//a[@href="/ogpo/create"]'), 'OGPO button');
        this.#shanyrakButton = new Label(new XPATH('//a[@href="/shanyrak/create"]'), 'Shanyrak button');
    }

    clickOGPOButton() {
        return this.#OGPOButton.clickElement();
    }

    clickShanyrakButton() {
        return this.#shanyrakButton.clickElement();
    }
}

module.exports = new MainPage();