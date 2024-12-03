const BaseForm = require('../../../main/baseForm');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const Randomizer = require("../../../main/utils/random/randomizer");

class QuoteStep5 extends BaseForm {
    #insuranceObjectsTextbox
    #uploadButton
    #managerCommentsTextbox
    #uploadedFile
    #saveButton
    constructor() {
        super(new XPATH('//label[@for="form_item_insuranceObjects"]'), 'Quote Page Step 5');
        this.#insuranceObjectsTextbox = new Textbox(new XPATH('//textarea[@id="form_item_insuranceObjects"]'), 'insurance object textbox');
        this.#uploadButton = new Button(new XPATH('//input[@id="form_item_upload"]'), 'upload button');
        this.#managerCommentsTextbox = new Textbox(new XPATH('//textarea[@id="form_item_managerComment"]'), 'manager comments textbox');
        this.#uploadedFile = new Button(new XPATH('//div[@class="mb-4"]'), 'uploaded file');
        this.#saveButton = new Button(new XPATH('//div/button[contains(@class,"ant-btn-primary")]'), 'next button');
    }
    inputInsuranceObjects() {
        // this.#agentCommission.scrollElementToView();
        this.#insuranceObjectsTextbox.inputData(''.concat(
            Randomizer.getRandomString(true, true, true, true, false, 10, 50),
            ' ',
            'autotest',
        ));
    }

    uploadButtonClick() {
        this.#uploadButton.uploadFile(JSONLoader.testData.pathToTestPicture);
    }

    inputManagerComments() {
        this.#managerCommentsTextbox.inputData(''.concat(
            Randomizer.getRandomString(true, true, true, true, false, 10, 50),
            ' ',
            'autotest',
        ));
    }

    getUploadedFile() {
        this.#uploadedFile.clickElement();
    }

    clickSaveButton() {
        this.#saveButton.clickElement();
    }
}

module.exports = new QuoteStep5();
