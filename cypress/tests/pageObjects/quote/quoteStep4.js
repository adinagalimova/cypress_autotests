const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const RadioButton = require('../../../main/elements/baseElementChildren/radioButton');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const Randomizer = require("../../../main/utils/random/randomizer");
const TAG = require("../../../main/locators/baseLocatorChildren/TAG");
const Label = require('../../../main/elements/baseElementChildren/label');

class QuoteStep4 extends BaseForm {
    #agentDropdown
    #agentDropdownElements
    #agentCommission
    #contractType
    #choosenContractType
    #contractNumber
    #contractQuoteNumber
    #salesChannelsDropdown
    #salesChannelsElements
    #channelDetailsDropdown
    #channelDetailsElements
    #insuranceTypesDropdown
    #insuranceTypesElements
    #alertButton
    #alertLabel
    #insuredProductsDropdown
    #insuredProductsElements
    #risksDropdown
    #risksElements
    #underwriterDropdown
    #choosenUnderwriter
    #reinsuranceRequired
    #reinsuranceType
    #insurancePeriod
    #insuranceAmount
    #tariff
    #nextButton
    #businessExpensesTextbox
    #chosenAgent
    #chosenSalesChannel
    #chosenChannelDetail
    #chosenInsuranceType
    #chosenInsuranceProduct
    #chosenRisks

    constructor() {
        super(new XPATH('//label[@for="form_item_agentId"]'), 'Quote Page Step 4');
        this.#agentDropdown = new Button(new XPATH('//input[@id="form_item_agentId"]'), 'agent dropdown');
        this.#agentDropdownElements = new Button(new XPATH('//div[contains(@title,"ТОВАРИЩЕСТВО")]'), 'agent dropdown elements');
        this.#agentCommission = new Textbox(new XPATH('//input[@id="form_item_agentCommission"]'), 'agent commission');
        this.#contractType = new RadioButton(new XPATH('//div[@id="form_item_contractTypeId"]/child::label'), 'contract type radiobutton');
        this.#choosenContractType = new Button(new XPATH('//div[@id="form_item_contractTypeId"]/child::label[contains(@class,"ant-radio-wrapper-checked")]'), 'choosen contract type');
        this.#contractNumber = new Textbox(new XPATH('//input[@id="form_item_contractNumber"]'), 'contract number');
        this.#contractQuoteNumber = new Textbox(new XPATH('//input[@id="form_item_contractQuoteNumber"]'), 'contract quote number');
        this.#salesChannelsDropdown = new Button(new XPATH('//input[@id="form_item_salesChannelId"]'), 'sales channels dropdown');
        this.#salesChannelsElements = new Button(new XPATH('//div[@id="form_item_salesChannelId_list"]/following-sibling::div/child::div[1]/child::div/child::div/child::div'),'sales channels elements');
        this.#channelDetailsDropdown = new Button(new XPATH('//input[@id="form_item_channelDetailId"]'), 'channel details dropdown');
        this.#channelDetailsElements = new Button(new XPATH('//div[@id="form_item_channelDetailId_list"]/following::div/child::div/child::div/child::div'),'sales channels elements');
        this.#insuranceTypesDropdown = new Button(new XPATH('//input[@id="form_item_insuranceTypeId"]'), ' insured types dropdown');
        this.#insuranceTypesElements = new Button(new XPATH('//div[@id="form_item_insuranceTypeId_list"]/following::div/child::div/child::div/child::div'),'insured types elements');
        this.#alertLabel = new Label(new XPATH('//button[@type="button"]/child::span[text()="OK"]'), 'alert label');
        this.#alertButton = new Button(new  XPATH('//div[@class="ant-modal-confirm-btns"]/descendant::span'), 'alert button');
        this.#insuredProductsDropdown = new Button(new XPATH('//input[@id="form_item_insuranceProductId"]'), ' insured products dropdown');
        this.#insuredProductsElements = new Button(new XPATH('//div[@id="form_item_insuranceProductId_list"]/following::div/child::div'),'insured products elements');
        this.#risksDropdown = new Button(new XPATH('//input[@id="form_item_insuranceRiskIds"]'), 'risks dropdown');
        this.#risksElements = new Button(new XPATH('//div[@id="form_item_insuranceRiskIds_list"]/following::div/child::div/child::div/child::div'), 'risks elements');
        this.#underwriterDropdown = new Button(new XPATH('//input[@id="form_item_underwriterId"]'), 'underwriter dropdown');
        this.#choosenUnderwriter = new Button(new XPATH('//div[@aria-label="ВОРОНКОВА АЛИНА АНДРЕЕВНА"]'), 'choosen underwriter');
        this.#reinsuranceRequired = new RadioButton(new XPATH('//input[@id="form_item_reinsuranceRequired"]'), 'reinsurance required radiobutton');
        this.#reinsuranceType = new RadioButton(new XPATH('//div[@id="form_item_reinsuranceTypeId"]/descendant::div'),'reinsurance type');
        this.#insurancePeriod = new Textbox(new XPATH('//input[@id="form_item_insurancePeriod"]'), 'insurance period');
        this.#insuranceAmount = new Textbox(new XPATH('//input[@id="form_item_insuranceAmount"]'), 'insurance amount');
        this.#tariff = new Textbox(new XPATH('//input[@id="form_item_tariff"]'),'tariff textbox');
        this.#nextButton = new Button(new XPATH('//div/button[contains(@class,"ant-btn-primary")]'), 'next button');
        this.#businessExpensesTextbox = new Textbox(new XPATH('//input[@id="form_item_businessExpenses"]'), 'business expenses textbox');
        this.#chosenAgent = new Button(new XPATH('//input[@id="form_item_agentId"]/parent::span/following-sibling::span'), 'chosen agent');
        this.#chosenSalesChannel = new Button(new XPATH('//input[@id="form_item_salesChannelId"]/parent::span/following-sibling::span'), 'chosen sales channel');
        this.#chosenChannelDetail = new Button(new XPATH('//input[@id="form_item_channelDetailId"]/parent::span/following-sibling::span'), 'chosen channel detail');
        this.#chosenInsuranceType = new Button(new XPATH('//input[@id="form_item_insuranceTypeId"]/parent::span/following-sibling::span'), 'chosen insurance type');
        this.#chosenInsuranceProduct = new Button(new XPATH('//input[@id="form_item_insuranceProductId"]/parent::span/following-sibling::span'), 'chosen insurance product');
        this.#chosenRisks = new Button(new XPATH('//div[@class="ant-select-selection-overflow-item"]/descendant::span[@class="ant-select-selection-item-content"]'), 'chosen risks')
    }

