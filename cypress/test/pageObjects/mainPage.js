const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');

class MainPage extends BaseForm {
    #OGPOLink;

    constructor() {
        super(new XPATH('//div[@class="ant-card-body"]'), 'main page');
        this.#OGPOLink = new Label(new XPATH('//a[@href="/ogpo/create"]'), 'OGPO link');
    }

    clickOGPOLink() {
        return this.#OGPOLink.clickElement();
    }
}

module.exports = new MainPage();