const BaseForm = require('../../main/baseForm');
const JSONLoader = require("../../main/utils/data/JSONLoader");
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const Label = require('../../main/elements/baseElementChildren/label');

class MutualPage extends BaseForm {
    #holderStepButton;
    #insuredStepButton;
    #carStepButton;
    #OGPOPolicyStepButton;
    #juridicalSwitch;
    #IPSwitch;
    #residentSwitch;
    #policyForDevelopmentButton;
    #IINLabel;
    #lastNameLabel;
    #firstNameLabel;
    #middleNameLabel;
    #dateOfBirthLabel;
    #sexLabel;
    #documentTypeLabel;
    #documentNumberLabel;
    #documentGivenDateLabel;
    #addressLabel;
    #emailLabel;
    #mobileNumberLabel;
    #isPDLLabel;
    #insuredFullNameTabLabel;
    #classIDLabel;
    #driverLicenceTypeLabel;
    #driverLicenceNumberLabel;
    #driverLicenceIssueDateLabel;
    #experienceLessThan2YearsSwitch;
    #isPensionerLabel;
    #isInvalidLabel;
    #carTabLabel;
    #regNumLabel;
    #regCertNumLabel;
    #carRegDateLabel;
    #carRegionLabel;
    #carVINLabel;
    #carTypeLabel;
    #carManufacturedYearLabel;
    #carEngineVolumeLabel;
    #carMarkLabel;
    #carModelLabel;

