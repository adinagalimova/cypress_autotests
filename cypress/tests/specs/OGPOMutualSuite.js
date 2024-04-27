const { login } = require('./login');
const { kaspiPay } = require('./kaspiPay');
const { userPathOGPO } = require('./userPathOGPO');
const { userPathMutual } = require('./userPathMutual');

describe('OGPO & Mutual test suite:', () => {
  login();
  userPathOGPO();
  kaspiPay();
  userPathMutual();
});
