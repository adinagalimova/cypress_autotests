const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Label = require('../../../main/elements/baseElementChildren/label');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');

class QuoteStep5 extends BaseForm {
    #insuranceObjectsTextbox
    #uploadButton
    #managerCommentsTextbox
    #uploadedFile
    #saveButton
    #submitForReviewButton
    #logoutButton
    #quotePage1Button
    #underwriterCommentTextbox
    #forRevisionButton
    #versionNumberLabel
    #acceptButton
    #cancelButton

    constructor() {
        super(new XPATH('//label[@for="form_item_insuranceObjects"]'), 'Quote Page Step 5');
        this.#insuranceObjectsTextbox = new Textbox(new XPATH('//textarea[@id="form_item_insuranceObjects"]'), 'insurance object textbox');
        this.#uploadButton = new Button(new XPATH('//input[@id="form_item_upload"]'), 'upload button');
        this.#managerCommentsTextbox = new Textbox(new XPATH('//textarea[@id="form_item_managerComment"]'), 'manager comments textbox');
        this.#uploadedFile = new Button(new XPATH('//div[@class="mb-4"]'), 'uploaded file');
        this.#saveButton = new Button(new XPATH('//div/button[contains(@class,"ant-btn-primary")]'), 'next button');
        this.#submitForReviewButton = new Button(new XPATH('//button[@type="button"]/child::span[text()="На рассмотрение"]'), 'submit for review button');
        this.#logoutButton = new Button(new XPATH('//span[@aria-label="logout"]'),'logout button');

        //under
        this.#quotePage1Button = new Button(new XPATH('//div[@class="ant-steps-item-icon"]/child::span[text()="1"]'), 'quote page1 button');
        this.#underwriterCommentTextbox = new Textbox(new XPATH('//textarea[@id="form_item_underwriterComment"]'), 'underwriter comment textbox');
        this.#forRevisionButton = new Button(new XPATH('//button/span[text()="На доработку"]'), 'for revision button');
        this.#versionNumberLabel = new Label(new XPATH('//span[contains(@class, \'ant-tag-blue\')]'), 'version number label');
        this.#acceptButton = new Button(new XPATH('//button/span[text()="Одобрить"]'),'accept button');
        this.#cancelButton = new Button(new XPATH('//button[contains(@class,"ant-btn-dangerous")]'), 'cancel button');
    }
    inputInsuranceObjects() {
        this.#insuranceObjectsTextbox.inputData('Автомобиль 1:\n' +
            'Марка/модель: Toyota Camry\n' +
            'Год выпуска: 2022\n' +
            'VIN: XXXXXXXXXXXXXX\n' +
            'Рыночная стоимость: 10 500 000 тг.');
    }

    uploadButtonClick() {
        this.#uploadButton.uploadFile(JSONLoader.testData.pathToTestPicture);
    }

    inputManagerComments() {
        this.#managerCommentsTextbox.inputData('Особые условия:\n' +
            'Включить покрытие на территории стран СНГ.\n' +
            'Учет износа запчастей при расчете возмещения не требуется.');
    }

    getUploadedFile() {
        this.#uploadedFile.clickElement();
    }

    clickSaveButton() {
        this.#saveButton.clickElement();
    }

    clickSubmitForReviewButton() {
        this.#submitForReviewButton.scrollElementToView();
        this.#submitForReviewButton.clickElement();
        this.#cancelButton.waitElementIsExisting();
    }

    clickLogoutButton() {
        this.#logoutButton.clickElement();
    }

    clickQuotePage1Button() {
        this.#quotePage1Button.clickElement();
    }

    inputUnderwriterComments() {
        this.#underwriterCommentTextbox.inputData('Изменены значения в полях франшизы по повреждению, франшизы по утрате, а также добавлены риски и значение РВД.');
    }

    clickRevisionButton() {
        this.#forRevisionButton.clickElement();
    }

    inputManagerCommentsForRevision() {
        this.#managerCommentsTextbox.clearData();
        this.#managerCommentsTextbox.inputData('Внесенные изменения приняты. Прошу принять заявку на рассмотрение');
    }

    getVersionNumberAfterRevision() {
        return this.#versionNumberLabel.getText();
    }

    clickAcceptButton() {
        this.#acceptButton.scrollElementToView();
        this.#acceptButton.clickElement();
    }
}

module.exports = new QuoteStep5();