    constructor() {
        super(new XPATH('//a[@href="/mutual"]'), 'Mutual page');
        this.#holderStepButton = new Textbox(new XPATH('//div[text()="Страхователь"]'), 'holder step button');
        this.#insuredStepButton = new Textbox(new XPATH('//div[text()="Список застрахованных"]'), 'insured step button');
        this.#carStepButton = new Textbox(new XPATH('//div[text()="Список ТС"]'), 'car step button');
        this.#OGPOPolicyStepButton = new Textbox(new XPATH('//div[text()="Полис ОС ГПО ВТС"]'), 'OGPO policy step button');
        this.#juridicalSwitch = new Button(new XPATH('//label[@title=\'Юр. лицо\']/following::button[@role=\'switch\' and contains(@class, \'ant-switch-disabled\')]'), 'juridical switch');
        this.#IPSwitch = new Button(new XPATH('//label[@title=\'ИП\']/following::button[@role=\'switch\' and contains(@class, \'ant-switch-disabled\')]'), 'IP switch');
        this.#residentSwitch = new Button(new XPATH('//label[@title=\'Резидент\']/following::button[@role=\'switch\' and contains(@class, \'ant-switch-checked\')]'), 'resident switch');
        this.#policyForDevelopmentButton = new Button(new XPATH('//a[@href=\'/mutual/783/show\']'), 'policy for development button')
        this.#IINLabel = new Label(new XPATH('//label[@title=\'ИИН\']/following::span[@class=\'font-bold\']'), 'iin label');
        this.#lastNameLabel = new Label(new XPATH('//label[@title=\'Фамилия\']/following::span[@class=\'font-bold\']'), 'last name label');
        this.#firstNameLabel = new Label(new XPATH('//label[@title=\'Имя\']/following::span[@class=\'font-bold\']'), 'first name label');
        this.#middleNameLabel = new Label(new XPATH('//label[@title=\'Отчество\']/following::span[@class=\'font-bold\']'), 'middle name label');
        this.#dateOfBirthLabel = new Label(new XPATH('//label[@title=\'Дата рождения\']/following::span[@class=\'font-bold\']'), 'date of birth label');
        this.#sexLabel = new Label(new XPATH('//label[@title=\'Пол\']/following::span[@class=\'font-bold\']'), 'sex label');
        this.#documentTypeLabel = new Label(new XPATH('//label[@title=\'Тип документа\']/following::span[@class=\'font-bold\']'), 'document type label');
        this.#documentNumberLabel = new Label(new XPATH('//label[@title=\'Номер документа\']/following::span[@class=\'font-bold\']'), 'document number label');
        this.#documentGivenDateLabel = new Label(new XPATH('//label[@title=\'Дата выдачи\']/following::span[@class=\'font-bold\']'), 'document given date label');
        this.#addressLabel = new Label(new XPATH('//label[@title=\'Адрес клиента\']/following::span[@class=\'font-bold\']'), 'address label');
        this.#emailLabel = new Label(new XPATH('//label[@title=\'E-Mail\']/following::span[@class=\'font-bold\']'), 'email label');
        this.#mobileNumberLabel = new Label(new XPATH('//label[@title=\'Мобильный телефон\']/following::span[@class=\'font-bold\']'), 'mobile number label');
        this.#isPDLLabel = new Label(new XPATH('//label[@title=\'ПДЛ\']/following::span[@class=\'font-bold\']'), 'is PDL label');

        this.#insuredFullNameTabLabel = new Label(new XPATH('//div[@role=\'tab\' and @tabindex=0]'), 'insured full name tab label');
        this.#classIDLabel = new Label(new XPATH('//label[@title=\'Класс "бонус-малус"\']/following::span[@class=\'font-bold\']'), 'class ID label');
        this.#driverLicenceTypeLabel = new Label(new XPATH('//label[@title=\'Тип вод. уд\']/following::span[@class=\'font-bold\']'), 'driver licence type label');
        this.#driverLicenceNumberLabel = new Label(new XPATH('//label[@title=\'Номер вод. уд.\']/following::span[@class=\'font-bold\']'), 'driver licence number label');
        this.#driverLicenceIssueDateLabel = new Label(new XPATH('//label[@title=\'Дата выдачи вод. уд.\']/following::span[@class=\'font-bold\']'), 'driver licence issue date label');
        this.#experienceLessThan2YearsSwitch = new Button(new XPATH('//label[@title=\'Стаж вождения менее 2-х лет\']/following::button[@role=\'switch\' and contains(@class, \'ant-switch-disabled\')]'), 'experience less than 2 years switch');
        this.#isPensionerLabel = new Label(new XPATH('//label[@title=\'Является пенсионером\']/following::span[@class=\'font-bold\']'), 'is pensioner label');
        this.#isInvalidLabel = new Label(new XPATH('//label[@title=\'Является инвалидом\']/following::span[@class=\'font-bold\']'), 'is invalid label');

        this.#carTabLabel = new Label(new XPATH('//div[@role=\'tab\' and @tabindex=0]'), 'car tab label');
        this.#regNumLabel = new Label(new XPATH('//label[@title=\'Гос. номер\']/following::span[@class=\'font-bold\']'), 'reg num label');
        this.#regCertNumLabel = new Label(new XPATH('//label[@title=\'Номер свид. рег. ТС\']/following::span[@class=\'font-bold\']'), 'reg cert num label');
        this.#carRegDateLabel = new Label(new XPATH('//label[@title=\'Дата выдачи\']/following::span[@class=\'font-bold\']'), 'car reg date label');
        this.#carRegionLabel = new Label(new XPATH('//label[@title=\'Регион регистрации\']/following::span[@class=\'font-bold\']'), 'car region label');
        this.#carVINLabel = new Label(new XPATH('//label[@title=\'VIN/Номер кузова\']/following::span[@class=\'font-bold\']'), 'car VIN label');
        this.#carTypeLabel = new Label(new XPATH('//label[@title=\'Тип ТС\']/following::span[@class=\'font-bold\']'), 'car type label');
        this.#carManufacturedYearLabel = new Label(new XPATH('//label[@title=\'Год выпуска\']/following::span[@class=\'font-bold\']'), 'car manufactured year label');
        this.#carEngineVolumeLabel = new Label(new XPATH('//label[@title=\'Объем двигателя (куб.см)\']/following::span[@class=\'font-bold\']'), 'engine volume label');
        this.#carMarkLabel = new Label(new XPATH('//label[@title=\'Марка\']/following::span[@class=\'font-bold\']'), 'car mark label');
        this.#carModelLabel = new Label(new XPATH('//label[@title=\'Модель\']/following::span[@class=\'font-bold\']'), 'car model label');
    }

