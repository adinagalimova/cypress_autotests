const moment = require('moment');
const { parseStringPromise } = require('xml2js');
const JSONLoader = require('./JSONLoader');
const StrUtils = require('../str/strUtils');
const TimeUtils = require('../time/timeUtils');
const Randomizer = require('../random/randomizer');

class DataUtils {
  static async XMLToJSON(xml) {
    return (await parseStringPromise(xml)).response;
  }

  static getCountriesFromRequest(excludedCountriesArr) {
    const countries = [];
    cy.intercept(
      'countries*',
      (request) => request.continue((response) => response.body.forEach((country) => {
        if (!excludedCountriesArr.includes(country.title)) countries.push(country.title);
      })),
    );

    return cy.wrap(countries);
  }

  /**
   * requires one mandatory argument: clients.
   * options contain optional parameters:
   * residency,
   * type of document being passport,
   * having driver license
   * and being under 60 years old:
   * @param {string[]} clients
   * @param {Object} options
   * @param {boolean} options.isResident
   * @param {boolean} options.hasPassport
   * @param {boolean} options.hasDriverLicence
   * @param {boolean} options.isUnderSixtyYearsOld
   */
  static filterClients(clients, options = {}) {
    const { isResident } = options;
    const { hasPassport } = options;
    const { hasDriverLicence } = options;
    const { isUnderSixtyYearsOld } = options;
    let filteredClients = [...clients];

    filteredClients = filteredClients.filter((client) => {
      if (isResident !== undefined) {
        return isResident ? client.resident_bool : !client.resident_bool;
      }

      return true;
    });

    filteredClients = filteredClients.filter((client) => {
      if (hasDriverLicence !== undefined) {
        return hasDriverLicence ? client.driving_license : !client.driving_license;
      }

      return true;
    });

    filteredClients = filteredClients.filter((client) => {
      if (hasPassport !== undefined) {
        return hasPassport ? client.document_type_id === 2 : client.document_type_id !== 2;
      }

      return true;
    });

    filteredClients = filteredClients.filter((client) => {
      if (isUnderSixtyYearsOld !== undefined) {
        return isUnderSixtyYearsOld
          ? moment(client.born) > moment().subtract(60, 'years')
          : moment(client.born) <= moment().subtract(60, 'years');
      }

      return true;
    });

    return filteredClients;
  }

  static createRandomCarStructure(carsArr) {
    const randomCarIndex = Randomizer.getRandomInteger(carsArr.length - 1);
    const tempCar = carsArr[randomCarIndex];
    const resultCar = { ...tempCar };

    resultCar.dt_reg_cert = {};
    resultCar.dt_reg_cert.YMD = tempCar.dt_reg_cert;
    resultCar.dt_reg_cert.DMY = TimeUtils.reformatDateFromYMDToDMY(tempCar.dt_reg_cert);

    resultCar.year = tempCar.year.toString();
    resultCar.engine_volume = tempCar.engine_volume.toString();

    resultCar.model = {};
    resultCar.model.OGPO = tempCar.model;
    resultCar.model.KASKO = {};
    resultCar.model.KASKO.get = tempCar.model;
    resultCar.model.KASKO.set = tempCar.id !== 1
      ? StrUtils.toTitleCase(tempCar.model)
      : tempCar.model.slice(0, 3);

    resultCar.mark = {};
    resultCar.mark.OGPO = tempCar.mark;
    resultCar.mark.KASKO = {};
    resultCar.mark.KASKO.get = tempCar.mark;
    resultCar.mark.KASKO.set = tempCar.id !== 1 ? StrUtils.toTitleCase(tempCar.mark) : tempCar.mark;

    resultCar.region_id = JSONLoader.testData.carRegion;
    resultCar.type_id = JSONLoader.testData.carType;

    return resultCar;
  }

