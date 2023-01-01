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

  it("should have global state corresponding to user's search", () => {
    cy.assertState({
      collections: [],
      results: {
        allResults: {
          "total": 27,
          "objectIDs": allResultsObject.objectIDs
        },
        isLoadingResults: false
      }
    })
  })

  it("should handle bad server data and only render valid result objects", () => {
    cy.getByData("results-list").find("li").should("have.length", 24)
  })

  it("should render \"tiles\" for search results that display the result's data", () => {
    cy.getByData("14944").find('[data-cy="title"]').should("have.text", "Curtain")
    cy.getByData("14944").find('[data-cy="date"]').should("have.text", "ca. 1882")
    cy.getByData("14944").find('[data-cy="artist"]').should("have.text", "William Morris")
    cy.getByData("14944").find('[data-cy="culture"]').should("have.text", "American or British")
    cy.getByData("14944").find('[data-cy="department"]').should("have.text", "department: The American Wing")
    cy.getByData("14944").find("img").invoke("attr", "src").should("eq", "https://images.metmuseum.org/CRDImages/ad/web-large/RT560.jpg")
    cy.getByData("10383").find('[data-cy="title"]').should("have.text", "Drawing")
    cy.getByData("10383").find('[data-cy="date"]').should("have.text", "ca. 1850–60")
    cy.getByData("10383").find('[data-cy="artist"]').should("have.text", "John William Casilear")
    cy.getByData("10383").find('[data-cy="culture"]').should("have.text", "American")
    cy.getByData("10383").find('[data-cy="department"]').should("have.text", "department: The American Wing")
    cy.getByData("10383").find("img").invoke("attr", "src").should("eq", "https://images.metmuseum.org/CRDImages/ad/web-large/ap1978.499.1 recto.jpg")
  })

  it("should render a fallback photo when a result's data is missing an image", () => {
    cy.getByData("486405").find("img").invoke("attr", "src").should("eq", "/static/media/fallback.36cccec721043b9b96a4.png")
  })

  it("should not render elements specific to data if the corresponding data is not available", () => {
    cy.getByData("486405").find('[data-cy="culture"]').should("not.be.visible")
  })

  //start here

  it("should navigate to the next page of results and back", () => {
    cy.getByData("next-button").click()
    
    cy.getByData("back-button").click()
    
  })


})

// describe("no results", () => {

//   beforeEach(() => {
//     cy.intercept({
//       method: "GET",
//       url: "https://collectionapi.metmuseum.org/public/collection/v1/search?q=foobar",
//     }, {
//       fixture: "noResults.json"
//     })
//     cy.visit("http://localhost:3000/search-form")
//     cy.getByData("search-input").type("foobar")
//     cy.getByData("submit-search").click()
//   })

//   it("should maintain usable state when there are no results", () => {
//     cy.assertState({
//       collections: [],
//       results: {
//         allResults: null,
//         isLoadingResults: false
//       }
//     })
//   })
// })
