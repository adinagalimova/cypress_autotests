class NodeEvents {
  static payWithKaspi(paymentInfo) {
    return cy.task('payWithKaspi', paymentInfo).then((responses) => {
      responses.forEach((response) => response.logs.forEach((log) => cy.logger(log)));
      return cy.wrap(responses);
    });
  }

  static resetClient(client) {
    return cy.task('resetClient', client).then((response) => {
      response.logs.forEach((log) => cy.logger(log));
      return cy.wrap(response);
    });
  }
}

module.exports = NodeEvents;
