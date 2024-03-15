const { parseStringPromise } = require('xml2js');

class DataUtils {
    static async XMLToJSON(xml) {
        cy.logger(`DEBUG ${xml}`);
        console.log(`DEBUG xml: "${xml}"`);
        return (await parseStringPromise(xml)).response;
    }
}

module.exports = DataUtils;