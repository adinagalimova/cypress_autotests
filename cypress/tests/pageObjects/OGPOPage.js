const moment = require('moment');
const BaseForm = require('../../main/baseForm');
const JSONLoader = require("../../main/utils/data/JSONLoader");
const Randomizer = require("../../main/utils/random/randomizer");
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const Label = require('../../main/elements/baseElementChildren/label');

class OGPOPage extends BaseForm {
    #IINTextbox;
    #firstNameTextbox;
    #lastNameTextbox;
    #middleNameTextbox;
    #bornDateTextbox;
    #sexDropdownButton;
    #documentTypeDropdownButton;
    #documentNumberTextbox;
    #documentGivedDateTextbox;
    #addressTextbox;
    #emailTextbox;
    #phoneTextbox;
    #insuredSwitch;
    #saveButton;
    #nextButton;
    #searchClientButton;
    #searchVehicleButton;
    #searchVehicleByVINButton;
    #regNumTextbox;
    #regCertNumTextbox;
    #driverLicenceTypeDropdownButton;
    #driverLicenceNumberTextbox;
    #driverLicenceIssueDateTextbox;
    #carRegDateTextbox;
    #carRegionDropdownButton;
    #carRegionDropdownElement;
    #carVINTextbox;
    #carTypeDropdownButton;
    #carManufacturedYearDropdownButton;
    #carEngineVolumeTextbox;
    #carMarkTextbox;
    #carModelTextbox;
    #periodDropdownButton;
    #beginDateCalendarButton;
    #endDateCalendarButton;
    #calendarRightArrowButton;
    #beginDateButton;
    #calculatePremiumButton;
    #holderLabel;
    #listOfInsuredPeopleLabel;
    #listOfCarsLabel;
    #insurancePeriodBeforeIssuingLabel;
    #insurancePeriodAfterIssuingLabel;
    #issuePolicyButton;
    #statusLabel;
    #creationDateLabel;
    #sumToPayLabel;
    #paymentCodeLabel;