    chooseAgent() {
        this.#agentDropdown.clickElement();
        return this.#agentDropdownElements.clickElement();
    }

    inputAgentCommission() {
        this.#agentCommission.scrollElementToView();
         this.#agentCommission.inputData(Randomizer.getRandomInteger(99,1));
    }

    clickContractType() {
        return this.#contractType.getElements().then((contractType) => {
                    const randomIndex = Randomizer.getRandomInteger(contractType.length - 1);
                    const randomElement = new Button(new TAG(contractType[randomIndex]), 'random contract type element');
                    randomElement.clickElement();
                });
    }

    getChosenContractType() {
        return this.#choosenContractType.getText();
    }

    inputContractNumber() {
        this.#contractNumber.inputData(Randomizer.getRandomInteger(999999,10000));
    }

    inputContractQuoteNumber() {
        this.#contractQuoteNumber.inputData(Randomizer.getRandomInteger(999999,10000));
    }

    chooseUnderwriter() {
        this.#underwriterDropdown.scrollElementToView();
        // const underwriter = 'Уланов Евгений Николаевич';
        const underwriter = 'ВОРОНКОВА АЛИНА АНДРЕЕВНА';
        this.#underwriterDropdown.chooseElementFromDropdown(underwriter,{
            typeAndEnter: true
        });
    }

    clickReinsuranceRequired() {
        this.#reinsuranceRequired.clickElement();
    }

    clickReinsuranceType() {
        return this.#reinsuranceType.getElements().then((reinsuranceType) => {
            const randomIndex = Randomizer.getRandomInteger(reinsuranceType.length - 1);
            const randomElement = new Button(new TAG(reinsuranceType[randomIndex]), 'random contract type element');
            randomElement.clickElement();
        });
    }

    clickRandomRisks() {
        this.#risksDropdown.scrollElementToView();
        this.#risksDropdown.chooseRandomElementsFromDropdownByText(this.#risksElements,{
            typeAndEnter: true
        });
    }

    inputInsurancePeriod() {
        this.#insurancePeriod.inputData(365);
    }

    inputInsuranceAmount() {
        this.#insuranceAmount.chooseElementFromDropdown('1000000', { typeAndEnter: true });
        // this.#insuranceAmount.clickElement();
        // this.#insuranceAmount.inputData('1000000');
    }

    inputTariff() {
        this.#tariff.inputData(Randomizer.getRandomInteger());
    }

    clickRandomSalesChannel(randomElementText) {
        this.#salesChannelsDropdown.clickElement();
        this.#salesChannelsElements.chooseElementFromDropdown(randomElementText, { typeAndEnter: true });
    }
    clickRandomChannelDetail(randomElementText) {
        this.#channelDetailsDropdown.clickElement();
        this.#channelDetailsElements.chooseElementFromDropdown(randomElementText, { typeAndEnter: true });
    }
    clickRandomInsuranceType(randomElementText) {
        this.#salesChannelsDropdown.scrollElementToView();
        this.#insuranceTypesDropdown.clickElement();
        this.#insuranceTypesElements.chooseElementFromDropdown(randomElementText, { typeAndEnter: true });
    }

    clickRandomInsuredProduct(randomElementText) {
        this.#insuredProductsDropdown.clickElement();
        this.#insuredProductsElements.chooseElementFromDropdown(randomElementText, { typeAndEnter: true });
    }

    clickNextButton() {
        this.#nextButton.scrollElementToView();
        this.#nextButton.clickElement();
    }

    changeRisks() {
        this.#risksDropdown.scrollElementToView();
        this.#risksDropdown.chooseRandomElementsFromDropdownByText(this.#risksElements,{
            typeAndEnter: true
        });
    }

    checkChosenAgent() {
        return this.#chosenAgent.getText();
    }

    checkSalesChannel() {
        return this.#chosenSalesChannel.getText();
    }

    checkChannelDetails() {
        return this.#chosenChannelDetail.getText();
    }

    checkInsuranceType() {
        return this.#chosenInsuranceType.getText();
    }

    checkInsuranceProduct() {
        return this.#chosenInsuranceProduct.getText();
    }

    checkRisks() {
        return this.#chosenRisks.getText();
    }
    checkInsurancePeriod() {
        return this.#insurancePeriod.getValue();
    }
    checkInsuranceAmount() {
        return this.#insuranceAmount.getValue();
    }
    checkTariff() {
        return this.#tariff.getValue();
    }
    inputBusinessExpenses() {
            this.#businessExpensesTextbox.inputData(Randomizer.getRandomInteger(40,1));
    }

    checkBusinessExpenses() {
        return this.#businessExpensesTextbox.getValue();
    }


    changeTariffAmount() {
        this.#tariff.clearData();
        this.#tariff.inputData(Randomizer.getRandomInteger());
    }


}

module.exports = new QuoteStep4();
