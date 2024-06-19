const OGPOPage = require('../pageObjects/OGPO/OGPOStep5');
const mutualSteps = require('../pageObjects/mutual/mutualSteps');
const mutualStep1 = require('../pageObjects/mutual/mutualStep1');
const mutualStep2 = require('../pageObjects/mutual/mutualStep2');
const mutualStep3 = require('../pageObjects/mutual/mutualStep3');
const mutualStep4 = require('../pageObjects/mutual/mutualStep4');
const mutualStep5 = require('../pageObjects/mutual/mutualStep5');
const TimeUtils = require('../../main/utils/time/timeUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.userPathMutual = (holder, insured, car) => {
  it('Mutual user path:', { scrollBehavior: false }, () => {
    OGPOPage.clickMutualButton();
    OGPOPage.clickConfirmIssueMutualButton();

    mutualSteps.pageIsDisplayed();
    mutualSteps.clickHolderStepButton();
    mutualStep1.pageIsDisplayed();
    mutualStep1.juridicalSwitchIsChecked().should('be.false');
    mutualStep1.IPSwitchIsChecked().should('be.false');
    mutualStep1.residentSwitchIsChecked().should('be.true');
    mutualStep1.getIINText()
      .should('be.equal', holder.iin);
    mutualStep1.getLastNameText()
      .should('be.equal', holder.last_name);
    mutualStep1.getFirstNameText()
      .should('be.equal', holder.first_name);
    mutualStep1.getMiddleNameText()
      .should('be.equal', holder.middle_name);
    mutualStep1.getDateOfBirthText()
      .should('be.equal', holder.born.DMY);
    mutualStep1.getSexText()
      .should('be.equal', holder.sex_id);
    mutualStep1.getDocumentTypeText()
      .should('be.equal', holder.document_type_id);
    mutualStep1.getDocumentNumberText()
      .should('be.equal', holder.document_number);
    mutualStep1.getDocumentIssueDateText()
      .should('be.equal', holder.document_gived_date.DMY);
    mutualStep1.getAddressText()
      .should('be.equal', holder.address);
    mutualStep1.getEmailText()
      .should('be.equal', holder.email);
    mutualStep1.getMobileNumberText()
      .should('be.equal', holder.phoneFormatted);
    mutualStep1.getIsPDLText()
      .should('be.equal', holder.pdl);

    mutualSteps.clickInsuredStepButton();
    mutualStep2.pageIsDisplayed();
    mutualStep2.juridicalSwitchIsChecked().should('be.false');
    mutualStep2.IPSwitchIsChecked().should('be.false');
    mutualStep2.residentSwitchIsChecked().should('be.true');
    mutualStep2.getIINText()
      .should('be.equal', insured.iin);
    mutualStep2.getLastNameText()
      .should('be.equal', insured.last_name);
    mutualStep2.getFirstNameText()
      .should('be.equal', insured.first_name);
    mutualStep2.getMiddleNameText()
      .should('be.equal', insured.middle_name);
    mutualStep2.getDateOfBirthText()
      .should('be.equal', insured.born.DMY);
    mutualStep2.getSexText()
      .should('be.equal', insured.sex_id);
    mutualStep2.getDocumentTypeText()
      .should('be.equal', insured.document_type_id);
    mutualStep2.getDocumentNumberText()
      .should('be.equal', insured.document_number);
    mutualStep2.getDocumentIssueDateText()
      .should('be.equal', insured.document_gived_date.DMY);
    const insuredFullName = `${insured.last_name} ${insured.first_name} ${insured.middle_name}`;
    mutualStep2.getInsuredLastnameTabText()
      .should('be.equal', insured.last_name);
    mutualStep2.getClassIDText()
      .should('be.equal', insured.bonus_malus);
    mutualStep2.getDriverLicenceTypeText()
      .should('be.equal', insured.driver_certificate_type_id);
    mutualStep2.getDriverLicenceNumberText()
      .should('be.equal', insured.driving_license);
    mutualStep2.getDriverLicenceIssueDateText()
      .should('be.equal', insured.date_issue_license.DMY);
    mutualStep2.experienceLessThan2YearsSwitchIsChecked()
      .should('be.false');
    mutualStep2.getIsPensionerText()
      .should('be.equal', insured.invalid_bool);
    mutualStep2.getIsInvalidText()
      .should('be.equal', insured.pensioner_bool);
    mutualStep2.getIsPDLText()
      .should('be.equal', insured.pdl);

    mutualSteps.clickCarStepButton();
    mutualStep3.pageIsDisplayed();
    mutualStep3.getCarTabText()
      .should('be.equal', car.reg_num);
    mutualStep3.getCarRegNumText()
      .should('be.equal', car.reg_num);
    mutualStep3.getCarRegCertNumText()
      .should('be.equal', car.reg_cert_num);
    mutualStep3.getCarRegDateLabelText()
      .should('be.equal', car.dt_reg_cert.DMY);
    mutualStep3.getCarRegionText()
      .should('be.equal', car.region_id);
    mutualStep3.getCarVINText()
      .should('be.equal', car.vin);
    mutualStep3.getCarTypeText()
      .should('be.equal', car.type_id);
    mutualStep3.getCarManufacturedYearText()
      .should('be.equal', car.year);
    mutualStep3.getCarEngineVolumeText()
      .should('be.equal', car.engine_volume);
    mutualStep3.getCarMarkText()
      .should('be.equal', car.mark);
    mutualStep3.getCarModelText()
      .should('be.equal', car.model);

    mutualSteps.clickOGPOPolicyStepButton();
    mutualStep4.pageIsDisplayed();
    cy.getLocalStorage('OGPOPolicyNumber')
      .then((storedValue) => mutualStep4.getOGPOPolicyNumberText()
        .should('be.equal', storedValue));
    mutualStep4.getOGPOPolicyStatusText()
      .should('be.equal', JSONLoader.testData.issuedStatus);
    const { startDate } = TimeUtils.getDatesInterval(
      ...JSONLoader.testData.timeIncrement,
      { startNextDay: false },
    );
    mutualStep4.getSlicedOGPOPolicyIssueDateText()
      .should('be.equal', startDate);
    cy.getLocalStorage('OGPOPolicyInsurancePeriod')
      .then((storedValue) => mutualStep4.getOGPOInsurancePeriodText()
        .should('be.equal', storedValue));
    const holderFullName = `${holder.last_name} ${holder.first_name} ${holder.middle_name}`;
    mutualStep4.getOGPOHolderText()
      .should('be.equal', holderFullName);
    mutualStep4.getOGPOListOfInsuredPeopleText()
      .should('be.equal', insuredFullName);
    const listOfCars = `${car.mark}, ${car.model}, ${car.reg_num}`;
    mutualStep4.getOGPOListOfCarsText()
      .should('be.equal', listOfCars);

    mutualSteps.clickIssueMutualPolicyStepButton();
    mutualStep5.pageIsDisplayed();
    mutualStep5.getStatusText()
      .should('be.equal', JSONLoader.testData.draftStatus);
    cy.getLocalStorage('OGPOPolicyInsurancePeriod')
      .then((storedValue) => mutualStep5.getInsurancePeriodText()
        .should('be.equal', storedValue));
    mutualStep5.getUnifiedCombinedLimitText()
      .should('be.equal', JSONLoader.testData.unifiedCombinedLimit);
    mutualStep5.getPremiumText()
      .should('be.equal', JSONLoader.testData.mutualPremium);
    mutualStep5.clickIssuePolicyButton();
    mutualStep5.getPolicyNumberText().should('contain', JSONLoader.testData.mutualPolicyCodeNumber);
    mutualStep5.getPaymentCode().then((code) => {
      cy.setLocalStorage('paymentCode', code);
      cy.setLocalStorage('sumToPay', JSONLoader.testData.mutualPremium);
    });
    cy.setLocalStorage('installmentPayment', false);
  });
};
