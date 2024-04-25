const moment = require('moment');
const BaseForm = require('../../main/baseForm');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Randomizer = require('../../main/utils/random/randomizer');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');
const Textbox = require('../../main/elements/baseElementChildren/textbox');
const Label = require('../../main/elements/baseElementChildren/label');
const RadioButton = require('../../main/elements/baseElementChildren/radioButton');
const Switch = require('../../main/elements/baseElementChildren/switch');

class OGPOPage extends BaseForm {
  #juridicalSwitch;
  #IPSwitch;
  #residentSwitch;
  #IINTextbox;
  #firstNameTextbox;
  #lastNameTextbox;
  #middleNameTextbox;
  #dateOfBirth;
  #sexRadioButton;
  #documentTypeDropdownButton;
  #documentNumberTextbox;
  #documentIssueDateTextbox;
  #addressTextbox;
  #emailTextbox;
  #phoneTextbox;
  #insuredSwitch;
  #PDLSwitch;
  #saveButton;
  #nextButton;
  #searchClientButton;
  #classIDLabel;
  #driverLicenceTypeDropdownButton;
  #driverLicenceNumberTextbox;
  #driverLicenceIssueDateTextbox;
  #experienceLessThan2Years;
  #pensionerSwitch;
  #invalidSwitch;
  #searchVehicleButton;
  #searchVehicleByVINButton;
  #regNumTextbox;
  #regCertNumTextbox;
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
  #policyNumberLabel;
  #sumToPayLabel;
  #paymentCodeLabel;
  #mutualButton;
  #confirmIssueMutualButton;

