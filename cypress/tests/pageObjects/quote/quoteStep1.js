const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const RadioButton = require('../../../main/elements/baseElementChildren/radioButton');

class QuoteStep1 extends BaseForm {
    #quoteCreateButton
    #iinTextbox
    #searchClientButton
    #lastNameTextbox
    #firstNameTextbox
    #middleNameTextbox
    #dateOfBirth
    #sexRadioButton
    #documentTypeDropdownButton
    #documentNumber
    #documentIssuedDate
    #documentIssuedByDropdownButton
    #address
    #email
    #phoneNumberTextbox
    #nextButton

    constructor() {
        super(new XPATH('//a[@href="/quotes"]'), 'Quote Page Step 1');
        this.#quoteCreateButton = new Button(new XPATH('//button[contains(@class, "ant-btn-primary")]'), 'quote create button');
        // this.#clientTypeCheckbox = new Button(new XPATH('//div[@id="form_item_typeId"]/descendant::span[contains(@class,"checked")]'), 'client type checkbox');
        this.#iinTextbox = new Textbox(new XPATH('//input[@id="form_item_iin"]'), 'IIN textbox');
        this.#searchClientButton = new Button(new XPATH('//button[contains(@class,"ant-input-search-button")]'), 'search client button');
        this.#lastNameTextbox = new Textbox(new XPATH('//input[@id="form_item_lastName"]'), 'last name textbox');
        this.#firstNameTextbox = new Textbox(new XPATH('//input[@id="form_item_firstName"]'), 'first name textbox');
        this.#middleNameTextbox = new Textbox(new XPATH('//input[@id="form_item_middleName"]'), 'middle name textbox');
        this.#dateOfBirth = new Textbox(new XPATH('//input[@id="form_item_birthdate"]'), 'date of birth textbox');
        this.#sexRadioButton = new RadioButton(new XPATH('//div[@id="form_item_genderId"]/label/span/following::span'), 'sex radio button');
        this.#documentTypeDropdownButton = new Textbox(new XPATH('//input[contains(@id,"TypeId")]/ancestor::span/following-sibling::span'), 'document type');
        this.#documentNumber = new Textbox(new XPATH('//input[@id="form_item_documentNumber"]'), 'document number textbox');
        this.#documentIssuedDate = new Textbox(new XPATH('//input[@id="form_item_documentIssueDate"]'), 'document issued date textbox');
        this.#documentIssuedByDropdownButton = new Button(new XPATH('//input[contains(@id,"AuthorityId")]/ancestor::span/following-sibling::span'), 'document issued by dropdown button');
        this.#address = new Textbox(new XPATH('//input[@id="form_item_address"]'), 'address textbox');
        this.#email = new Textbox(new XPATH('//input[@id="form_item_email"]'), 'email textbox');
        this.#phoneNumberTextbox = new Textbox(new XPATH('//input[@placeholder="+7 ### ### ## ##"]'), 'phone number textbox');
        this.#nextButton = new Button(new XPATH('//div/button[contains(@class,"ant-btn-primary")]'), 'next button');
    }
    clickCreateButton() {
        this.#quoteCreateButton.clickElement();
    }
    // chooseClientType() {
    //     this.#clientTypeCheckbox.elementIsVisible();
    // }
    inputDataHolderIIN(iin) {
        this.#iinTextbox.inputData(iin);
    }
    clickSearchClientButton() {
        this.#searchClientButton.clickElement();
    }
    getLastNameElement() {
        return this.#lastNameTextbox.getElement();
    }
    getFirstNameElement() {
        return this.#firstNameTextbox.getElement();
    }
    getOrSetMiddleNameElement(middleName) {
        if (this.#middleNameTextbox.getText !== middleName) {
            this.#middleNameTextbox.clearData();
            this.#middleNameTextbox.inputData(middleName);
        }

        return this.#middleNameTextbox.getElement();
    }
    getDateOfBirthElement() {
        return this.#dateOfBirth.getElement();
    }
    getSexText() {
        return this.#sexRadioButton.getText();
    }
    getDocumentTypeText() {
        this.#documentTypeDropdownButton.scrollElementToView();
        return this.#documentTypeDropdownButton.getText();
    }
    getDocumentNumberElement() {
        return this.#documentNumber.getElement();
    }
    getDocumentIssuedDateElement() {
        return this.#documentIssuedDate.getElement();
    }
    getOrSetDocumentIssuedByElement(holderDocumentGivedByQuote) { //МЮ РК
        return this.#documentIssuedByDropdownButton.getText().then((value) => { // Министертво
            if (value === holderDocumentGivedByQuote) {
                return cy.wrap(value);
            }
            this.#documentIssuedByDropdownButton.clickElement();
            new Button(new XPATH(`//div[@class='ant-select-item-option-content' and text()='${holderDocumentGivedByQuote}']`), 'document issued by dropdown element').clickElement();
            return this.getOrSetDocumentIssuedByElement(holderDocumentGivedByQuote);
        });
    }
    getOrSetAddressElement(address) {
        if (this.#address.getText !== address) {
            this.#address.clearData();
            this.#address.inputData(address);
        }

        return this.#address.getElement();
    }
    getOrSetEmailElement(email) {
        if (this.#email.getText !== email) {
            this.#email.clearData();
            this.#email.inputData(email);
        }

        return this.#email.getElement();
    }
    inputPhoneNumber(phoneNumber) {
        this.#phoneNumberTextbox.inputData(phoneNumber);
    }
    clickNextButton() {
        this.#nextButton.scrollElementToView();
        this.#nextButton.clickElement();
    }
}





module.exports = new QuoteStep1();
