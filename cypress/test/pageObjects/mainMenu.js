const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');

class MainMenu extends BaseForm {
    #homeButton;

    constructor() {
        super(new XPATH('//li[@data-menu-id="home"]'), 'Main menu');

        this.#homeButton = new Button(new XPATH('//li[@data-menu-id="home"]'), 'Main menu button');
    }

    clickHomeButton() {
        this.#homeButton.clickElement();
    }
}

module.exports = new MainMenu();