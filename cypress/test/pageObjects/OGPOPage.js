const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../main/elements/baseElementChildren/label');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const Button = require('../../main/elements/baseElementChildren/button');
const JSONLoader = require("../../main/utils/data/JSONLoader");

class OGPOPage extends BaseForm {
    #purchaseButton;
    #isJuridicalSwitch;
    #isIPSwitch;
    #isResidentSwitch;
    #IINTextbox;
    #firstNameTextbox;
    #lastNameTextbox;
    #middleNameTextbox;
    #bornDateTextbox;
    #sexSpan;
    #documentTypeSpan;
    #documentNumberTextbox;
    #documentIssueDateTextbox;
    #addressTextbox;
    #emailTextbox;
    #phoneTextbox;
    #isInsuredSwitch;
    #isPDLSwitch;
    #saveButton;
    #nextButton;
    #searchClientButton;
    #searchVehicleButton;
    #regNumTextbox;
    #regCertNumTextbox;
    #driverLicenceTypeSpan;
    #driverLicenceNumberTextbox;
    #driverLicenceIssueDateTextbox;
    #isExperienceLessThan2YearsSwitch;
    #isPensionerSwitch;
    #carRegDateTextbox;
    #carRegionSpan;
    #carVINTextbox;
    #carTypeSpan;
    #carManufacturedYearSpan;
    #carEngineVolumeTextbox;
    #carMarkTextbox;
    #carModelTextbox;

    constructor() {
        super(new XPATH('//a[@href="/ogpo"]'), 'OGPO page');

        this.#purchaseButton = new Label(new XPATH('//a[contains(text(), "Оформить")]'), 'purchase button');
        this.#isJuridicalSwitch = new Button(new XPATH('//label[text()=\'Юр. лицо\']/following::button[1]'), 'is juridical switch (button)');
        this.#isIPSwitch = new Button(new XPATH('//label[text()=\'ИП\']/following::button[1]'), 'is IP switch (button)');
        this.#isResidentSwitch = new Button(new XPATH('//label[text()=\'Резидент\']/following::button[1]'), 'is resident switch (button)');
        this.#IINTextbox = new Textbox(new XPATH('//input[@id="form_item_iin"]'), 'IIN textbox');
        this.#firstNameTextbox = new Textbox(new XPATH('//input[@id="form_item_first_name"]'), 'first name textbox');
        this.#lastNameTextbox = new Textbox(new XPATH('//input[@id="form_item_last_name"]'), 'last name textbox');
        this.#middleNameTextbox = new Textbox(new XPATH('//input[@id="form_item_middle_name"]'), 'middle name textbox');
        this.#bornDateTextbox = new Textbox(new XPATH('//input[@id="form_item_born"]'), 'born date textbox');
        this.#sexSpan = new Textbox(new XPATH('//input[@id="form_item_sex_id"]/following::span[1]'), 'sex span');
        this.#documentTypeSpan = new Textbox(new XPATH('//input[@id="form_item_document_type_id"]/following::span[1]'), 'document type span');
        this.#documentNumberTextbox = new Textbox(new XPATH('//input[@id="form_item_document_number"]'), 'document number textbox');
        this.#documentIssueDateTextbox = new Textbox(new XPATH('//input[@id="form_item_document_gived_date"]'), 'document issue date textbox');
        this.#addressTextbox = new Textbox(new XPATH('//input[@id="form_item_address"]'), 'address textbox');
        this.#emailTextbox = new Textbox(new XPATH('//input[@id="form_item_email"]'), 'email textbox');
        this.#phoneTextbox = new Textbox(new XPATH('//input[@id="form_item_mobile_phone"]'), 'phone textbox');
        this.#isInsuredSwitch = new Button(new XPATH('//button[@id="form_item_holder_is_insured"]'), 'is insured switch (button)');
        this.#isPDLSwitch = new Button(new XPATH('//button[@id="form_item_pdl"]'), 'is PDL switch (button)');
        this.#saveButton = new Button(new XPATH('//span[text()="Сохранить"]'), 'save button');
        this.#nextButton = new Button(new XPATH('//span[text()="Далее"]'), 'next button');
        this.#searchClientButton = new Button(new XPATH('//span[text()="Поиск"]'), 'search client button');
        this.#regNumTextbox = new Textbox(new XPATH('//input[@id="form_item_reg_num"]'), 'reg num textbox');
        this.#regCertNumTextbox = new Textbox(new XPATH('//input[@id="form_item_reg_cert_num"]'), 'reg cert num textbox');
        this.#searchVehicleButton = new Button(new XPATH('//span[text()="Найти"][1]'), 'search vehicle button');
        this.#driverLicenceTypeSpan = new Textbox(new XPATH('//input[@id="form_item_driver_certificate_type_id"]/following::span[1]'), 'driver licence type span');
        this.#driverLicenceNumberTextbox = new Textbox(new XPATH('//input[@id="form_item_driver_certificate"]'), 'driver licence number textbox');
        this.#driverLicenceIssueDateTextbox = new Textbox(new XPATH('//input[@id="form_item_driver_certificate_date"]'), 'driver licence issue date textbox');
        this.#isExperienceLessThan2YearsSwitch = new Button(new XPATH('//button[@id="form_item_experience_less"]'), 'is experience less than 2 years switch (button)');
        this.#isPensionerSwitch = new Button(new XPATH('//button[@id="form_item_pensioner_bool"]'), 'is pensioner switch (button)');
        this.#carRegDateTextbox = new Textbox(new XPATH('//input[@id="form_item_dt_reg_cert"]'), 'car reg date textbox');
        this.#carRegionSpan = new Textbox(new XPATH('//input[@id="form_item_region_id"]/following::span[1]'), 'car region span');
        this.#carVINTextbox = new Textbox(new XPATH('//input[@id="form_item_vin"]'), 'car VIN textbox');
        this.#carTypeSpan = new Textbox(new XPATH('//input[@id="form_item_type_id"]/following::span[1]'), 'car type span');
        this.#carManufacturedYearSpan = new Textbox(new XPATH('//input[@id="form_item_year"]/following::span[1]'), 'car manufactured year span');
        this.#carEngineVolumeTextbox = new Textbox(new XPATH('//input[@id="form_item_engine_volume"]'), 'engine volume textbox');
        this.#carMarkTextbox = new Textbox(new XPATH('//input[@id="form_item_mark"]'), 'car mark textbox');
        this.#carModelTextbox = new Textbox(new XPATH('//input[@id="form_item_model"]'), 'car model textbox');
    }