    clickHolderStepButton() {
        this.#holderStepButton.clickElement();
    }

    isJuridicalSwitchOff() {
        return this.#juridicalSwitch.elementIsDisplayed();
    }

    isIPSwitchOff() {
        return this.#IPSwitch.elementIsDisplayed();
    }

    isResidentSwitchON() {
        return this.#residentSwitch.elementIsDisplayed();
    }

    clickPolicyForDevelopmentButton() {
        this.#policyForDevelopmentButton.clickElement();
    }

    getIINText() {
        return this.#IINLabel.getText();
    }

    getLastNameText() {
        return this.#lastNameLabel.getText();
    }

    getFirstNameText() {
        return this.#firstNameLabel.getText();
    }

    getMiddleNameText() {
        return this.#middleNameLabel.getText();
    }

    getDateOfBirthText() {
        return this.#dateOfBirthLabel.getText();
    }

    getSexText() {
        return this.#sexLabel.getText();
    }

    getDocumentTypeText() {
        return this.#documentTypeLabel.getText();
    }

    getDocumentNumberText() {
        return this.#documentNumberLabel.getText();
    }

    getDocumentGivenDateText() {
        return this.#documentGivenDateLabel.getText();
    }

    getAddressText() {
        return this.#addressLabel.getText();
    }

    getEmailText() {
        return this.#emailLabel.getText();
    }

    getMobileNumberText() {
        return this.#mobileNumberLabel.getText();
    }

    getIsPDLText() {
        return this.#isPDLLabel.getText();
    }

    clickInsuredStepButton() {
        this.#insuredStepButton.scrollElementToView();
        this.#insuredStepButton.clickElement();
    }

    getInsuredFullNameTabText() {
        return this.#insuredFullNameTabLabel.getText();
    }

    getClassIDText() {
        return this.#classIDLabel.getText();
    }

    getDriverLicenceTypeText() {
        return this.#driverLicenceTypeLabel.getText();
    }

    getDriverLicenceNumberText() {
        return this.#driverLicenceNumberLabel.getText();
    }

    getDriverLicenceIssueDateText() {
        return this.#driverLicenceIssueDateLabel.getText();
    }

    isExperienceLessThan2YearsSwitchOFF() {
        return this.#experienceLessThan2YearsSwitch.elementIsDisplayed();
    }

    getIsPensionerText() {
        return this.#isPensionerLabel.getText();
    }

    getIsInvalidText() {
        return this.#isInvalidLabel.getText();
    }

    clickCarStepButton() {
        this.#carStepButton.scrollElementToView();
        this.#carStepButton.clickElement();
    }

    getCarTabText() {
        return this.#carTabLabel.getText();
    }

    getCarRegNumText() {
        return this.#regNumLabel.getText();
    }

    getCarRegCertNumText() {
        return this.#regCertNumLabel.getText();
    }

    getCarRegDateLabelText() {
        return this.#carRegDateLabel.getText();
    }

    getCarRegionText() {
        return this.#carRegionLabel.getText();
    }

    getCarVINText() {
        return this.#carVINLabel.getText();
    }

    getCarTypeText() {
        return this.#carTypeLabel.getText();
    }

    getCarManufacturedYearText() {
        return this.#carManufacturedYearLabel.getText();
    }

    getCarEngineVolumeText() {
        return this.#carEngineVolumeLabel.getText();
    }

    getCarMarkText() {
        return this.#carMarkLabel.getText();
    }

    getCarModelText() {
        return this.#carModelLabel.getText();
    }

    clickOGPOPolicyStepButton() {
        this.#OGPOPolicyStepButton.scrollElementToView();
        this.#OGPOPolicyStepButton.clickElement();
    }
}

module.exports = new MutualPage();