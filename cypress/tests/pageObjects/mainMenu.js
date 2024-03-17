const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');

class MainMenu extends BaseForm {
    #mainPageButton;

    constructor() {
        super(new XPATH('//li[@data-menu-id="home"]'), 'main menu');
        this.#mainPageButton = new Button(new XPATH('//li[@data-menu-id="home"]'), 'main page button');
    }

    clickMainPageButton() {
        this.#mainPageButton.scrollElementToView();
        this.#mainPageButton.clickElement();
    }
}

module.exports = new MainMenu();