  constructor(beginDate) {
    super(new XPATH('//a[@href="/ogpo"]'), 'OGPO page');
    this.#beginDateButton = new Button(new XPATH(`//td[@title="${beginDate}"]`), 'begin date button');

    this.#juridicalSwitch = new Switch(new XPATH('//label[@title=\'Юр. лицо\']/following::button[@role=\'switch\']'), 'juridical switch');
    this.#IPSwitch = new Switch(new XPATH('//label[@title=\'ИП\']/following::button[@role=\'switch\']'), 'IP switch');
    this.#residentSwitch = new Switch(new XPATH('//label[@title=\'Резидент\']/following::button[@role=\'switch\']'), 'resident switch');
    this.#IINTextbox = new Textbox(new XPATH('//input[@id="form_item_iin"]'), 'IIN textbox');
    this.#firstNameTextbox = new Textbox(new XPATH('//input[@id="form_item_first_name"]'), 'first name textbox');
    this.#lastNameTextbox = new Textbox(new XPATH('//input[@id="form_item_last_name"]'), 'last name textbox');
    this.#middleNameTextbox = new Textbox(new XPATH('//input[@id="form_item_middle_name"]'), 'middle name textbox');
    this.#dateOfBirth = new Textbox(new XPATH('//input[@id="form_item_born"]'), 'date of birth textbox');
    this.#sexRadioButton = new RadioButton(new XPATH('//span[contains(@class, "ant-radio-checked")]/following::span'), 'sex radio button');
    this.#documentTypeDropdownButton = new Button(new XPATH('//input[@id="form_item_document_type_id"]/following::span[@class="ant-select-selection-item"]'), 'document type dropdown button');
    this.#documentNumberTextbox = new Textbox(new XPATH('//input[@id="form_item_document_number"]'), 'document number textbox');
    this.#documentIssueDateTextbox = new Textbox(new XPATH('//input[@id="form_item_document_gived_date"]'), 'document issue date textbox');
    this.#addressTextbox = new Textbox(new XPATH('//input[@id="form_item_address"]'), 'address textbox');
    this.#emailTextbox = new Textbox(new XPATH('//input[@id="form_item_email"]'), 'email textbox');
    this.#phoneTextbox = new Textbox(new XPATH('//input[@id="form_item_mobile_phone"]'), 'phone textbox');
    this.#insuredSwitch = new Switch(new XPATH('//button[@id="form_item_holder_is_insured"]'), 'insured switch');
    this.#PDLSwitch = new Switch(new XPATH('//label[@title=\'ПДЛ\']/following::button[@role=\'switch\']'), 'PDL switch');
    this.#saveButton = new Button(new XPATH('//span[text()="Сохранить"]'), 'save button');
    this.#nextButton = new Button(new XPATH('//span[text()="Далее"]//parent::button'), 'next button');
    this.#searchClientButton = new Button(new XPATH('//span[text()="Поиск"]'), 'search client button');

    this.#classIDLabel = new Label(new XPATH('//label[@for=\'form_item_class\']/following::span'), 'insured class ID label');
    this.#driverLicenceTypeDropdownButton = new Button(new XPATH('//input[@id="form_item_driver_certificate_type_id"]/following::span[@class="ant-select-selection-item"]'), 'driver licence type dropdown button');
    this.#driverLicenceNumberTextbox = new Textbox(new XPATH('//input[@id="form_item_driver_certificate"]'), 'driver licence number textbox');
    this.#driverLicenceIssueDateTextbox = new Textbox(new XPATH('//input[@id="form_item_driver_certificate_date"]'), 'driver licence issue date textbox');
    this.#experienceLessThan2Years = new Switch(new XPATH('//label[@title=\'Стаж менее 2-х лет\']/following::button[@role=\'switch\']'), 'experience less than 2 years switch');
    this.#pensionerSwitch = new Switch(new XPATH('//label[@title=\'Является пенсионером\']/following::button[@role=\'switch\']'), 'pensioner switch');
    this.#invalidSwitch = new Switch(new XPATH('//label[@title=\'Является инвалидом\']/following::button[@role=\'switch\']'), 'invalid switch');

    this.#regNumTextbox = new Textbox(new XPATH('//input[@id="form_item_reg_num"]'), 'reg num textbox');
    this.#regCertNumTextbox = new Textbox(new XPATH('//input[@id="form_item_reg_cert_num"]'), 'reg cert num textbox');
    this.#searchVehicleButton = new Button(new XPATH('//label[@for="form_item_vin"]/preceding::span[text()="Найти"]/parent::button'), 'search vehicle button');
    this.#searchVehicleByVINButton = new Button(new XPATH('//label[@for="form_item_vin"]/following::span[text()="Найти"]/parent::button'), 'search vehicle by VIN button');
    this.#carRegDateTextbox = new Textbox(new XPATH('//input[@id="form_item_dt_reg_cert"]'), 'car reg date textbox');
    this.#carRegionDropdownButton = new Button(new XPATH('//input[@id="form_item_region_id"]/following::span[@class="ant-select-selection-item"]'), 'car region dropdown button');
    this.#carRegionDropdownElement = new Button(new XPATH(`//div[@class="ant-select-item-option-content" and text()="${JSONLoader.testData.carRegion}"]`), 'car region dropdown element');
    this.#carVINTextbox = new Textbox(new XPATH('//input[@id="form_item_vin"]'), 'car VIN textbox');
    this.#carTypeDropdownButton = new Button(new XPATH('//input[@id="form_item_type_id"]/following::span[@class="ant-select-selection-item"]'), 'car type dropdown button');
    this.#carManufacturedYearDropdownButton = new Textbox(new XPATH('//input[@id="form_item_year"]/following::span[@class="ant-select-selection-item"]'), 'car manufactured year dropdown button');
    this.#carEngineVolumeTextbox = new Textbox(new XPATH('//input[@id="form_item_engine_volume"]'), 'engine volume textbox');
    this.#carMarkTextbox = new Textbox(new XPATH('//input[@id="form_item_mark"]'), 'car mark textbox');
    this.#carModelTextbox = new Textbox(new XPATH('//input[@id="form_item_model"]'), 'car model textbox');

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
    this.#policyNumberLabel = new Label(new XPATH('//label[@title=\'Номер полиса\']/following::span[@class=\'font-bold\']'), 'policy number label');
    this.#statusLabel = new Label(new XPATH('//label[@title="Статус"]//parent::div[contains(@class, "ant-col")]/parent::div[contains(@class, "ant-row")]/descendant::span[@class="font-bold"]'), 'status label');
    this.#creationDateLabel = new Label(new XPATH('//label[@title="Дата создания"]//parent::div[contains(@class, "ant-col")]/parent::div[contains(@class, "ant-row")]/descendant::span[@class="font-bold"]'), 'creation date label');
    this.#insurancePeriodAfterIssuingLabel = new Label(new XPATH('//label[@title="Период страхования"]/following::span[@class="font-bold"]'), 'insurance period after issuing label');
    this.#paymentCodeLabel = new Label(new XPATH('//strong[text()="Код для оплаты через Kaspi: "]//following::code//child::span'), 'payment code label');

    this.#mutualButton = new Button(new XPATH('//span[text()=\'Создать "обоюдку"\']/parent::button'), 'Mutual button');
    this.#confirmIssueMutualButton = new Button(new XPATH('//span[text()=\'Да\']/parent::button'), 'confirm issue Mutual button');
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

  insuredSwitchIsChecked() {
    return this.#insuredSwitch.isChecked();
  }

  PDLSwitchIsChecked() {
    return this.#PDLSwitch.isChecked();
  }

  experienceLessThan2YearsSwitchIsChecked() {
    return this.#juridicalSwitch.isChecked();
  }

  pensionerSwitchIsChecked() {
    return this.#juridicalSwitch.isChecked();
  }

  invalidSwitchIsChecked() {
    return this.#juridicalSwitch.isChecked();
  }

  getPolicyNumberText() {
    return this.#policyNumberLabel.getText();
  }

  clickConfirmIssueMutualButton() {
    this.#confirmIssueMutualButton.clickElement();
  }

  clickMutualButton() {
    this.#mutualButton.clickElement();
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

  getPaymentCode() {
    return this.#paymentCodeLabel.getText();
  }

  inputRandomBeginDate() {
    const dates = Randomizer.getRandomDatesIntervalFromTomorrow(...JSONLoader.testData.timeIncrement);
    const newInstance = new OGPOPage(dates.startDate, dates.finishDate);
    this.#beginDateCalendarButton.flipCalendarMonth(this.#calendarRightArrowButton, dates.startMonthDifference);
    newInstance.#beginDateButton.clickElement();
  }

  calculateEndDate() {
    return this.getBeginDateTitle().then((value) => {
      const endDate = moment(value, JSONLoader.testData.datesFormatFrontEnd)
        .add(1, 'year').subtract(1, 'day').format(JSONLoader.testData.datesFormatFrontEnd);
      return cy.wrap(endDate);
    });
  }

  getBeginDateTitle() {
    return this.#beginDateCalendarButton.getAttributeValue('title');
  }

  getEndDateTitle() {
    return this.#endDateCalendarButton.getAttributeValue('title');
  }

  inputIIN(IIN) {
    this.#juridicalSwitch.scrollElementToView();
    this.#IINTextbox.inputData(IIN);
  }

  getFirstNameElement() {
    return this.#firstNameTextbox.getElement();
  }

  getLastNameElement() {
    return this.#lastNameTextbox.getElement();
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
    return this.#documentTypeDropdownButton.getText();
  }

  getDocumentNumberElement() {
    return this.#documentNumberTextbox.getElement();
  }

  getDocumentIssueDateElement() {
    return this.#documentIssueDateTextbox.getElement();
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

  clickInsuredSwitch() {
    this.#insuredSwitch.clickElement();
  }

  getClassIDLabelText() {
    return this.#classIDLabel.getText();
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
