const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const Checkbox = require('../../../main/elements/baseElementChildren/checkbox');
const Label = require('../../../main/elements/baseElementChildren/label');

class MSTStep3 extends BaseForm {
  #residencyCheckboxActive;

  #IINTextbox;

  #searchClientButton;

  #lastNameTextbox;

  #lastNameEngTextbox;

  #firstNameTextbox;

  #firstNameEngTextbox;

  #middleNameTextbox;

  #dateOfBirth;

  #documentTypeDropdownButton;

  #documentNumber;

  #documentIssuedDate;

  #documentIssuedBy;

  #sexDropdownButton;

  #address;

  #pdlCheckboxNotActive;

  #saveButton;

  #addButton;

  #calculateButton;

  #targetElement;

  #headerElements;

  #sumToPayLabel;

  #setPolicyButton;

  #setPolicyAgainButton;

  #policyNumberLabel;

  #paymentCodeLabel;

  constructor(targetIndex) {
    super(new XPATH('//th[text()="Премия(тг.)"]'), 'MST page part three');
    this.#residencyCheckboxActive = new Checkbox(new XPATH('//span[text()="Резидент"]/preceding::span[contains(@class, "ant-checkbox-checked")]'), 'residency checkbox active');
    this.#IINTextbox = new Textbox(new XPATH('//input[@placeholder="Введите ИИН клиента"]'), 'iin textbox');
    this.#searchClientButton = new Button(new XPATH('//span[text()="Поиск"]'), 'search button');
    this.#lastNameTextbox = new Textbox(new XPATH('//input[@id="form_item_last_name"]'), 'last name textbox');
    this.#lastNameEngTextbox = new Textbox(new XPATH('//input[@id="form_item_last_name_eng"]'), 'last name eng textbox');
    this.#firstNameTextbox = new Textbox(new XPATH('//input[@id="form_item_first_name"]'), 'first name textbox');
    this.#firstNameEngTextbox = new Textbox(new XPATH('//input[@id="form_item_first_name_eng"]'), 'first name eng textbox');
    this.#middleNameTextbox = new Textbox(new XPATH('//input[@id="form_item_middle_name"]'), 'middle name textbox');
    this.#dateOfBirth = new Textbox(new XPATH('//input[@id="form_item_born"]'), 'date of birth textbox');
    this.#documentTypeDropdownButton = new Textbox(new XPATH('//input[@id="form_item_document_type_id"]/following::span[@class="ant-select-selection-item"]'), 'document type');
    this.#documentNumber = new Textbox(new XPATH('//input[@id="form_item_document_number"]'), 'document number textbox');
    this.#documentIssuedDate = new Textbox(new XPATH('//input[@id="form_item_document_gived_date"]'), 'document issued date textbox');
    this.#documentIssuedBy = new Textbox(new XPATH('//input[@id="form_item_document_gived_by"]'), 'document issued by textbox');
    this.#sexDropdownButton = new Textbox(new XPATH('//label[@title="Пол"]/following::span[@class="ant-select-selection-item"]'), 'sex');
    this.#address = new Textbox(new XPATH('//input[@id="form_item_address"]'), 'address textbox');
    this.#pdlCheckboxNotActive = new Checkbox(new XPATH('//input[@id="form_item_pdl"]/parent::span[contains(@class, "ant-checkbox") and not(contains(@class, "ant-checkbox-checked"))]'), 'pdl checkbox not active');
    this.#saveButton = new Button(new XPATH('//span[text()="Сохранить"]'), 'save button');
    this.#addButton = new Button(new XPATH('//span[text()="Добавить"]'), 'add button');
    this.#calculateButton = new Button(new XPATH('//span[text()="Рассчитать"]'), 'calculate button');
    this.#targetElement = new Textbox(new XPATH(`//td[contains(@class, "ant-table-cell")][${targetIndex}]`), 'target textbox');
    this.#headerElements = new Textbox(new XPATH('//th[@class="ant-table-cell"]'), 'header textboxes');
    this.#sumToPayLabel = new Textbox(new XPATH('//h3'), 'sum to pay label');
    this.#setPolicyButton = new Button(new XPATH('//span[text()="Выписать полис"]'), 'set policy button');
    this.#setPolicyAgainButton = new Button(new XPATH('//span[text()="Выписать"]'), 'set policy again button');
    this.#policyNumberLabel = new Label(new XPATH('//div[contains(@class, "ant-divider")]/following::h3'), 'policy number label');
    this.#paymentCodeLabel = new Label(new XPATH('//strong[text()="Код для оплаты через Kaspi: "]//following::code'), 'payment code label');
  }

  residencyCheckboxOn() {
    return this.#residencyCheckboxActive.elementIsVisible();
  }

  inputIIN(IIN) {
    this.#addButton.scrollElementToView();
    this.#IINTextbox.inputData(IIN);
  }

  clickSearchClientButton() {
    this.#searchClientButton.clickElement();
  }

  getLastNameElement() {
    return this.#lastNameTextbox.getElement();
  }

  getLastNameEngElement() {
    return this.#lastNameEngTextbox.getElement();
  }

  getFirstNameElement() {
    return this.#firstNameTextbox.getElement();
  }

  getFirstNameEngElement() {
    return this.#firstNameEngTextbox.getElement();
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

  getDocumentTypeText() {
    return this.#documentTypeDropdownButton.getText();
  }

  getDocumentNumberElement() {
    return this.#documentNumber.getElement();
  }

  getDocumentIssuedDateElement() {
    return this.#documentIssuedDate.getElement();
  }

  getOrSetDocumentIssuedByElement(documentIssuedBy) {
    if (this.#documentIssuedBy.getText !== documentIssuedBy) {
      this.#documentIssuedBy.clearData();
      this.#documentIssuedBy.inputData(documentIssuedBy);
    }

    return this.#documentIssuedBy.getElement();
  }

  getSexText() {
    return this.#sexDropdownButton.getText();
  }

  getOrSetAddressElement(address) {
    if (this.#address.getText !== address) {
      this.#address.clearData();
      this.#address.inputData(address);
    }

    return this.#address.getElement();
  }

  PDLCheckboxOff() {
    return this.#pdlCheckboxNotActive.elementIsVisible();
  }

  clickSave() {
    this.#saveButton.scrollElementToView();
    this.#saveButton.clickElement();
  }

  clickCalculate() {
    this.#calculateButton.multipleClickElement(2);
  }

  findElementTextByHeader(header) {
    return this.#headerElements.getElementsListText({ propertyName: 'innerText' }).then((innerTextArray) => {
      let targetIndex = 0;
      for (let i = 0; i < innerTextArray.length; i += 1) {
        if (innerTextArray[i] === header) {
          targetIndex = i + 1;
          break;
        }
      }

      return cy.wrap(targetIndex);
    }).then((index) => {
      const newInstance = new MSTStep3(index);

      return newInstance.#targetElement.getText();
    });
  }

  getSumToPay() {
    const regex = '\\d* \\d* \\d+';

    return this.#sumToPayLabel.getText().then((text) => text.match(regex)[0].replace(/\s/g, ''));
  }

  clickSetPolicy() {
    this.#setPolicyButton.clickElement();
  }

  clickSetPolicyAgain() {
    this.#setPolicyAgainButton.clickElement();
  }

  getPolicyNumberText() {
    return this.#policyNumberLabel.getText();
  }

  getPaymentCode() {
    return this.#paymentCodeLabel.getText();
  }
}

module.exports = new MSTStep3();
