const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const Button = require('../../main/elements/baseElementChildren/button');
const JSONLoader = require("../../main/utils/data/JSONLoader");
const Randomizer = require("../../main/utils/random/randomizer");
const moment = require('moment');
require('cypress-xpath');

class ShanyrakPage extends BaseForm {
    #withoutAgentCheckbox;
    #IINTextbox;
    #firstNameTextbox;
    #lastNameTextbox;
    #middleNameTextbox;
    #documentTypeSpan;
    #documentNumberTextbox;
    #documentIssueDateTextbox;
    #addressTextbox;
    #emailTextbox;
    #phoneTextbox;
    #juridicalAddressTextbox;
    #isPDLSwitch;
    #saveButton;
    #searchClientButton;
    #isPensionerSwitch;
    #regionSpan;
    #regionListElement;
    #periodSpan;
    #beginDateCalendarSpan;
    #endDateCalendarSpan;
    #calendarRightArrowButton;
    #activeUseSwitch;
    #withoutAccidentsSwitch;
    #beginDateButton;
    #holderTextbox;
    #listOfInsuredPeopleTextbox;
    #listOfCarsTextbox;
    #insurancePeriodTextbox;
    #issuePolicyButton;
    #statusTextbox;
    #creationDateTextbox;
    #sumToPayTextbox;
    #paymentCodeTextbox;
    #paymentTypeSwitch;
    #issueButton;

    constructor(beginDate) {
        super(new XPATH('//a[@href="/shanyrak"]'), 'shanyrak page');
        this.#beginDateButton = new Button(new XPATH(`//td[@title="${beginDate}"]`), 'begin date');

        this.#withoutAgentCheckbox = new Button(new XPATH('//input[@id="form_item_withoutAgentCheck"]'), 'without agent checkbox');
        this.#IINTextbox = new Textbox(new XPATH('//input[@id="form_item_iin"]'), 'IIN textbox');
        this.#searchClientButton = new Button(new XPATH('//span[text()="Поиск"]'), 'search client button');
        this.#firstNameTextbox = new Textbox(new XPATH('//input[@id="form_item_first_name"]'), 'first name textbox');
        this.#lastNameTextbox = new Textbox(new XPATH('//input[@id="form_item_last_name"]'), 'last name textbox');
        this.#middleNameTextbox = new Textbox(new XPATH('//input[@id="form_item_middle_name"]'), 'middle name textbox');
        this.#documentTypeSpan = new Textbox(new XPATH('//input[@id="form_item_document_type_id"]/following::span[1]'), 'document type span');
        this.#documentNumberTextbox = new Textbox(new XPATH('//input[@id="form_item_document_number"]'), 'document number textbox');
        this.#documentIssueDateTextbox = new Textbox(new XPATH('//input[@id="form_item_document_gived_date"]'), 'document issue date textbox');
        this.#phoneTextbox = new Textbox(new XPATH('//input[@id="form_item_phone"]'), 'phone textbox');
        this.#emailTextbox = new Textbox(new XPATH('//input[@id="form_item_email"]'), 'email textbox');
        this.#juridicalAddressTextbox = new Textbox(new XPATH('//input[@id="form_item_juridical_address"]'), 'juridical address textbox');
        this.#isPDLSwitch = new Button(new XPATH('//button[@id="form_item_pdl"]'), 'is PDL switch (button)');

        this.#regionSpan = new Textbox(new XPATH('//input[@id="form_item_region_id"]/following::span[1]'), 'region span');
        this.#regionListElement = new Button(new XPATH(`//div[@class="ant-select-item-option-content" and text()="${JSONLoader.testData.carRegion}"]`), 'region list element');
        this.#addressTextbox = new Textbox(new XPATH('//input[@id="form_item_address"]'), 'address textbox');
        this.#beginDateCalendarSpan = new Button(new XPATH('//input[@placeholder="Дата начала"]'), 'begin date calendar button');
        this.#endDateCalendarSpan = new Button(new XPATH('//input[@placeholder="Дата окончания"]'), 'end date calendar button');
        this.#calendarRightArrowButton = new Button(new XPATH('//button[contains(@class, "ant-picker-header-next-btn")]'), 'right calendar arrow button');
        this.#activeUseSwitch = new Button(new XPATH('//button[@id="form_item_active_use"]'), 'active use switch (button)');
        this.#withoutAccidentsSwitch = new Button(new XPATH('//button[@id="form_item_without_accidents"]'), 'without accidents switch (button)');

        this.#isPensionerSwitch = new Button(new XPATH('//button[@id="form_item_pensioner_bool"]'), 'is pensioner switch (button)');
        this.#periodSpan = new Textbox(new XPATH('//input[@id="form_item_period"]/following::span[1]'), 'period span');

        this.#sumToPayTextbox = new Textbox(new XPATH('//label[text()="Страховая премия"]//following::span[1]'), 'sum to pay textbox');
        this.#paymentCodeTextbox = new Textbox(new XPATH('//strong[text()="Код для оплаты через Kaspi: "]//following::code[1]/child::span'), 'payment code textbox');

        this.#paymentTypeSwitch = new Button(new XPATH('//button[@id="form_item_payment_type"]'), 'payment type switch (button)');
        this.#saveButton = new Button(new XPATH('//span[text()="Сохранить"]'), 'save button');
        this.#issueButton = new Button(new XPATH('//span[contains(text(), "Выписать полис")]'), 'issue button');

        this.#premiumTextbox = new Textbox(new XPATH('//strong[text()="Код для оплаты через Kaspi: "]//following::code[1]/child::span'), 'payment code textbox');
    }

