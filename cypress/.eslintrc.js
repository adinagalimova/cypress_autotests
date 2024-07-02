module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    browser: true,
    mocha: true,
  },
  ignorePatterns: ['main/utils/data/JSONLoader.js'],
  extends: [
    'airbnb-base',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
