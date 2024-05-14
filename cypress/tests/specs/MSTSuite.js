const { login } = require('./login');
const { kaspiPay } = require('./kaspiPay');
const { userPathMST } = require('./userPathMST');

describe('MST test suite:', () => {
  login();
  userPathMST();
  // kaspiPay();
});
