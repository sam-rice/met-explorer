import resultIDs from "../fixtures/morrisAllSearchResults.json"

describe("Search Results View - Header", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/search-form")
    cy.getByData("search-input").type("foo")
    cy.getByData("submit-search").click()
  })

  it("should navigate to the homepage", () => {
    cy.getByData("home-header").click()
    cy.url().should("eq", "http://localhost:3000/")
  })

  it("should navigate to \"My Collections\"", () => {
    cy.getByData("collections-header").click()
    cy.url().should("eq", "http://localhost:3000/collections")
  })

  it("should navigate to the search form", () => {
    cy.getByData("search-header").click()
    cy.url().should("eq", "http://localhost:3000/search-form")
  })

  it("displays the correct sub-header", () => {
    cy.getByData("sub-header").should("have.text", "EXPLORE")
  })
})

describe("Search Results View - Body", () => {
  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=william+morris",
    }, {
      fixture: "morrisAllSearchResults.json"
    })

    resultIDs.objectIDs.map(id => cy.intercept({
      method: "GET",
      url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
    }, {
      fixture: `morrisResult${id}.json`
    })
    )
    cy.visit("http://localhost:3000/search-form")
    cy.getByData("search-input").type("william morris")
    cy.getByData("type-select").select("artist name")
    cy.getByData("submit-search").click()
  })

  it("should have global state corresponding to user's search", () => {

  })

})