  static createRandomHolderAndInsuredStructures(clientsArr) {
    const randomHolderIndex = Randomizer.getRandomInteger(clientsArr.length - 1);
    let randomInsuredIndex;
    do {
      randomInsuredIndex = Randomizer.getRandomInteger(clientsArr.length - 1);
    } while (randomInsuredIndex === randomHolderIndex);
    const tempHolder = clientsArr[randomHolderIndex];
    const tempInsured = clientsArr[randomInsuredIndex];
    const resultHolder = { ...tempHolder };
    const resultInsured = { ...tempInsured };

    resultHolder.document_gived_date = {};
    resultHolder.document_gived_date.YMD = tempHolder.document_gived_date;
    resultHolder.document_gived_date.DMY = TimeUtils
      .reformatDateFromYMDToDMY(tempHolder.document_gived_date);
    resultHolder.born = {};
    resultHolder.born.YMD = tempHolder.born;
    resultHolder.born.DMY = TimeUtils.reformatDateFromYMDToDMY(tempHolder.born);
    resultHolder.date_issue_license = {};
    resultHolder.date_issue_license.YMD = tempHolder.date_issue_license;
    resultHolder.date_issue_license.DMY = TimeUtils
      .reformatDateFromYMDToDMY(tempHolder.date_issue_license);

    resultHolder.iin = tempHolder.iin.toString();
    resultHolder.document_type_id = JSONLoader
      .dictDocumentType[tempHolder.document_type_id.toString()];

    resultHolder.sex_id = JSONLoader.dictSexID[tempHolder.sex_id];
    resultHolder.address = JSONLoader.testData.holderAddress;
    resultHolder.email = JSONLoader.testData.holderEmail;
    resultHolder.document_gived_by = JSONLoader.testData.holderDocumentGivedBy;
    resultHolder.pdl = JSONLoader.testData.holderIsPDL;
    resultHolder.driver_certificate_type_id = JSONLoader.testData.holderDriverLicenceType;
    resultHolder.invalid_bool = JSONLoader.testData.holderIsInvalid;
    resultHolder.pensioner_bool = JSONLoader.testData.holderIsPensioner;
    resultHolder.country = JSONLoader.testData.holderCountry;
    resultHolder.region = JSONLoader.testData.holderRegion;
    resultHolder.phone = JSONLoader.testData.holderPhone;
    resultHolder.phoneTrimmed = JSONLoader.testData.holderPhoneTrimmed;
    resultHolder.phoneFormatted = JSONLoader.testData.holderPhoneFormatted;

    resultInsured.document_gived_date = {};
    resultInsured.document_gived_date.YMD = tempInsured.document_gived_date;
    resultInsured.document_gived_date.DMY = TimeUtils
      .reformatDateFromYMDToDMY(tempInsured.document_gived_date);
    resultInsured.born = {};
    resultInsured.born.YMD = tempInsured.born;
    resultInsured.born.DMY = TimeUtils.reformatDateFromYMDToDMY(tempInsured.born);
    resultInsured.date_issue_license = {};
    resultInsured.date_issue_license.YMD = tempInsured.date_issue_license;
    resultInsured.date_issue_license.DMY = TimeUtils
      .reformatDateFromYMDToDMY(tempInsured.date_issue_license);

    resultInsured.iin = tempInsured.iin.toString();
    resultInsured.document_type_id = JSONLoader
      .dictDocumentType[tempInsured.document_type_id.toString()];

    resultInsured.sex_id = JSONLoader.dictSexID[tempInsured.sex_id];
    resultInsured.address = JSONLoader.testData.insuredAddress;
    resultInsured.email = JSONLoader.testData.insuredEmail;
    resultInsured.document_gived_by = JSONLoader.testData.insuredDocumentGivedBy;
    resultInsured.pdl = JSONLoader.testData.insuredIsPDL;
    resultInsured.driver_certificate_type_id = JSONLoader.testData.insuredDriverLicenceType;
    resultInsured.invalid_bool = JSONLoader.testData.insuredIsInvalid;
    resultInsured.pensioner_bool = JSONLoader.testData.insuredIsPensioner;

    return { holder: resultHolder, insured: resultInsured };
  }
}

module.exports = DataUtils;
