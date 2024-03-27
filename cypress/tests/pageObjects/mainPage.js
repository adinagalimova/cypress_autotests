const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');

class MainPage extends BaseForm {
    #OGPOButton;
    #shanyrakButton;

    constructor() {
        super(new XPATH('//div[@class="ant-card-body"]'), 'main page');
        this.#OGPOButton = new Button(new XPATH('//a[@href="/ogpo/create"]'), 'OGPO button');
        this.#shanyrakButton = new Button(new XPATH('//a[@href="/shanyrak/create"]'), 'Shanyrak button');
    }

    clickOGPOButton() {
        this.#OGPOButton.clickElement();
    }

    clickShanyrakButton() {
        this.#shanyrakButton.clickElement();
    }
}

module.exports = new MainPage();