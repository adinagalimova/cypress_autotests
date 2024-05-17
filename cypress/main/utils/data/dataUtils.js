const { parseStringPromise } = require('xml2js');
const JSONLoader = require('./JSONLoader');

class DataUtils {
  static async XMLToJSON(xml) {
    return (await parseStringPromise(xml)).response;
  }

  static getCountriesFromRequest() {
    const excludedCountries = new Set(JSONLoader.testData.MSTExcludedCountries);
    const countries = [];
    cy.intercept(
      'countries*',
      (request) => request.continue((response) => response.body.forEach((country) => {
        if (!excludedCountries.has(country.title)) countries.push(country.title);
      })),
    );

    return cy.wrap(countries);
  }
}

module.exports = DataUtils;
