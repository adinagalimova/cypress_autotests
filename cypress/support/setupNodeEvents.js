const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const cypressSplit = require('cypress-split');
const localStorage = require('cypress-localstorage-commands/plugin');
const kaspiAPI = require('../tests/API/kaspiAPI');
const clientAPI = require('../tests/API/clientAPI');
const dictionaryAPI = require('../tests/API/dictionaryAPI');
const BaseTest = require('../main/baseTest');
const Logger = require('../main/utils/log/logger');
const dataUtils = require('../main/utils/data/dataUtils');

exports.setupNodeEvents = {
  setupNodeEvents(on, config) {
    cypressSplit(on, config);
    on('before:run', BaseTest.beforeAll);
    on('after:run', BaseTest.afterAll);
    on('task', {
      log({ step, title }) {
        return Logger.log(step, title);
      },
      async payWithKaspi(paymentInfo) {
        return [
          await kaspiAPI.setToken(),
          await kaspiAPI.pay(paymentInfo),
        ];
      },
      async resetClient(client) {
        await clientAPI.setToken();
        const response = await clientAPI.getClient(client);
        const setClientRequestBody = dataUtils.prepareSetClientRequestBody(response, client);
        return clientAPI.setClient(setClientRequestBody);
      },
      async toggleVerification() {
        return [
          await dictionaryAPI.setToken(),
          await dictionaryAPI.toggleVerification(),
        ];
      },
      async getVerifyBool() {
        return [
          await dictionaryAPI.setToken(),
          await dictionaryAPI.getVerifyBool(),
        ];
      },
    });

    allureWriter(on, config);
    localStorage(on, config);
    return config;
  },
};