    clickIsJuridicalSwitch() {
        this.#isJuridicalSwitch.scrollElementToView();
        return this.#isJuridicalSwitch.click();
    }

    clickIsIPSwitch() {
        this.#isIPSwitch.scrollElementToView();
        return this.#isIPSwitch.click();
    }

    clickIsResidentSwitch() {
        this.#isResidentSwitch.scrollElementToView();
        return this.#isResidentSwitch.click();
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

    getMiddleNameElement() {
        return this.#middleNameTextbox.getElement();
    }

    getBornDateElement() {
        return this.#bornDateTextbox.getElement();
    }

    getSexText() {
        return this.#sexSpan.getText();
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

    fillAddressTextbox() {
        this.#addressTextbox.clearData();
        return this.#addressTextbox.inputData(JSONLoader.testData.clientAddress);
    }

    fillEmailTextbox() {
        this.#emailTextbox.clearData();
        return this.#emailTextbox.inputData(JSONLoader.testData.clientEmail);
    }

    fillPhoneTextbox() {
        this.#phoneTextbox.clearData();
        return this.#phoneTextbox.inputData(JSONLoader.testData.clientPhone);
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
        return this.#driverLicenceTypeSpan.getText();
    }

    getDriverLicenceNumberElement() {
        return this.#driverLicenceNumberTextbox.getElement();
    }

    getDriverLicenceIssueDateElement() {
        return this.#driverLicenceIssueDateTextbox.getElement();
    }

    fillVehicleData() {
        this.#regNumTextbox.inputData(JSONLoader.testData.carNumber);
        this.#regCertNumTextbox.inputData(JSONLoader.testData.carRegistration);
    }

    clickSearchVehicleButton() {
        this.#searchVehicleButton.clickElement();
    }

    getCarRegDateElement() {
        return this.#carRegDateTextbox.getElement();
    }

    getCarRegionText() {
        return this.#carRegionSpan.getText();
    }

    getCarVINElement() {
        return this.#carVINTextbox.getElement();
    }

    getCarTypeText() {
        return this.#carTypeSpan.getText();
    }

    getCarManufacturedYearText() {
        return this.#carManufacturedYearSpan.getText();
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
}

module.exports = new OGPOPage();