    getSlicedCreationDate() {
        return this.#creationDateTextbox.getText().then((text) => {
            return text.slice(0, 10);
        });
    }

    clickIssuePolicyButton() {
        this.#issuePolicyButton.clickElement();
    }

    getStatusText() {
        return this.#statusTextbox.getText();
    }

    getHolderText() {
        return this.#holderTextbox.getText();
    }

    getListOfInsuredPeopleText() {
        return this.#listOfInsuredPeopleTextbox.getText();
    }

    getListOfCarsText() {
        return this.#listOfCarsTextbox.getText();
    }

    getInsurancePeriodTextInPromise() {
        return this.#insurancePeriodTextbox.getText().then((text) => cy.wrap(text));
    }

    getSumToPay() {
        return this.#sumToPayTextbox.getText().then((text) => text.slice(0, -1).replace(/ тг| /g, ''));
    }

    getPaymentCodeText() {
        return this.#paymentCodeTextbox.getText().then((code) => code);
    }

    inputRandomDates() {
        const dates = Randomizer.getRandomDatesIntervalFromTomorrow(...JSONLoader.testData.timeIncrement);
        const newInstance = new OGPOPage(dates.startDate, dates.finishDate);
        this.#beginDateCalendarSpan.flipCalendarIfNotContainsDate(this.#calendarRightArrowButton, dates.startMonthDifference);
        newInstance.#beginDateButton.clickElement();
    }

    calculateEndDate() {
        return this.getBeginDateTitle().then((value) => {
            const endDate = moment(value, JSONLoader.testData.datesFormatFrontEnd).
            add(1, "year").subtract(1, "day").format(JSONLoader.testData.datesFormatFrontEnd);
            return cy.wrap(endDate);
        });
    }

    getBeginDateTitle() {
        return this.#beginDateCalendarSpan.getAttributeValue('title');
    }

    getEndDateTitle() {
        return this.#endDateCalendarSpan.getAttributeValue('title');
    }

    fillIIN() {
        this.#IINTextbox.inputData(JSONLoader.testData.clientIIN);
    }

    getFirstNameElement() {
        return this.#firstNameTextbox.getElement();
    }

    getLastNameElement() {
        return this.#lastNameTextbox.getElement();
    }

    getOrSetMiddleNameElement() {
        if (this.#middleNameTextbox.getText !== JSONLoader.testData.clientMiddleName) {
            this.#middleNameTextbox.clearData();
            this.#middleNameTextbox.inputData(JSONLoader.testData.clientMiddleName);
        }
        return this.#middleNameTextbox.getElement();
    }

    getDocumentTypeText() {
        return this.#documentTypeSpan.getText();
    }

    getDocumentNumberElement() {
        return this.#documentNumberTextbox.getElement();
    }

    getDocumentIssueDateElement() {
        return this.#documentIssueDateTextbox.getElement();
    }

    fillAddressTextbox() {
        this.#addressTextbox.scrollElementToView();
        this.#addressTextbox.clearData();
        return this.#addressTextbox.inputData(JSONLoader.testData.clientAddress);
    }

    fillEmailTextbox() {
        this.#emailTextbox.scrollElementToView();
        this.#emailTextbox.clearData();
        return this.#emailTextbox.inputData(JSONLoader.testData.clientEmail);
    }

    fillPhoneTextbox() {
        this.#phoneTextbox.scrollElementToView();
        this.#phoneTextbox.clearData();
        return this.#phoneTextbox.inputData(JSONLoader.testData.clientPhone);
    }

    clickSaveButton() {
        this.#saveButton.scrollElementToView();
        this.#saveButton.clickElement();
    }

    clickSearchClientButton() {
        this.#searchClientButton.clickElement();
    }

    getCarRegionText() {
        return this.#regionSpan.getText();
    }

    getPeriodText() {
        return this.#periodSpan.getText();
    }

    getAddressElement() {
        return this.#addressTextbox.getElement();
    }

    getEmailElement() {
        return this.#emailTextbox.getElement();
    }

    getMobilePhoneElement() {
        return this.#phoneTextbox.getElement();
    }

    clickIsInsuredSwitch() {
        this.#isInsuredSwitch.scrollElementToView();
        return this.#isInsuredSwitch.click();
    }

    clickIsPDLSwitch() {
        this.#isPDLSwitch.scrollElementToView();
        return this.#isPDLSwitch.click();
    }

    chooseRegion() {
        this.#regionSpan.clickElement();
        this.#regionListElement.clickElement();
    }
}

module.exports = new ShanyrakPage();