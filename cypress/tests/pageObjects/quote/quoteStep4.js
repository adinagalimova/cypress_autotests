const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const RadioButton = require('../../../main/elements/baseElementChildren/radioButton');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const Randomizer = require("../../../main/utils/random/randomizer");
const TAG = require("../../../main/locators/baseLocatorChildren/TAG");

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
    #insuranseTypesDropdown
    #insuranseTypesElements
    #alertButton
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

    constructor() {
        super(new XPATH('//a[@href="/quotes"]'), 'Quote Page Step 4');
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
        this.#insuranseTypesDropdown = new Button(new XPATH('//input[@id="form_item_insuranceTypeId"]'), ' insured types dropdown');
        this.#insuranseTypesElements = new Button(new XPATH('//div[@id="form_item_insuranceTypeId_list"]/following::div/child::div/child::div/child::div'),'insured types elements');
        this.#alertButton = new Button(new  XPATH('//div[@class="ant-modal-confirm-btns"]'), 'alert button');
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
    }

    chooseAgent() {
        this.#agentDropdown.clickElement();
        this.#agentDropdownElements.clickElement();
    }
    inputAgentCommission() {
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
        const underwriter = 'ВОРОНКОВА АЛИНА АНДРЕЕВНА';
        this.#underwriterDropdown.chooseElementFromDropdown(underwriter,{
            typeAndEnter: true
        });
    }

    clickReinsuranceRequired() {
        this.#reinsuranceRequired.clickElement();
        return this.#reinsuranceRequired.getText();
    }


    clickReinsuranceType() {
        return this.#reinsuranceType.getElements().then((reinsuranceType) => {
            const randomIndex = Randomizer.getRandomInteger(reinsuranceType.length - 1);
            const randomElement = new Button(new TAG(reinsuranceType[randomIndex]), 'random contract type element');
            randomElement.clickElement();
        });
    }

    inputInsurancePeriod() {
        this.#insurancePeriod.inputData(365);
    }

    inputInsuranceAmount() {
        this.#insuranceAmount.inputData(Randomizer.getRandomInteger(900,0));
    }

    inputTariff() {
        this.#tariff.inputData(Randomizer.getRandomInteger());
    }

    clickRandomSalesChannel(randomElementText) {
        this.#salesChannelsDropdown.clickElement();
        this.#channelDetailsElements.chooseElementFromDropdown(randomElementText, { typeAndEnter: true });
    }
    clickRandomChannelDetail(randomElementText) {
        this.#channelDetailsDropdown.clickElement();
        this.#channelDetailsElements.chooseElementFromDropdown(randomElementText, { typeAndEnter: true });
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
//     clickRandomElement(randomElementText) {
//         this.#salesChannelsDropdown.clickElement();
//         return this.#salesChannelsElements.chooseElementFromDropdown(randomElementText,{
//             typeAndEnter: true,
//         });
//     }
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



    // clickRandomChannelDetails(channelDetails, count) {
    //     this.#channelDetailsDropdown.chooseRandomElementsFromDropdownByText(
    //         this.#channelDetailsElements,
    //         {
    //             valuesList:channelDetails,
    //             count,
    //             typeAndEnter: true,
    //         }
    //     )
    // }
    //
    // clickRandomInsuranseType(insuranseTypes, count) {
    //     this.#insuranseTypesDropdown.chooseRandomElementsFromDropdownByText(
    //         this.#insuranseTypesElements,
    //         {
    //             valuesListPromise:insuranseTypes,
    //             count,
    //             typeAndEnter: true,
    //         },
    //     );
    // }
    //
    // clickAlertIfExists() {
    //     this.#alertButton.elementIsExisting().then((value) => {
    //         if (value) this.#alertButton.clickElement();
    //     });
    // }
    //
    // clickRandomInsuredProduct(insuredProducts, count) {
    //     this.#insuredProductsDropdown.chooseRandomElementsFromDropdownByText(
    //         this.#insuredProductsElements,
    //         {
    //             valuesListPromise:insuredProducts,
    //             count,
    //             typeAndEnter: true,
    //         },
    //     );
    // }
    //
    //
    // clickRandomRisks(risks, count) {
    //     this.#risksDropdown.scrollElementToView();
    //
    //     this.#risksDropdown.chooseRandomElementsFromDropdownByText(
    //         this.#risksElements,
    //         {
    //             valuesListPromise:risks,
    //             count,
    //             typeAndEnter: true,
    //         },
    //     );
    // }
    //
    // clickRandomUnderwriter() {
    //     this.#underwriterDropdown.chooseRandomElementsFromDropdownByText(this.#underwriterElements);
    // }


    clickNextButton() {
        this.#nextButton.scrollElementToView();
        this.#nextButton.clickElement();
    }


}


module.exports = new QuoteStep4();
