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
    #channelDetailsDropdown
    #channelDetailsElements
    #insuranseTypesDropdown
    #insuranseTypesElements
    #alertButton
    #insuredProductsDropdown
    #insuredProductsElements
    #risksDropdown
    #risksElements
    #underwriterDropdown
    #underwriterElements

    #nextButton

    constructor() {
        super(new XPATH('//a[@href="/quotes"]'), 'Quote Page Step 4');
        this.#agentDropdown = new Button(new XPATH('//input[@id="form_item_agentId"]'), 'agent dropdown');
        this.#agentDropdownElements = new Button(new XPATH('//input[@id="form_item_agentId"]/ancestor::span/following-sibling::span'), 'agent dropdown elements');
        this.#contractTypeMain = new RadioButton(new XPATH('//input[@value="1"]'), 'contract type main radiobutton');
        this.#salesChannelsDropdown = new Button(new XPATH('//input[@id="form_item_salesChannelId"]'), 'sales channels dropdown');
        this.#salesChannelsElements = new Button(new XPATH('//div[@id="form_item_salesChannelId_list"]/following-sibling::div/child::div[1]/child::div/child::div/child::div'),'sales channels elements');
        this.#channelDetailsDropdown = new Button(new XPATH('//input[@id="form_item_channelDetailId"]'), 'channel details dropdown');
        this.#channelDetailsElements = new Button(new XPATH('//div[@id="form_item_channelDetailId_list"]/following::div/child::div/child::div/child::div'),'sales channels elements');
        this.#insuranseTypesDropdown = new Button(new XPATH('//input[@id="form_item_insuranceTypeId"]'), ' insured types dropdown');
        this.#insuranseTypesElements = new Button(new XPATH('//div[@id="form_item_insuranceTypeId_list"]/following::div/child::div/child::div/child::div'),'insured types elements');
        this.#alertButton = new Button(new  XPATH('//div[@class="ant-modal-confirm-btns"]'), 'alert button');
        this.#insuredProductsDropdown = new Button(new XPATH('//input[@id="form_item_insuranceProductId"]'), ' insured products dropdown');
        this.#insuredProductsElements = new Button(new XPATH('//div[@id="form_item_insuranceProductId_list"]/following::div/child::div'),'insured products elements');
        this.#risksDropdown = new Button(new XPATH('//input[@id="form_item_insuranceRiskIds"]'), 'risks dropdown');
        this.#risksElements = new Button(new XPATH('//div[@id="form_item_insuranceRiskIds_list"]/following::div/child::div/child::div/child::div'), 'risks elements');

        this.#underwriterDropdown = new Button(new XPATH('//input[@id="form_item_underwriterId"]'), 'underwriter dropdown');
        // this.#underwriterElements = new Button(new XPATH('//div[@id="form_item_underwriterId_list"]/following-sibling::div/child::div'), 'underwriter elements')
//div[@id="form_item_underwriterId_list"]/following-sibling::div/descendant::div[contains(@class,"holder-inner")]/descendant::div
        this.#underwriterElements = new Button(new XPATH('//div[@id="form_item_underwriterId_list"]/following-sibling::div/descendant::div[contains(@class,"holder-inner")]/descendant::div'), 'underwriter elements')
        this.#nextButton = new Button(new XPATH('//div/button[contains(@class,"ant-btn-primary")]'), 'next button');
    }

    clickContractTypeMain() {
        return this.#contractTypeMain.clickElement();
    }

//     clickRandomSalesChannels(salesChannelsNames, count) {
//         const result = this.#salesChannelsDropdown.chooseRandomElementsFromDropdownByText(
//             this.#salesChannelsElements,
//             {
//                 valuesList: salesChannelsNames,
//                 count,
//                 typeAndEnter: true,
//             },
//         );
//
//         return result;
// }
    clickRandomElement(randomElementText) {
        this.#salesChannelsDropdown.clickElement();
        return this.#salesChannelsElements.chooseElementFromDropdown(randomElementText,{
            typeAndEnter: true,
        });
    }
    // getRandomElement() {
    //     const result = this.#salesChannelsDropdown.chooseRandomElementsFromDropdownByText(this.#salesChannelsElements);
    //     console.log("res2", result);

        // return cy.wrap(this.#salesChannelsDropdown.chooseRandomElementsFromDropdownByText(this.#salesChannelsElements))

            // .then((selectedElement) => {
            //     console.log("res", selectedElement);
            //     return selectedElement;
            // }).catch((error) => {
            //     console.error("Ошибка в getRandomElement:", error);
            // });

        // return this.#salesChannelsDropdown.chooseRandomElementsFromDropdownByText(this.#salesChannelsElements);
            // .then((selectedElement) => {
            //     console.log("a", selectedElement);
            //     return selectedElement;
            // });

    // }



    clickRandomChannelDetails(channelDetails, count) {
        this.#channelDetailsDropdown.chooseRandomElementsFromDropdownByText(
            this.#channelDetailsElements,
            {
                valuesList:channelDetails,
                count,
                typeAndEnter: true,
            }
        )
    }

    clickRandomInsuranseType(insuranseTypes, count) {
        this.#insuranseTypesDropdown.chooseRandomElementsFromDropdownByText(
            this.#insuranseTypesElements,
            {
                valuesListPromise:insuranseTypes,
                count,
                typeAndEnter: true,
            },
        );
    }

    clickAlertIfExists() {
        this.#alertButton.elementIsExisting().then((value) => {
            if (value) this.#alertButton.clickElement();
        });
    }

    clickRandomInsuredProduct(insuredProducts, count) {
        this.#insuredProductsDropdown.chooseRandomElementsFromDropdownByText(
            this.#insuredProductsElements,
            {
                valuesListPromise:insuredProducts,
                count,
                typeAndEnter: true,
            },
        );
    }


    clickRandomRisks(risks, count) {
        this.#risksDropdown.scrollElementToView();

        this.#risksDropdown.chooseRandomElementsFromDropdownByText(
            this.#risksElements,
            {
                valuesListPromise:risks,
                count,
                typeAndEnter: true,
            },
        );
    }

    clickRandomUnderwriter() {
        this.#underwriterDropdown.chooseRandomElementsFromDropdownByText(this.#underwriterElements);
    }


    clickNextButton() {
        this.#nextButton.scrollElementToView();
        this.#nextButton.clickElement();
    }



}


module.exports = new QuoteStep4();
