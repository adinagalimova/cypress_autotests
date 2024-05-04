const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');
const Label = require('../../main/elements/baseElementChildren/label');
const Switch = require('../../main/elements/baseElementChildren/switch');

class MutualPage extends BaseForm {
  #policiesButton;
  #holderStepButton;
  #insuredStepButton;
  #carStepButton;
  #OGPOPolicyStepButton;
  #issueMutualPolicyStepButton;
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
  #insuredLastnameTabLabel;
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
  #OGPOPolicyNumberLabel;
  #OGPOPolicyStatusLabel;
  #OGPOPolicyIssueDateLabel;
  #OGPOInsurancePeriodLabel;
  #OGPOHolderLabel;
  #OGPOListOfInsuredPeopleLabel;
  #OGPOListOfCarsLabel;
  #statusLabel;
  #insurancePeriodLabel;
  #unifiedCombinedLimitLabel;
  #premiumLabel;
  #issuePolicyButton;
  #policyNumberLabel;
  #paymentCodeLabel;

  constructor() {
    super(new XPATH('//a[@href="/mutual"]'), 'Mutual page');
    this.#policiesButton = new Button(new XPATH('//a[@href="/mutual"]'), 'policies button');
    this.#holderStepButton = new Button(new XPATH('//div[text()="Страхователь"]'), 'holder step button');
    this.#insuredStepButton = new Button(new XPATH('//div[text()="Список застрахованных"]'), 'insured step button');
    this.#carStepButton = new Button(new XPATH('//div[text()="Список ТС"]'), 'car step button');
    this.#OGPOPolicyStepButton = new Button(new XPATH('//div[text()="Полис ОС ГПО ВТС"]'), 'OGPO policy step button');
    this.#issueMutualPolicyStepButton = new Button(new XPATH('//div[text()=\'Оформление "ОБВ"\']'), 'issue mutual policy step button');

    this.#juridicalSwitch = new Switch(new XPATH('//label[@title=\'Юр. лицо\']/following::button[@role=\'switch\']'), 'juridical switch');
    this.#IPSwitch = new Switch(new XPATH('//label[@title=\'ИП\']/following::button[@role=\'switch\']'), 'IP switch');
    this.#residentSwitch = new Switch(new XPATH('//label[@title=\'Резидент\']/following::button[@role=\'switch\']'), 'resident switch');
    this.#policyForDevelopmentButton = new Button(new XPATH('//a[@href=\'/mutual/783/show\']'), 'policy for development button');
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

    this.#insuredLastnameTabLabel = new Label(new XPATH('//div[@role=\'tab\' and @tabindex=0]'), 'insured lastname tab label');
    this.#classIDLabel = new Label(new XPATH('//label[@title=\'Класс "бонус-малус"\']/following::span[@class=\'font-bold\']'), 'class ID label');
    this.#driverLicenceTypeLabel = new Label(new XPATH('//label[@title=\'Тип вод. уд\']/following::span[@class=\'font-bold\']'), 'driver licence type label');
    this.#driverLicenceNumberLabel = new Label(new XPATH('//label[@title=\'Номер вод. уд.\']/following::span[@class=\'font-bold\']'), 'driver licence number label');
    this.#driverLicenceIssueDateLabel = new Label(new XPATH('//label[@title=\'Дата выдачи вод. уд.\']/following::span[@class=\'font-bold\']'), 'driver licence issue date label');
    this.#experienceLessThan2YearsSwitch = new Switch(new XPATH('//label[@title=\'Стаж вождения менее 2-х лет\']/following::button[@role=\'switch\']'), 'experience less than 2 years switch');
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

    this.#OGPOPolicyNumberLabel = new Label(new XPATH('//label[@title=\'Номер полиса\']/following::span[@class=\'font-bold\']'), 'OGPO policy number label');
    this.#OGPOPolicyStatusLabel = new Label(new XPATH('//label[@title=\'Статус\']/following::span[@class=\'font-bold\']'), 'OGPO policy status label');
    this.#OGPOPolicyIssueDateLabel = new Label(new XPATH('//label[@title=\'Дата создания\']/following::span[@class=\'font-bold\']'), 'OGPO policy issue date label');
    this.#OGPOInsurancePeriodLabel = new Label(new XPATH('//label[@title=\'Период страхования\']/following::span[@class=\'font-bold\']'), 'OGPO insurance period label');
    this.#OGPOHolderLabel = new Label(new XPATH('//label[@title=\'Страхователь\']/following::span[@class=\'font-bold\']'), 'OGPO holder label');
    this.#OGPOListOfInsuredPeopleLabel = new Label(new XPATH('//label[@title=\'Список застрахованных\']/following::div[@class=\'font-bold\']'), 'OGPO list of insured people label');
    this.#OGPOListOfCarsLabel = new Label(new XPATH('//label[@title=\'Список ТС\']/following::div[@class=\'font-bold\']'), 'OGPO list of insured cars label');

    this.#statusLabel = new Label(new XPATH('//label[@title=\'Статус\']/following::span[@class=\'font-bold\']'), 'status label');
    this.#insurancePeriodLabel = new Label(new XPATH('//label[@title=\'Период страхования\']/following::span[@class=\'font-bold\']'), 'insurance period label');
    this.#unifiedCombinedLimitLabel = new Label(new XPATH('//label[@title=\'Единый комбинированный лимит\']/following::div[@class=\'font-bold\']'), 'unified combined limit label');
    this.#premiumLabel = new Label(new XPATH('//label[@title=\'Страховая премия\']/following::div[@class=\'font-bold\']'), 'premium label');
    this.#issuePolicyButton = new Button(new XPATH('//span[text()=\'Выписать полис\']'), 'issue policy button');
    this.#policyNumberLabel = new Label(new XPATH('//label[@title=\'Номер полиса\']/following::span[@class=\'font-bold\']'), 'policy number label');
    this.#paymentCodeLabel = new Label(new XPATH('//strong[text()="Код для оплаты через Kaspi: "]//following::code'), 'payment code label');
  }

