const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const Button = require('../../main/elements/baseElementChildren/button');

class OGPOPage extends BaseForm {
    #purchaseButton;
    #IINTextbox;
    #firstNameTextbox;
    #lastNameTextbox;
    #saveButton;
    #nextButton;
    #searchClientButton;
    #searchVehicleButton;
    #regNumTextbox;
    #regCertNumTextbox;

    constructor() {
        super(new XPATH('//a[@href="/ogpo"]'), 'OGPO page');
        this.#purchaseButton = new Label(new XPATH('//a[contains(text(), "Оформить")]'), 'purchase button');
        this.#IINTextbox = new Textbox(new XPATH('//input[@id="form_item_iin"]'), 'IIN textbox');
        this.#firstNameTextbox = new Textbox(new XPATH('//input[@id="form_item_first_name"]'), 'first name textbox');
        this.#lastNameTextbox = new Textbox(new XPATH('//input[@id="form_item_last_name"]'), 'last name textbox');
        this.#saveButton = new Button(new XPATH('//span[text()="Сохранить"]'), 'save button');
        this.#nextButton = new Button(new XPATH('//span[text()="Далее"]'), 'next button');
        this.#searchClientButton = new Button(new XPATH('//span[text()="Поиск"]'), 'search client button');
        this.#regNumTextbox = new Textbox(new XPATH('//input[@id="form_item_reg_num"]'), 'reg num textbox');
        this.#regCertNumTextbox = new Textbox(new XPATH('//input[@id="form_item_reg_cert_num"]'), 'reg cert num textbox');
        this.#searchVehicleButton = new Button(new XPATH('//span[text()="Найти"][1]'), 'search vehicle button');
    }

    fillIIN() {
        this.#IINTextbox.inputData('880701351146');
    }

    getFirstNameElement() {
        return this.#firstNameTextbox.getElement();
        // return this.#firstNameTextbox.getAttributeValue('ownerElement');
    }

    getLastName() {
        this.#lastNameTextbox.inputData('880701351146');
    }

    clickSaveButton() {
        this.#saveButton.scrollElementToView();
        this.#saveButton.clickElement();
    }

    clickNextButton() {
        this.#nextButton.clickElement();
    }

    clickSearchClientButton() {
        this.#searchClientButton.clickElement();
    }

    fillVehicleData() {
        this.#regNumTextbox.inputData('777KIS02');
        this.#regCertNumTextbox.inputData('AU00187600');
    }

    clickSearchVehicleButton() {
        this.#searchVehicleButton.clickElement();
    }
}

module.exports = new OGPOPage();