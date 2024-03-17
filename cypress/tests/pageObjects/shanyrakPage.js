const moment = require('moment');
const BaseForm = require('../../main/baseForm');
const JSONLoader = require("../../main/utils/data/JSONLoader");
const Randomizer = require("../../main/utils/random/randomizer");
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');

class ShanyrakPage extends BaseForm {
    #withoutAgentCheckbox;
    #IINTextbox;
    #firstNameTextbox;
    #lastNameTextbox;
    #middleNameTextbox;
    #documentTypeDropdownButton;
    #documentNumberTextbox;
    #documentGivedDateTextbox;
    #addressTextbox;
    #emailTextbox;
    #phoneTextbox;
    #juridicalAddressTextbox;
    #PDLSwitch;
    #saveButton;
    #searchClientButton;
    #regionDropdownButton;
    #regionLabel;
    #regionDropdownElement;
    #periodSpan;
    #beginDateCalendarButton;
    #endDateCalendarButton
    #listOfInsuredPeopleTextbox;
    #listOfCarsTextbox;
    #insurancePeriodTextbox;
    #statusTextbox;
    #creationDateTextbox;
    #activeUseSwitch;
    #withoutAccidentsSwitch;
    #paymentCodeTextbox;
    #paymentTypeSwitch;
    #issuePolicyButton;
    #declineSendKaspiPaymentButton;
    #alert;

    constructor(beginDate) {
        super(new XPATH('//a[@href="/shanyrak"]'), 'Shanyrak page');
        this.#beginDateButton = new Button(new XPATH(`//td[@title="${beginDate}"]`), 'begin date');
        this.#withoutAgentCheckbox = new Button(new XPATH('//input[@id="form_item_withoutAgentCheck"]'), 'without agent checkbox');
        this.#IINTextbox = new Textbox(new XPATH('//input[@id="form_item_iin"]'), 'IIN');
        this.#searchClientButton = new Button(new XPATH('//span[text()="Поиск"]'), 'search client button');
        this.#firstNameTextbox = new Textbox(new XPATH('//input[@id="form_item_first_name"]'), 'first name');
        this.#lastNameTextbox = new Textbox(new XPATH('//input[@id="form_item_last_name"]'), 'last name');
        this.#middleNameTextbox = new Textbox(new XPATH('//input[@id="form_item_middle_name"]'), 'middle name');
        this.#documentTypeDropdownButton = new Button(new XPATH('//input[@id="form_item_document_type_id"]//following::span[1]'), 'document type dropdown button');
        this.#documentNumberTextbox = new Textbox(new XPATH('//input[@id="form_item_document_number"]'), 'document number');
        this.#documentGivedDateTextbox = new Textbox(new XPATH('//input[@id="form_item_document_gived_date"]'), 'document gived date');
        this.#phoneTextbox = new Textbox(new XPATH('//input[@id="form_item_phone"]'), 'phone');
        this.#emailTextbox = new Textbox(new XPATH('//input[@id="form_item_email"]'), 'email');
        this.#juridicalAddressTextbox = new Textbox(new XPATH('//input[@id="form_item_juridical_address"]'), 'juridical address');
        this.#PDLSwitch = new Button(new XPATH('//button[@id="form_item_pdl"]'), 'PDL switch (button)');
        this.#regionDropdownButton = new Button(new XPATH('//input[@id="form_item_region_id"]'), 'region dropdown button');
        this.#regionLabel = new Label(new XPATH('//input[@id="form_item_region_id"]//following::span[1]'), 'region label');
        this.#regionDropdownElement = new Button(new XPATH(`//div[@class="ant-select-item-option-content" and text()="${JSONLoader.testData.carRegion}"]`), 'region dropdown element');
        this.#addressTextbox = new Textbox(new XPATH('//input[@id="form_item_address"]'), 'address');
        this.#beginDateCalendarButton = new Button(new XPATH('//input[@placeholder="Дата начала"]'), 'begin date calendar button');
        this.#endDateCalendarButton = new Button(new XPATH('//input[@placeholder="Дата окончания"]'), 'end date calendar button');
        this.#calendarRightArrowButton = new Button(new XPATH('//button[contains(@class, "ant-picker-header-next-btn")]'), 'right calendar arrow button');
        this.#activeUseSwitch = new Button(new XPATH('//button[@id="form_item_active_use"]'), 'active use switch (button)');
        this.#withoutAccidentsSwitch = new Button(new XPATH('//button[@id="form_item_without_accidents"]'), 'without accidents switch (button)');
        this.#paymentTypeSwitch = new Button(new XPATH('//button[@id="form_item_payment_type"]'), 'payment type switch (button)');
        this.#saveButton = new Button(new XPATH('//span[text()="Сохранить"]'), 'save button');
        this.#alert = new Label(new XPATH('//div[contains(@class, "ant-message-success")]/span[2]'), 'alert');
        this.#issuePolicyButton = new Button(new XPATH('//span[contains(text(), "Выписать полис")]'), 'issue policy button');
        this.#paymentCodeTextbox = new Textbox(new XPATH('//strong[text()="Код для оплаты через Kaspi: "]//following::code[1]'), 'payment code');
        this.#declineSendKaspiPaymentButton = new Button(new XPATH('//span[text()="Нет"]//ancestor::button'), 'decline send kaspi payment button');
    }

