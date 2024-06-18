const moment = require('moment');
const { parseStringPromise } = require('xml2js');

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
}

module.exports = DataUtils;