    constructor(beginDate) {
        super(new XPATH('//a[@href="/ogpo"]'), 'OGPO page');
        this.#beginDateButton = new Button(new XPATH(`//td[@title="${beginDate}"]`), 'begin date');
        this.#IINTextbox = new Textbox(new XPATH('//input[@id="form_item_iin"]'), 'IIN');
        this.#firstNameTextbox = new Textbox(new XPATH('//input[@id="form_item_first_name"]'), 'first name');
        this.#lastNameTextbox = new Textbox(new XPATH('//input[@id="form_item_last_name"]'), 'last name');
        this.#middleNameTextbox = new Textbox(new XPATH('//input[@id="form_item_middle_name"]'), 'middle name');
        this.#bornDateTextbox = new Textbox(new XPATH('//input[@id="form_item_born"]'), 'born date');
        this.#sexDropdownButton = new Button(new XPATH('//input[@id="form_item_sex_id"]/following::span[@class="ant-select-selection-item"]'), 'sex dropdown button');
        this.#documentTypeDropdownButton = new Button(new XPATH('//input[@id="form_item_document_type_id"]/following::span[@class="ant-select-selection-item"]'), 'document type dropdown button');
        this.#documentNumberTextbox = new Textbox(new XPATH('//input[@id="form_item_document_number"]'), 'document number');
        this.#documentGivedDateTextbox = new Textbox(new XPATH('//input[@id="form_item_document_gived_date"]'), 'document gived date');
        this.#addressTextbox = new Textbox(new XPATH('//input[@id="form_item_address"]'), 'address');
        this.#emailTextbox = new Textbox(new XPATH('//input[@id="form_item_email"]'), 'email');
        this.#phoneTextbox = new Textbox(new XPATH('//input[@id="form_item_mobile_phone"]'), 'phone');
        this.#insuredSwitch = new Button(new XPATH('//button[@id="form_item_holder_is_insured"]'), 'insured switch (button)');
        this.#saveButton = new Button(new XPATH('//span[text()="Сохранить"]'), 'save button');
        this.#nextButton = new Button(new XPATH('//span[text()="Далее"]//parent::button'), 'next button');
        this.#searchClientButton = new Button(new XPATH('//span[text()="Поиск"]'), 'search client button');
        this.#regNumTextbox = new Textbox(new XPATH('//input[@id="form_item_reg_num"]'), 'reg num');
        this.#regCertNumTextbox = new Textbox(new XPATH('//input[@id="form_item_reg_cert_num"]'), 'reg cert num');
        this.#searchVehicleButton = new Button(new XPATH('//label[@for="form_item_vin"]/preceding::span[text()="Найти"]/parent::button'), 'search vehicle button');
        this.#searchVehicleByVINButton = new Button(new XPATH('//label[@for="form_item_vin"]/following::span[text()="Найти"]/parent::button'), 'search vehicle by VIN button');
        this.#driverLicenceTypeDropdownButton = new Button(new XPATH('//input[@id="form_item_driver_certificate_type_id"]/following::span[@class="ant-select-selection-item"]'), 'driver licence type dropdown button');
        this.#driverLicenceNumberTextbox = new Textbox(new XPATH('//input[@id="form_item_driver_certificate"]'), 'driver licence number');
        this.#driverLicenceIssueDateTextbox = new Textbox(new XPATH('//input[@id="form_item_driver_certificate_date"]'), 'driver licence issue date');
        this.#carRegDateTextbox = new Textbox(new XPATH('//input[@id="form_item_dt_reg_cert"]'), 'car reg date');
        this.#carRegionDropdownButton = new Button(new XPATH('//input[@id="form_item_region_id"]/following::span[@class="ant-select-selection-item"]'), 'car region dropdown button');
        this.#carRegionDropdownElement = new Button(new XPATH(`//div[@class="ant-select-item-option-content" and text()="${JSONLoader.testData.carRegion}"]`), 'car region dropdown element');
        this.#carVINTextbox = new Textbox(new XPATH('//input[@id="form_item_vin"]'), 'car VIN');
        this.#carTypeDropdownButton = new Button(new XPATH('//input[@id="form_item_type_id"]/following::span[@class="ant-select-selection-item"]'), 'car type dropdown button');
        this.#carManufacturedYearDropdownButton = new Textbox(new XPATH('//input[@id="form_item_year"]/following::span[@class="ant-select-selection-item"]'), 'car manufactured year dropdown button');
        this.#carEngineVolumeTextbox = new Textbox(new XPATH('//input[@id="form_item_engine_volume"]'), 'engine volume');
        this.#carMarkTextbox = new Textbox(new XPATH('//input[@id="form_item_mark"]'), 'car mark');
        this.#carModelTextbox = new Textbox(new XPATH('//input[@id="form_item_model"]'), 'car model');
        this.#periodDropdownButton = new Button(new XPATH('//input[@id="form_item_period"]//following::span[@class="ant-select-selection-item"]'), 'period dropdown button');
        this.#beginDateCalendarButton = new Button(new XPATH('//input[@id="form_item_date_beg"]'), 'begin date calendar button');
        this.#endDateCalendarButton = new Button(new XPATH('//input[@id="form_item_date_end"]'), 'end date calendar button');
        this.#calendarRightArrowButton = new Button(new XPATH('//button[contains(@class, "ant-picker-header-next-btn")]'), 'right calendar arrow button');
        this.#calculatePremiumButton = new Button(new XPATH('//span[text()="Рассчитать премию"]//ancestor::button[@type="submit"]'), 'calculate premium button');
        this.#holderLabel = new Label(new XPATH('//label[@title="Страхователь"]/following::div[@class="ant-form-item-control-input-content"]/span'), 'holder label');
        this.#listOfInsuredPeopleLabel = new Label(new XPATH('//label[@title="Список застрахованных"]/following::div[@class="w-fit"]/div'), 'list of insured people label');
        this.#listOfCarsLabel = new Label(new XPATH('//label[@title="Список ТС"]/following::div[@class="w-fit"]/div'), 'list of insured cars label');
        this.#insurancePeriodBeforeIssuingLabel = new Label(new XPATH('//label[@title="Период страхования"]/following::span[@class="ant-form-text"]'), 'insurance period before issuing label');
        this.#sumToPayLabel = new Label(new XPATH('//label[@title="Страховая премия"]//parent::div[contains(@class, "ant-col")]/parent::div[contains(@class, "ant-row")]/descendant::span[@class="ant-form-text"]'), 'sum to pay label');
        this.#issuePolicyButton = new Button(new XPATH('//button[contains(@class,"ant-btn-primary")]'), 'issue policy button');
        this.#statusLabel = new Label(new XPATH('//label[@title="Статус"]//parent::div[contains(@class, "ant-col")]/parent::div[contains(@class, "ant-row")]/descendant::span[@class="font-bold"]'), 'status label');
        this.#creationDateLabel = new Label(new XPATH('//label[@title="Дата создания"]//parent::div[contains(@class, "ant-col")]/parent::div[contains(@class, "ant-row")]/descendant::span[@class="font-bold"]'), 'creation date label');
        this.#insurancePeriodAfterIssuingLabel = new Label(new XPATH('//label[@title="Период страхования"]/following::span[@class="font-bold"]'), 'insurance period after issuing label');
        this.#paymentCodeLabel = new Label(new XPATH('//strong[text()="Код для оплаты через Kaspi: "]//following::code//child::span'), 'payment code label');
    }

