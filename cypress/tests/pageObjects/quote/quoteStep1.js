const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const RadioButton = require('../../../main/elements/baseElementChildren/radioButton');


class QuoteStep1 extends BaseForm {
    #quoteCreateButton
    // #clientTypeCheckbox
    // #choosenClientType
    #iinTextbox
    #searchClientButton
    #lastNameTextbox
    #firstNameTextbox
    #middleNameTextbox
    #dateOfBirthTextbox
    #sexRadioButton
    #documentTypeDropdown
    #documentNumberTextbox
    #documentIssuedDateTextbox
    #documentIssuedByDropdown
    #addressTextbox
    #emailTextbox
    #phoneNumberTextbox
    #nextButton
    #editQuoteButton

    constructor() {
        super(new XPATH('//a[@href="/quotes"]'), 'Quote Page Step 1');
        this.#quoteCreateButton = new Button(new XPATH('//button[contains(@class, "ant-btn-primary")]'), 'quote create button');
        this.#iinTextbox = new Textbox(new XPATH('//input[@id="form_item_iin"]'), 'IIN textbox');
        this.#searchClientButton = new Button(new XPATH('//button[contains(@class,"ant-input-search-button")]'), 'search client button');
        this.#lastNameTextbox = new Textbox(new XPATH('//input[@id="form_item_lastName"]'), 'last name textbox');
        this.#firstNameTextbox = new Textbox(new XPATH('//input[@id="form_item_firstName"]'), 'first name textbox');
        this.#middleNameTextbox = new Textbox(new XPATH('//input[@id="form_item_middleName"]'), 'middle name textbox');
        this.#dateOfBirthTextbox = new Textbox(new XPATH('//input[@id="form_item_birthdate"]'), 'date of birth textbox');
        this.#sexRadioButton = new RadioButton(new XPATH('//div[@id="form_item_genderId"]/descendant::span[contains(@class, "ant-radio-checked")]/following::span'), 'sex radio button');
        this.#documentTypeDropdown = new Textbox(new XPATH('//input[@id="form_item_documentTypeId"]/following::span[@class="ant-select-selection-item"]'), 'document type');
        this.#documentNumberTextbox = new Textbox(new XPATH('//input[@id="form_item_documentNumber"]'), 'document number textbox');
        this.#documentIssuedDateTextbox = new Textbox(new XPATH('//input[@id="form_item_documentIssueDate"]'), 'document issued date textbox');
        this.#documentIssuedByDropdown = new Button(new XPATH('//input[contains(@id,"AuthorityId")]/ancestor::span/following-sibling::span'), 'document issued by dropdown button');
        this.#addressTextbox = new Textbox(new XPATH('//input[@id="form_item_address"]'), 'address textbox');
        this.#emailTextbox = new Textbox(new XPATH('//input[@id="form_item_email"]'), 'email textbox');
        this.#phoneNumberTextbox = new Textbox(new XPATH('//input[@placeholder="+7 ### ### ## ##"]'), 'phone number textbox');
        this.#nextButton = new Button(new XPATH('//div/button[contains(@class,"ant-btn-primary")]'), 'next button');
        this.#editQuoteButton = new Button(new XPATH('//td[@class="ant-table-cell"]/child::a'), 'edit quote button');
    }
    clickCreateButton() {
        this.#quoteCreateButton.clickElement();
    }

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
        return this.#dateOfBirthTextbox.getElement();
    }

    getSexText() {
        return this.#sexRadioButton.getText();
    }

    getDocumentTypeText() {
        this.#documentTypeDropdown.scrollElementToView();
        return this.#documentTypeDropdown.getText();
    }

    getDocumentNumberElement() {
        return this.#documentNumberTextbox.getElement();
    }

    getDocumentIssuedDateElement() {
        return this.#documentIssuedDateTextbox.getElement();
    }

    getOrSetDocumentIssuedByElement(holderDocumentGivedByQuote) { //МЮ РК
        return this.#documentIssuedByDropdown.getText().then((value) => { // Министертво
            if (value === holderDocumentGivedByQuote) {
                return cy.wrap(value);
            }
            this.#documentIssuedByDropdown.clickElement();
            new Button(new XPATH(`//div[@class='ant-select-item-option-content' and text()='${holderDocumentGivedByQuote}']`), 'document issued by dropdown element').clickElement();
            return this.getOrSetDocumentIssuedByElement(holderDocumentGivedByQuote);
        });
    }

    getOrSetAddressElement(address) {
        if (this.#addressTextbox.getText !== address) {
            this.#addressTextbox.clearData();
            this.#addressTextbox.inputData(address);
        }

        return this.#addressTextbox.getElement();
    }

    getOrSetEmailElement(email) {
        if (this.#emailTextbox.getText !== email) {
            this.#emailTextbox.clearData();
            this.#emailTextbox.inputData(email);
        }

        return this.#emailTextbox.getElement();
    }

    inputPhoneNumber(phoneNumber) {
        this.#phoneNumberTextbox.clearData();
        this.#phoneNumberTextbox.inputData(phoneNumber);
    }

    clickNextButton() {
        this.#nextButton.scrollElementToView();
        this.#nextButton.clickElement();
    }

    clickEditQuoteButton() {
        this.#editQuoteButton.clickElement();
    }

    checkValueFromIINTextbox() {
        return this.#iinTextbox.getValue();
    }

    checkValueFromLastNameTextbox() {
        return this.#lastNameTextbox.getValue();
    }

    checkValueFromFirstNameTextbox() {
        return this.#firstNameTextbox.getValue();
    }

    checkValueFromMiddleNameTextbox() {
        return this.#middleNameTextbox.getValue();
    }

    checkValueFromDateOfBirthTextbox() {
        return this.#dateOfBirthTextbox.getValue();
    }

    checkValueFromSexRadiobutton() {
        return this.#sexRadioButton.getText();
    }

    checkValueFromDocumentTypeDropdownButton() {
        return this.#documentTypeDropdown.getText();
    }

    checkValueFromDocumentNumber () {
        return this.#documentNumberTextbox.getValue();
    }

    checkValueFromDocumentIssuedDate () {
        return this.#documentIssuedDateTextbox.getValue();
    }

    checkValueFromDocumentIssuedByDropdownButton() {
        return this.#documentIssuedByDropdown.getText();
    }

    checkValueFromAddressTextbox() {
        return this.#addressTextbox.getValue();
    }

    checkValueFromEmailTextbox() {
        return this.#emailTextbox.getValue();
    }

    checkValueFromPhoneNumberTextbox() {
        return this.#phoneNumberTextbox.getValue();
    }
}

module.exports = new QuoteStep1();
