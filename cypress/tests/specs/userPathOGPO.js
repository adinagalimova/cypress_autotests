const mainPage = require('../pageObjects/mainPage');
const OGPOStep1 = require('../pageObjects/OGPO/OGPOStep1');
const OGPOStep2 = require('../pageObjects/OGPO/OGPOStep2');
const OGPOStep3 = require('../pageObjects/OGPO/OGPOStep3');
const OGPOStep4 = require('../pageObjects/OGPO/OGPOStep4');
const OGPOStep5 = require('../pageObjects/OGPO/OGPOStep5');
const NodeEvents = require('../../support/nodeEvents');
const TimeUtils = require('../../main/utils/time/timeUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.userPathOGPO = (holder, insured, car) => {
  it('OGPO user path:', { scrollBehavior: false }, () => {
    NodeEvents.resetClient(holder);
    NodeEvents.resetClient(insured);

    mainPage.clickOGPOButton();

    OGPOStep1.pageIsDisplayed();
    OGPOStep1.juridicalSwitchIsChecked().should('be.false');
    OGPOStep1.IPSwitchIsChecked().should('be.false');
    OGPOStep1.residentSwitchIsChecked().should('be.true');
    OGPOStep1.inputIIN(holder.iin);
    OGPOStep1.clickSearchClientButton();
    OGPOStep1.getLastNameElement()
      .should('have.value', holder.last_name);
    OGPOStep1.getFirstNameElement()
      .should('have.value', holder.first_name);
    OGPOStep1.getOrSetMiddleNameElement(holder.middle_name)
      .should('have.value', holder.middle_name);
    OGPOStep1.getDateOfBirthElement()
      .should('have.value', holder.born.DMY);
    OGPOStep1.getSexText()
      .should('be.equal', holder.sex_id);
    OGPOStep1.getDocumentTypeText()
      .should('be.equal', holder.document_type_id);
    OGPOStep1.getDocumentNumberElement()
      .should('have.value', holder.document_number);
    OGPOStep1.getDocumentIssueDateElement()
      .should('have.value', holder.document_gived_date.DMY);
    OGPOStep1.inputAddress(holder.address);
    OGPOStep1.inputEmail(holder.email);
    OGPOStep1.inputPhone(holder.phone);
    OGPOStep1.insuredSwitchIsChecked().should('be.true');
    OGPOStep1.clickInsuredSwitch();
    OGPOStep1.PDLSwitchIsChecked().should('be.false');
    OGPOStep1.clickSaveButton();
    OGPOStep1.clickNextButton();

    OGPOStep2.pageIsDisplayed();
    OGPOStep2.juridicalSwitchIsChecked().should('be.false');
    OGPOStep2.IPSwitchIsChecked().should('be.false');
    OGPOStep2.residentSwitchIsChecked().should('be.true');
    OGPOStep2.inputIIN(insured.iin);
    OGPOStep2.clickSearchClientButton();
    OGPOStep2.getLastNameElement()
      .should('have.value', insured.last_name);
    OGPOStep2.getFirstNameElement()
      .should('have.value', insured.first_name);
    OGPOStep2.getOrSetMiddleNameElement(insured.middle_name)
      .should('have.value', insured.middle_name);
    OGPOStep2.getDateOfBirthElement()
      .should('have.value', insured.born.DMY);
    OGPOStep2.getSexText()
      .should('be.equal', insured.sex_id);
    OGPOStep2.getDocumentTypeText()
      .should('be.equal', insured.document_type_id);
    OGPOStep2.getDocumentNumberElement()
      .should('have.value', insured.document_number);
    OGPOStep2.getDocumentIssueDateElement()
      .should('have.value', insured.document_gived_date.DMY);
    OGPOStep2.getClassIDLabelText()
      .should('be.equal', insured.bonus_malus);
    OGPOStep2.getDriverLicenceTypeText()
      .should('be.equal', insured.driver_certificate_type_id);
    OGPOStep2.getDriverLicenceNumberElement()
      .should('have.value', insured.driving_license);
    OGPOStep2.getOrSetDriverLicenceIssueDateElement(insured.date_issue_license.DMY)
      .should('have.value', insured.date_issue_license.DMY);
    OGPOStep2.experienceLessThan2YearsSwitchIsChecked().should('be.false');
    OGPOStep2.pensionerSwitchIsChecked().should('be.false');
    OGPOStep2.invalidSwitchIsChecked().should('be.false');
    OGPOStep2.PDLSwitchIsChecked().should('be.false');
    OGPOStep2.clickSaveButton();
    OGPOStep2.clickNextButton();

    OGPOStep3.pageIsDisplayed();
    OGPOStep3.inputVehicleData(car.reg_num, car.reg_cert_num, car.vin);
    OGPOStep3.clickSearchVehicleButton();
    OGPOStep3.inputVehicleDataWithDisabledVerification(
      car.reg_num,
      car.reg_cert_num,
      car.dt_reg_cert.DMY,
    );
    OGPOStep3.getCarRegDateElement()
      .should('have.value', car.dt_reg_cert.DMY);
    OGPOStep3.getCarRegionText()
      .should('be.equal', car.region_id);
    OGPOStep3.getCarVINElement()
      .should('have.value', car.vin);
    OGPOStep3.getCarTypeText()
      .should('be.equal', car.type_id);
    OGPOStep3.getCarManufacturedYearText()
      .should('be.equal', car.year);
    OGPOStep3.getCarEngineVolumeElement()
      .should('have.value', car.engine_volume);
    OGPOStep3.getCarMarkElement()
      .should('have.value', car.mark.OGPO);
    OGPOStep3.getCarModelElement()
      .should('have.value', car.model.OGPO);
    OGPOStep3.clickSaveButton();
    OGPOStep3.clickNextButton();

    let endDate;
    let beginDate;
    OGPOStep4.pageIsDisplayed();
    OGPOStep4.getPeriodText()
      .should('be.equal', JSONLoader.testData.OGPOperiod);
    OGPOStep4.inputRandomBeginDate();
    OGPOStep4.getBeginDateTitle().then((dateBegin) => {
      beginDate = dateBegin;
      const { finishDate } = TimeUtils.getDatesInterval(
        ...JSONLoader.testData.timeIncrementOneYear,
        { dateBegin },
      );
      OGPOStep4.getEndDateTitle().then((dateEnd) => {
        endDate = dateEnd;
        cy.wrap(dateEnd).should('be.equal', finishDate);
      });
    });
    OGPOStep4.clickCalculatePremiumButton();
    OGPOStep4.getNextButtonElement().should('be.enabled');
    OGPOStep4.getSumToPay()
      .then((sum) => cy.setLocalStorage('sumToPay', sum));
    OGPOStep4.clickNextButton();

    OGPOStep5.pageIsDisplayed();
    const clientFullName = `${holder.last_name} ${
      holder.first_name} ${
      holder.middle_name}`;
    OGPOStep5.getHolderText()
      .should('be.equal', clientFullName);
    const insuredClientFullName = `${insured.last_name} ${insured.first_name} ${insured.middle_name}`;
    OGPOStep5.getListOfInsuredPeopleText()
      .should('be.equal', insuredClientFullName);
    const carFullName = `${car.mark.OGPO}, ${car.model.OGPO}, ${car.reg_num}`;
    OGPOStep5.getListOfCarsText()
      .should('be.equal', carFullName);
    OGPOStep5.getInsurancePeriodBeforeIssuingText()
      .then((text) => cy.wrap(`${beginDate} - ${endDate}`)
        .should('be.equal', text));
    OGPOStep5.getInsurancePeriodBeforeIssuingText()
      .then((text) => cy.wrap(`${beginDate} - ${endDate}`)
        .should('be.equal', text));
    OGPOStep5.clickIssuePolicyButton();

    OGPOStep5.getPolicyNumberText()
      .should('contain', JSONLoader.testData.OGPOPolicyCodeNumber);
    OGPOStep5.getStatusText()
      .should('be.equal', JSONLoader.testData.issuedStatus);
    const { startDate } = TimeUtils.getDatesInterval(
      ...JSONLoader.testData.timeIncrement,
      { startNextDay: false },
    );
    OGPOStep5.getSlicedCreationDate()
      .should('be.equal', startDate);
    OGPOStep5.getInsurancePeriodAfterIssuingText()
      .then((text) => cy.wrap(`${beginDate} - ${endDate}`)
        .should('be.equal', text));
    OGPOStep5.getInsurancePeriodAfterIssuingText()
      .then((text) => cy.wrap(`${beginDate} - ${endDate}`)
        .should('be.equal', text));
    OGPOStep5.getHolderText()
      .should('be.equal', clientFullName);
    OGPOStep5.getListOfInsuredPeopleText()
      .should('be.equal', insuredClientFullName);
    OGPOStep5.getListOfCarsText()
      .should('be.equal', carFullName);
    OGPOStep5.getPaymentCode()
      .then((code) => cy.setLocalStorage('paymentCode', code));
    OGPOStep5.getPolicyNumberText()
      .then((value) => cy.setLocalStorage('OGPOPolicyNumber', value));
    OGPOStep5.getInsurancePeriodAfterIssuingText()
      .then((value) => cy.setLocalStorage('OGPOPolicyInsurancePeriod', value));
    cy.setLocalStorage('installmentPayment', false);
  });
};