    getSlicedCreationDate() {
        return this.#creationDateLabel.getText().then((text) => text.slice(0, 10));
    }

    clickIssuePolicyButton() {
        this.#issuePolicyButton.clickElement();
    }

    getStatusText() {
        return this.#statusLabel.getText();
    }

    getHolderText() {
        return this.#holderLabel.getText();
    }

    getListOfInsuredPeopleText() {
        return this.#listOfInsuredPeopleLabel.getText();
    }

    getListOfCarsText() {
        return this.#listOfCarsLabel.getText();
    }

    getInsurancePeriodBeforeIssuingText() {
        return this.#insurancePeriodBeforeIssuingLabel.getText();
    }

    getInsurancePeriodAfterIssuingText() {
        return this.#insurancePeriodAfterIssuingLabel.getText();
    }

    clickCalculatePremiumButton() {
        this.#calculatePremiumButton.clickElement();
    }

    getNextButtonElement() {
        return this.#nextButton.getElement();
    }

    getSumToPay() {
        return this.#sumToPayLabel.getText().then((text) => text.slice(0, -3));
    }

    getPaymentCodeText() {
        return this.#paymentCodeLabel.getText().then((code) => code);
    }

    inputRandomBeginDate() {
        const dates = Randomizer.getRandomDatesIntervalFromTomorrow(...JSONLoader.testData.timeIncrement);
        const newInstance = new OGPOPage(dates.startDate, dates.finishDate);
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

    inputIIN() {
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

    getBornDateElement() {
        return this.#bornDateTextbox.getElement();
    }

    getSexText() {
        return this.#sexDropdownButton.getText();
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

    inputAddress() {
        this.#addressTextbox.scrollElementToView();
        this.#addressTextbox.clearData();
        this.#addressTextbox.inputData(JSONLoader.testData.clientAddress);
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

    getDriverLicenceTypeText() {
        return this.#driverLicenceTypeDropdownButton.getText();
    }

    getDriverLicenceNumberElement() {
        return this.#driverLicenceNumberTextbox.getElement();
    }

    getDriverLicenceIssueDateElement() {
        return this.#driverLicenceIssueDateTextbox.getElement();
    }

    inputVehicleData() {
        if (JSONLoader.configData.verification) {
            this.#regNumTextbox.inputData(JSONLoader.testData.carNumber);
            this.#regCertNumTextbox.inputData(JSONLoader.testData.carRegistration);
        } else {
            this.#carVINTextbox.inputData(JSONLoader.testData.carVIN);
        }
    }

    inputVehicleDataWithDisabledVerification() {
        if (!JSONLoader.configData.verification) {
            this.#regNumTextbox.inputData(JSONLoader.testData.carNumber);
            this.#regCertNumTextbox.inputData(JSONLoader.testData.carRegistration);
            this.#carRegDateTextbox.inputData(JSONLoader.testData.carRegDate);
            this.#carRegionDropdownButton.clickElement();
            this.#carRegionDropdownElement.clickElement();
        }
    }

    clickSearchVehicleButton() {
        if (JSONLoader.configData.verification) {
            this.#searchVehicleButton.clickElement();
        } else {
            this.#searchVehicleByVINButton.clickElement();
        }
    }

    getCarRegDateElement() {
        return this.#carRegDateTextbox.getElement();
    }

    getCarRegionText() {
        return this.#carRegionDropdownButton.getText();
    }

    getCarVINElement() {
        return this.#carVINTextbox.getElement();
    }

    getCarTypeText() {
        return this.#carTypeDropdownButton.getText();
    }

    getCarManufacturedYearText() {
        return this.#carManufacturedYearDropdownButton.getText();
    }

    getCarEngineVolumeElement() {
        return this.#carEngineVolumeTextbox.getElement();
    }

    getCarMarkElement() {
        return this.#carMarkTextbox.getElement();
    }

    getCarModelElement() {
        return this.#carModelTextbox.getElement();
    }

    getPeriodText() {
        return this.#periodDropdownButton.getText();
    }
}

module.exports = new OGPOPage();