const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Randomizer = require('../../../main/utils/random/randomizer');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const RadioButton = require('../../../main/elements/baseElementChildren/radioButton');
const TAG = require("../../../main/locators/baseLocatorChildren/TAG");

class QuoteStep3 extends BaseForm {
    #franchiseOption
    #choosedFranchiseOption
    #franchiseType
    #choosedFranchiseType
    #franchiseForDamage
    #franchiseForLoss
    #additionalInformation
    #nextButton
    constructor() {
        super(new XPATH('//label[@for="form_item_option"]'), 'Quote Page Step 3');
        this.#franchiseOption = new RadioButton(new XPATH('//div[@id="form_item_option"]/descendant::label'), 'franchise type');
        this.#franchiseType = new RadioButton(new XPATH('//div[@id="form_item_typeId"]/descendant::label'), 'franchise type');
        this.#franchiseForDamage = new Textbox(new XPATH('//input[@id="form_item_damage"]'),'textbox for franchise for damage');
        this.#franchiseForLoss = new Textbox(new XPATH('//input[@id="form_item_loss"]'), 'textbox for franchise for loss');
        this.#additionalInformation = new Textbox(new XPATH('//textarea[@id="form_item_info"]'), 'textbox for additional information');
        this.#nextButton = new Button(new XPATH('//div/button[contains(@class,"ant-btn-primary")]'), 'next button');
        this.#choosedFranchiseOption = new Button(new XPATH('//div[@id="form_item_option"]/descendant::span[contains(@class,"ant-radio-checked")]/following-sibling::span'), 'choosed franchise option');
        this.#choosedFranchiseType = new Button(new XPATH('//div[@id="form_item_typeId"]/descendant::span[contains(@class,"ant-radio-checked")]/following-sibling::span'),'choosed franchise type');

    }

    chooseFranchiseOption() {
        this.#franchiseOption.clickElement();
    }


    chooseFranchiseType() {
        return this.#franchiseType.getElements().then((type) => {
            const randomIndex = Randomizer.getRandomInteger(type.length - 1);
            const randomElement = new Button(new TAG(type[randomIndex]), 'random franchise type element');
            randomElement.clickElement();
        });
    }

    inputValueForDamageFranchise() {
       return this.#franchiseForDamage.inputData(Randomizer.getRandomInteger(40, 1));
    }

    inputValueForLossFranchise() {
        this.#franchiseForLoss.inputData(Randomizer.getRandomInteger(40,1));
    }

    inputAdditionalInformation() {
        this.#additionalInformation.inputData('Франшиза применяется только в случае частичного ущерба (например, повреждение кузова, стекол, фар и т.д.).');
    }

    clickNextButton() {
        this.#nextButton.clickElement();
    }

    checkValueFranchiseForDamage() {
        return this.#franchiseForDamage.getValue();
    }

    checkValueFranchiseForLoss() {
        return this.#franchiseForLoss.getValue();
    }

    changeFranchiseForDamage() {
        this.#franchiseForDamage.clearData();
        this.#franchiseForDamage.inputData(Randomizer.getRandomInteger(9999, 100));
    }

    changeFranchiseForLoss() {
        this.#franchiseForLoss.clearData();
        this.#franchiseForLoss.inputData(Randomizer.getRandomInteger(9999, 100));
    }


}

module.exports = new QuoteStep3();
