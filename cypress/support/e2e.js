require('./commands');
require("cypress-log-filter");
require('cypress-plugin-multiple-click');
require('@shelex/cypress-allure-plugin');
require('cypress-localstorage-commands');

// Hide fetch/XHR requests
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
    const style = app.document.createElement('style');
    style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
    style.setAttribute('data-hide-command-log-request', '');
    app.document.head.appendChild(style);
}

// нужно для разработки mutual, чтобы не крашилось изза неявной ошибки АДП при загрузке страницы
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})