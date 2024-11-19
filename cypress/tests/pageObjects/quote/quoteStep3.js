const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Randomizer = require('../../../main/utils/random/randomizer');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const RadioButton = require('../../../main/elements/baseElementChildren/radioButton');


class QuoteStep3 extends BaseForm {

    #franchiseType
    #franchiseForDamage
    #franchiseForLoss
    #additionalInformation
    #nextButton

    constructor() {
        super(new XPATH('//a[@href="/quotes"]'), 'Quote Page Step 3');
        this.#franchiseType = new RadioButton(new XPATH('//div[@id="form_item_option"]/child::label[1]'), 'franchise type');
        this.#franchiseForDamage = new Textbox(new XPATH('//input[@id="form_item_damage"]'),'textbox for franchise for damage');
        this.#franchiseForLoss = new Textbox(new XPATH('//input[@id="form_item_loss"]'), 'textbox for franchise for loss');
        this.#additionalInformation = new Textbox(new XPATH('//textarea[@id="form_item_info"]'), 'textbox for additional information');
        this.#nextButton = new Button(new XPATH('//div/button[contains(@class,"ant-btn-primary")]'), 'next button');
    }

    chooseFranchiseType() {
       Randomizer.getRandomElementByText(this.#franchiseType);
    }

    inputValueForDamageFranchise() {
        this.#franchiseForDamage.inputData(Randomizer.getRandomInteger());
    }
    inputValueForLossFranchise() {
        this.#franchiseForLoss.inputData(Randomizer.getRandomInteger());
    }
    inputAdditionalInformation() {
        this.#additionalInformation.inputData(''.concat(
            Randomizer.getRandomString(true, true, true, true, false, 10, 50),
            ' ',
            'autotest',
        ));
    }



    clickNextButton() {
        this.#nextButton.clickElement();
    }
}





module.exports = new QuoteStep3();
