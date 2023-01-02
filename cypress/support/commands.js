Cypress.Commands.add("getByData", selector => {
  return cy.get(`[data-cy=${selector}]`)
})

Cypress.Commands.add("getChildByData", (selector, childType) => {
  return cy.get(`[data-cy=${selector}] ${childType}`)
})

Cypress.Commands.add("assertState", state => {
  return cy.window().its("store").invoke("getState").should("eql", state)
})


Cypress.Commands.add("dispatchCollectionToStore", (name, id) => {
  return cy.window().its("store").invoke("dispatch", {
    type: "ADD_COLLECTION",
    payload: {
      name: name,
      id: id
    }
  })
})

Cypress.Commands.add("dispatchPieceToCollection", (collectionID, { artistName, culture, department, objectDate, objectID, objectName, imageSmall }) => {
  return cy.window().its("store").invoke("dispatch", {
    type: "ADD_TO_COLLECTION",
    payload: {
      collectionID: collectionID,
      piece: {
        artistName,
        culture,
        department,
        objectDate,
        objectID,
        objectName,
        imageSmall
      }
    }
  })
})

