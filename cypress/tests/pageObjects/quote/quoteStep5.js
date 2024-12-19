const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Label = require('../../../main/elements/baseElementChildren/label');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const Randomizer = require("../../../main/utils/random/randomizer");

class QuoteStep5 extends BaseForm {
    #insuranceObjectsTextbox
    #uploadButton
    #managerCommentsTextbox
    #uploadedFile
    #saveButton
    #submitForReviewButton
    #logoutButton
    #quotePage1Button
    #quotePage4Button
    #underwriterCommentTextbox
    #forRevisionButton
    #versionNumberLabel
    #acceptButton
    #cancelButton
    #statusRevision
    #objectCountTextbox

    constructor() {
        super(new XPATH('//label[@for="form_item_insuranceObjects"]'), 'Quote Page Step 5');
        this.#insuranceObjectsTextbox = new Textbox(new XPATH('//textarea[@id="form_item_insuranceObjects"]'), 'insurance object textbox');
        this.#uploadButton = new Button(new XPATH('//input[@id="form_item_upload"]'), 'upload button');
        this.#managerCommentsTextbox = new Textbox(new XPATH('//textarea[@id="form_item_managerComment"]'), 'manager comments textbox');
        this.#uploadedFile = new Button(new XPATH('//div[@class="mb-4"]'), 'uploaded file');
        this.#saveButton = new Button(new XPATH('//div/button[contains(@class,"ant-btn-primary")]'), 'save button');
        this.#submitForReviewButton = new Button(new XPATH('//button[@type="button"]/child::span[text()="На рассмотрение"]'), 'submit for review button');
        this.#logoutButton = new Button(new XPATH('//span[@aria-label="logout"]'),'logout button');
        this.#quotePage1Button = new Button(new XPATH('//div[@class="ant-steps-item-icon"]/child::span[text()="1"]'), 'quote page1 button');
        this.#quotePage4Button = new Button(new XPATH('//div[@class="ant-steps-item-icon"]/child::span[text()="4"]'), 'quote page4 button');
        this.#underwriterCommentTextbox = new Textbox(new XPATH('//textarea[@id="form_item_underwriterComment"]'), 'underwriter comment textbox');
        this.#forRevisionButton = new Button(new XPATH('//button/span[text()="На доработку"]'), 'for revision button');
        this.#versionNumberLabel = new Label(new XPATH('//span[contains(@class, \'ant-tag-blue\')]'), 'version number label');
        this.#acceptButton = new Button(new XPATH('//button/span[text()="Одобрить"]'),'accept button');
        this.#cancelButton = new Button(new XPATH('//button[contains(@class,"ant-btn-dangerous")]'), 'cancel button');
        this.#statusRevision = new Label(new XPATH('//span[contains(@class, "ant-tag-blue") and text()="На рассмотрении"]'), 'status revision');
        this.#objectCountTextbox = new Textbox(new XPATH('//input[@id="form_item_objectCount"]'), 'object count textbox');
    }
    inputInsuranceObjects() {
        this.#insuranceObjectsTextbox.inputData(JSONLoader.testData.insuranceObjectsInformation);
    }

    uploadButtonClick() {
        this.#uploadButton.uploadFile(JSONLoader.testData.pathToTestPicture);
    }

    inputManagerComments() {
        this.#managerCommentsTextbox.inputData(JSONLoader.testData.managerComment);
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
        this.#statusRevision.waitElementIsExisting();
        this.#statusRevision.elementIsDisplayed();
    }

    clickLogoutButton() {
        this.#logoutButton.clickElement();
    }

    clickQuotePage1Button() {
        this.#quotePage1Button.clickElement();
    }

    clickQuotePage4Button() {
        this.#quotePage4Button.clickElement();
    }

    inputUnderwriterComments() {
        this.#underwriterCommentTextbox.inputData(JSONLoader.testData.underwriterComment);
    }

    clickRevisionButton() {
        this.#forRevisionButton.clickElement();
        this.#statusRevision.waitElementIsExisting();
        this.#statusRevision.elementIsDisplayed();
    }

    inputManagerCommentsForRevision() {
        this.#managerCommentsTextbox.clearData();
        this.#managerCommentsTextbox.inputData(JSONLoader.testData.managerCommentAfterRevision);
    }

    getVersionNumberAfterRevision() {
        return this.#versionNumberLabel.getText();
    }

    clickAcceptButton() {
        this.#acceptButton.scrollElementToView();
        this.#acceptButton.clickElement();
    }

    inputObjectCount() {
        this.#objectCountTextbox.inputData(Randomizer.getRandomInteger(900,0));
    }

    checkObjectCount() {
        return this.#objectCountTextbox.getValue();
    }

}

module.exports = new QuoteStep5();
