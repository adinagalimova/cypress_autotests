const mainPage = require('../pageObjects/mainPage');
const kaskoStep1 = require('../pageObjects/kasko/kaskoStep1');
const kaskoStep2 = require('../pageObjects/kasko/kaskoStep2');
const kaskoStep3 = require('../pageObjects/kasko/kaskoStep3');
const kaskoStep4 = require('../pageObjects/kasko/kaskoStep4');
const kaskoStep5 = require('../pageObjects/kasko/kaskoStep5');
const kaskoStep6 = require('../pageObjects/kasko/kaskoStep6');
const kaskoStep7 = require('../pageObjects/kasko/kaskoStep7');

exports.userPathKasko = (holder, car) => {
  it('Kasko user path:', { scrollBehavior: false }, () => {
    mainPage.clickKaskoButton();

    kaskoStep1.pageIsDisplayed();
    kaskoStep1.chooseAgentManager();
    kaskoStep1.chooseCarMark(car.mark.KASKO.set);
    kaskoStep1.chooseCarModel(car.model.KASKO.set);
    kaskoStep1.inputCarManufacturedYear(car.year);
    kaskoStep1.inputCarEngineVolume(car.engine_volume);
    kaskoStep1.inputInsuranceSumTextbox();
    kaskoStep1.clickCalculateButton();
    let insuranceSum;
    kaskoStep1.getInsuranceSumText()
      .then((insuranceSumValue) => { insuranceSum = insuranceSumValue; });
    kaskoStep1.additionalEquipmentSwitchIsChecked().should('be.false');
    kaskoStep1.usedAutoSwitchIsChecked().should('be.false');
    kaskoStep1.clickSaveButton();

    kaskoStep2.pageIsDisplayed();
    kaskoStep2.clickRandomTariff();

    kaskoStep3.pageIsDisplayed();
    kaskoStep3.inputIIN(holder.iin);
    kaskoStep3.clickSearchClientButton();
    const fullName = ''.concat(holder.last_name, ' ', holder.first_name, ' ', holder.middle_name);
    const firstAndLastName = ''.concat(holder.last_name, ' ', holder.first_name);
    kaskoStep3.getOrSetFullNameElement(fullName)
      .should('have.value', fullName);
    kaskoStep3.getDocumentTypeText()
      .should('be.equal', holder.document_type_id);
    kaskoStep3.getDocumentNumberElement()
      .should('have.value', holder.document_number);
    kaskoStep3.getDocumentIssueDateElement()
      .should('have.value', holder.document_gived_date.DMY);
    kaskoStep3.getOrSetDocumentIssuedByElement(holder.document_gived_by)
      .should('be.equal', holder.document_gived_by);
    kaskoStep3.inputAddress(holder.address);
    kaskoStep3.inputPhone(holder.phone);
    kaskoStep3.inputEmail(holder.email);
    kaskoStep3.randomlyClickPDLCheckbox();
    kaskoStep3.clickSaveButton();

    kaskoStep4.pageIsDisplayed();
    kaskoStep4.inputCarRegNum(car.reg_num);
    kaskoStep4.inputCarRegCertNum(car.reg_cert_num);
    kaskoStep4.clickSearchCarButton();
    kaskoStep4.getCarMarkElement()
      .should('have.value', car.mark.KASKO.get);
    kaskoStep4.getCarModelElement()
      .should('have.value', car.model.KASKO.get);
    kaskoStep4.getCarManufacturedYearElement()
      .should('have.value', car.year);
    kaskoStep4.getCarVINElement()
      .should('have.value', car.vin);
    kaskoStep4.getCarRegionText()
      .should('be.equal', car.region_id);
    kaskoStep4.getCarRegDateElement()
      .should('have.value', car.dt_reg_cert.DMY);
    kaskoStep4.getInsuranceSumText()
      .then((insuranceSumValue) => cy.wrap(insuranceSumValue)
        .should('be.equal', insuranceSum));
    kaskoStep4.clickSaveButton();

    kaskoStep5.pageIsDisplayed();
    kaskoStep5.clickNaturalPersonSwitch();
    kaskoStep5.inputIINBIN(holder.iin);
    kaskoStep5.clickSearchBeneficiaryButton();
    kaskoStep5.getBeneficiaryFullNameElement()
      .should('contain.value', firstAndLastName);
    kaskoStep5.clickSaveButton();

    kaskoStep6.pageIsDisplayed();
    kaskoStep6.chooseInsurancePeriod();
    kaskoStep6.getPremiumElement()
      .then((premium) => cy.setLocalStorage('sumToPay', premium));
    kaskoStep6.choosePaymentType();
    kaskoStep6.getPaymentType().then((paymentTypeText) => {
      if (paymentTypeText === 'В рассрочку') {
        kaskoStep6.chooseInstallmentPaymentCount();
        kaskoStep6.chooseInstallmentFirstPaymentDate();
        cy.setLocalStorage('installmentPayment', true);
      } else {
        cy.setLocalStorage('installmentPayment', false);
      }
    });
    kaskoStep6.clickSaveButton();

    kaskoStep7.pageIsDisplayed();
    kaskoStep7.getHolderLabelText()
      .should('be.equal', fullName);
    kaskoStep7.getBeneficiaryLabelTextboxElement()
      .should('contain.text', firstAndLastName);
    const carFullName = ''.concat(car.mark.KASKO.get, ' ', car.model.KASKO.get, ', ', car.reg_num);
    kaskoStep7.getInsuredCarLabelText()
      .should('be.equal', carFullName);
    kaskoStep7.choosePolicyStartDate();
    let policyStartDate = '';
    kaskoStep7.getPolicyStartDateTitle()
      .then((date) => { policyStartDate = date; });
    kaskoStep7.inputAdditionalInfo();
    let additionalInfo = 'default';
    kaskoStep7.getAdditionalInfoTextboxValue()
      .then((text) => { additionalInfo = text; });
    kaskoStep7.clickSaveButton();
    kaskoStep7.clickIssueButton();

    kaskoStep7.pageIsDisplayed();
    kaskoStep7.getHolderLabelText()
      .should('be.equal', fullName);
    kaskoStep7.getBeneficiaryLabelTextboxElement()
      .should('contain.text', firstAndLastName);
    kaskoStep7.getInsuredCarLabelText()
      .should('be.equal', carFullName);
    kaskoStep7.getPolicyStartDateTitle()
      .then((date) => cy.wrap(date)
        .should('be.equal', policyStartDate));
    kaskoStep7.getAdditionalInfoTextboxValue()
      .then((text2) => cy.wrap(text2)
        .should('be.equal', additionalInfo));
    kaskoStep7.getPolicyNumberText()
      .then((policyNumber) => cy.setLocalStorage('policyNumber', policyNumber));
    kaskoStep7.getPaymentCode()
      .then((code) => cy.setLocalStorage('paymentCode', code));
  });
};
