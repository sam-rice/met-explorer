// describe("Collections List - Header", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000/collections")
//   })

//   it("should navigate to the homepage", () => {
//     cy.getByData("home-header").click()
//     cy.url().should("eq", "http://localhost:3000/")
//   })

//   it("should navigate to itself", () => {
//     cy.getByData("collections-header").click()
//     cy.url().should("eq", "http://localhost:3000/collections")
//   })

//   it("should navigate to the search form", () => {
//     cy.getByData("search-header").click()
//     cy.url().should("eq", "http://localhost:3000/search-form")
//   })

//   it("displays the correct sub-header", () => {
//     cy.getByData("sub-header").should("have.text", "MYCOLLECTIONS")
//   })
// })

describe("Collections List - Initial", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/collections")
  })

  it("tell the user that there are no collections yet", () => {
    cy.getByData("no-collections").should("be.visible")
  })

  it("should display the number of collections", () => {
    cy.getByData("collections-count").should("have.text", "0 collections")
  })

  it("should have buttons for opening/closing the \"new collection\" modal", () => {
    cy.getByData("modal-open")
      .should("be.visible")
      .click()
    cy.get(".ReactModal__Overlay").should("be.visible")
    cy.get(".ReactModal__Content").should("be.visible")

    cy.getByData("modal-close").click()
    cy.get(".ReactModal__Overlay").should("not.be.visible")
    cy.get(".ReactModal__Content").should("not.be.visible")
  })

  it("should allow the user to add their first collection", () => {
    cy.clock()
    cy.getByData("modal-open").click()
    cy.getByData("modal-input").type("Collection 1")
    cy.getByData("modal-submit").click()
    cy.get(".ReactModal__Overlay").should("not.be.visible")
    cy.get(".ReactModal__Content").should("not.be.visible")
    cy.getByData("collection-Collection-1").should("exist")
    cy.assertState({
      collections: [{
        name: "Collection 1",
        id: 0,
        pieces: []
      }],
      results: {}
    })
  })
})

// describe("Collections List - Managing Collections", () => {
//   beforeEach(() => {
//     // cy.intercept({
//     //   method: "GET",
//     //   url: "https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=william+morris",
//     // }, {
//     //   fixture: "morrisAllSearchResults.json"
//     // })
//     cy.visit("http://localhost:3000/collections")
//   })

//   it("should navigate to the homepage", () => {
//     cy.getByData("home-header").click()
//     cy.url().should("eq", "http://localhost:3000/")
//   })

//   it("should navigate to itself", () => {
//     cy.getByData("collections-header").click()
//     cy.url().should("eq", "http://localhost:3000/collections")
//   })

//   it("should navigate to the search form", () => {
//     cy.getByData("search-header").click()
//     cy.url().should("eq", "http://localhost:3000/search-form")
//   })

//   it("displays the correct sub-header", () => {
//     cy.getByData("sub-header").should("have.text", "MYCOLLECTIONS")
//   })
// })