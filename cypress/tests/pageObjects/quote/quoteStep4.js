const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const RadioButton = require('../../../main/elements/baseElementChildren/radioButton');



class QuoteStep4 extends BaseForm {
    #agentDropdown
    #agentDropdownElements
    #contractTypeMain
    #salesChannelsDropdown
    #salesChannelsElements
    #insuredProductsDropdown
    #insuredProductsElements
    #kasko
    #nextButton

    constructor() {
        super(new XPATH('//a[@href="/quotes"]'), 'Quote Page Step 4');
        this.#agentDropdown = new Button(new XPATH('//input[@id="form_item_agentId"]'), 'agent dropdown');
        this.#agentDropdownElements = new Button(new XPATH('//input[@id="form_item_agentId"]/ancestor::span/following-sibling::span'), 'agent dropdown elements');
        this.#contractTypeMain = new RadioButton(new XPATH('//input[@value="1"]'), 'contract type main radiobutton');



        this.#salesChannelsDropdown = new Button(new XPATH('//input[@id="form_item_salesChannelId"]'), 'sales channels dropdown');
        this.#salesChannelsElements = new Button(new XPATH('//label[text()="Канал продажи"]/parent::div/following::div/descendant::div[1]'),'sales channels elements');



        this.#insuredProductsDropdown = new Button(new XPATH('//input[@id="form_item_insuranceProductId"]'), ' insured products dropdown');
        this.#insuredProductsElements = new Button(new XPATH('//div[@class="rc-virtual-list-holder-inner"]/child::div[@id and @code]/child::div'),'insured products elements');

        this.#kasko = new Button(new XPATH('//div[@class="rc-virtual-list-holder-inner"]/child::div[@id="24"]'), 'KASKO')
        this.#nextButton = new Button(new XPATH('//div/button[contains(@class,"ant-btn-primary")]'), 'next button');
    }


    // clickContractTypeMain() {
    //     this.#contractTypeMain.clickElement();
    // }
    // chooseSalesChannel() {
    //     this.#salesChannelsDropdown.chooseRandomElementsFromDropdownByText(this.#salesChannelsElements);
    // }

    clickRandomSalesChannels(salesChannels, count) {
        this.#salesChannelsDropdown.chooseRandomElementsFromDropdownByText(
            this.#salesChannelsElements,
            {
                valuesListPromise:salesChannels,
                count,
                typeAndEnter: false,
            },
        );
    }


    // clickNextButton() {
    //     this.#nextButton.scrollElementToView();
    //     this.#nextButton.clickElement();
    // }
}





module.exports = new QuoteStep4();