    inputIIN() {
        this.#IINTextbox.inputData(JSONLoader.testData.clientIIN);
    }

    clickActiveUseSwitch() {
        this.#activeUseSwitch.clickElement();
    }

    clickWithoutAccidentsSwitch() {
        this.#withoutAccidentsSwitch.clickElement();
    }

    clickDeclineSendKaspiPaymentButton() {
        this.#declineSendKaspiPaymentButton.clickElement();
    }

    getAlertElement() {
        return this.#alert.getElement();
    }

    clickIssuePolicyButton() {
        this.#issuePolicyButton.scrollElementToView();
        this.#issuePolicyButton.clickElement();
    }

    getPaymentCodeText() {
        return this.#paymentCodeTextbox.getText().then((code) => code);
    }

    inputRandomBeginDate() {
        const dates = Randomizer.getRandomDatesIntervalFromTomorrow(...JSONLoader.testData.timeIncrement);
        const newInstance = new ShanyrakPage(dates.startDate, dates.finishDate);
        this.#beginDateCalendarButton.flipCalendarMonth(this.#calendarRightArrowButton, dates.startMonthDifference);
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
        return this.#beginDateCalendarButton.getAttributeValue('title');
    }

    getEndDateTitle() {
        return this.#endDateCalendarButton.getAttributeValue('title');
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
        return this.#documentTypeDropdownButton.getText();
    }

    getDocumentNumberElement() {
        return this.#documentNumberTextbox.getElement();
    }

    getDocumentGivedDateElement() {
        return this.#documentGivedDateTextbox.getElement();
    }

    inputJuridicalAddress() {
        this.#juridicalAddressTextbox.scrollElementToView();
        this.#juridicalAddressTextbox.clearData();
        this.#juridicalAddressTextbox.inputData(JSONLoader.testData.clientAddress);
    }

    inputEmail() {
        this.#emailTextbox.scrollElementToView();
        this.#emailTextbox.clearData();
        this.#emailTextbox.inputData(JSONLoader.testData.clientEmail);
    }

    inputPhone() {
        this.#phoneTextbox.scrollElementToView();
        this.#phoneTextbox.clearData();
        this.#phoneTextbox.inputData(JSONLoader.testData.clientPhone);
    }

    clickSearchClientButton() {
        this.#searchClientButton.clickElement();
    }

    getRegionText() {
        return this.#regionLabel.getText();
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

    clickPDLSwitch() {
        this.#PDLSwitch.scrollElementToView();
        this.#PDLSwitch.clickElement();
    }

    chooseRegion() {
        this.#regionDropdownButton.clickElement();
        this.#regionDropdownElement.clickElement();
    }

    inputAddress() {
        this.#addressTextbox.scrollElementToView();
        this.#addressTextbox.clearData();
        this.#addressTextbox.inputData(JSONLoader.testData.clientAddress);
    }

    clickSaveButton() {
        this.#saveButton.scrollElementToView();
        this.#saveButton.clickElement();
    }
}

module.exports = new ShanyrakPage();