  clickHolderStepButton() {
    this.#holderStepButton.elementIsVisible();
    this.#holderStepButton.clickElement();
  }

  juridicalSwitchIsChecked() {
    return this.#juridicalSwitch.isChecked();
  }

  IPSwitchIsChecked() {
    return this.#IPSwitch.isChecked();
  }

  residentSwitchIsChecked() {
    return this.#residentSwitch.isChecked();
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

  getInsuredLastnameTabText() {
    return this.#insuredLastnameTabLabel.getText().then((text) => text.slice(0, text.indexOf(' ')));
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

  experienceLessThan2YearsSwitchIsChecked() {
    return this.#experienceLessThan2YearsSwitch.isChecked();
  }

  getIsPensionerText() {
    return this.#isPensionerLabel.getText();
  }

  getIsInvalidText() {
    return this.#isInvalidLabel.getText();
  }

  clickCarStepButton() {
    this.#policiesButton.scrollElementToView();
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

  getOGPOPolicyNumberText() {
    return this.#OGPOPolicyNumberLabel.getText();
  }

  getOGPOPolicyStatusText() {
    return this.#OGPOPolicyStatusLabel.getText();
  }

  getSlicedOGPOPolicyIssueDateText() {
    return this.#OGPOPolicyIssueDateLabel.getText().then((text) => text.slice(0, 10));
  }

  getOGPOInsurancePeriodText() {
    return this.#OGPOInsurancePeriodLabel.getText();
  }

  getOGPOHolderText() {
    return this.#OGPOHolderLabel.getText();
  }

  getOGPOListOfInsuredPeopleText() {
    return this.#OGPOListOfInsuredPeopleLabel.getText();
  }

  getOGPOListOfCarsText() {
    return this.#OGPOListOfCarsLabel.getText();
  }

  clickIssueMutualPolicyStepButton() {
    this.#issueMutualPolicyStepButton.clickElement();
  }

  getStatusText() {
    return this.#statusLabel.getText();
  }

  getInsurancePeriodText() {
    return this.#insurancePeriodLabel.getText();
  }

  getUnifiedCombinedLimitText() {
    return this.#unifiedCombinedLimitLabel.getText();
  }

  getPremiumText() {
    return this.#premiumLabel.getText().then((text) => text.slice(0, -3));
  }

  clickIssuePolicyButton() {
    this.#issuePolicyButton.clickElement();
  }

  getPolicyNumberText() {
    return this.#policyNumberLabel.getText();
  }

  getPaymentCode() {
    return this.#paymentCodeLabel.getText();
  }
}

module.exports = new MutualPage();
