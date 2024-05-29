const { login } = require('./login');
const { kaspiPay } = require('./kaspiPay');
const { userPathKasko } = require('./userPathKasko');

describe('Kasko test suite', () => {
  login();
  userPathKasko();
  kaspiPay();
});
