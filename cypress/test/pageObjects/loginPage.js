const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');

class LoginPage extends BaseForm {
    #loginTextbox;
    #passwordTextbox;
    #submitButton;

    constructor() {
        super(new XPATH('//input[@id="form_item_login"]'), 'login page');
        this.#submitButton = new Button(new XPATH('//button[@type="submit"]'), 'submit button');
        this.#loginTextbox = new Textbox(new XPATH('//input[@id="form_item_login"]'), 'login textbox');
        this.#passwordTextbox = new Textbox(new XPATH('//input[@id="form_item_password"]'), 'password textbox');
    }

    fillLoginAndPassword() {
        this.#loginTextbox.inputData("b.tugelbassov");
        this.#passwordTextbox.inputData("Qwerty12345!");
    }

    clickSubmitButton() {
        return this.#submitButton.clickElement();
    }
}

module.exports = new LoginPage();