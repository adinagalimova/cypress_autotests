const { parseStringPromise } = require('xml2js');

class DataUtils {
  static async XMLToJSON(xml) {
    return (await parseStringPromise(xml)).response;
  }

  static async interceptHTTPRequest(route) {
    cy.intercept(`*${route}*`).as(`get${route}`);
  }
}

module.exports = DataUtils;
