Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-cy=${selector}]`)
})

Cypress.Commands.add("getChildByData", (selector, childType) => {
  return cy.get(`[data-cy=${selector}] ${childType}`)
})