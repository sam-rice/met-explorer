import allResultsObject from "../fixtures/morrisAllSearchResults.json"
import morrisPage1Results from "../addlData/morrisPage1Results.json"
import morrisPage2Results from "../addlData/morrisPage2Results.json"

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
    allResultsObject.objectIDs.map(id => cy.intercept({
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

  it("should have global state corresponding to user's search and first page of results", () => {
    cy.assertState({
      collections: [],
      results: {
        allResults: {
          "total": 27,
          "objectIDs": allResultsObject.objectIDs
        },
        currentPageResults: morrisPage1Results,
        isLoadingPage: false,
        isLoadingResults: false
      }
    })
  })

  it("should have global state corresponding to the next page of results", () => {
    cy.getByData("next-button").click()
    cy.assertState({
      collections: [],
      results: {
        allResults: {
          "total": 27,
          "objectIDs": allResultsObject.objectIDs
        },
        currentPageResults: morrisPage2Results,
        isLoadingPage: false,
        isLoadingResults: false
      }
    })
    cy.getByData("back-button").click()
    cy.assertState({
      collections: [],
      results: {
        allResults: {
          "total": 27,
          "objectIDs": allResultsObject.objectIDs
        },
        currentPageResults: morrisPage1Results,
        isLoadingPage: false,
        isLoadingResults: false
      }
    })
  })


})

describe("no results", () => {

  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "https://collectionapi.metmuseum.org/public/collection/v1/search?q=foobar",
    })
    cy.visit("http://localhost:3000/search-form")
    cy.getByData("search-input").type("foobar")
    cy.getByData("submit-search").click()
  })

  it("should maintain usable state when there are no results", () => {
    cy.assertState({
      collections: [],
      results: {
        allResults: null,
        currentPageResults: null,
        isLoadingPage: false,
        isLoadingResults: false
      }
    })
  })
})
