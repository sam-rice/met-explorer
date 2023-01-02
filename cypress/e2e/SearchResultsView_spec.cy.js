import allResultsObject from "../fixtures/morrisAllSearchResults.json"

describe("Search Results View - Header", () => {
  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=william+morris",
    }, {
      fixture: "morrisAllSearchResults.json"
    })
    cy.visit("http://localhost:3000/search?query=william+morris&type=artist&dept=all&page=1")
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
    cy.intercept({
      method: "GET",
      url: "https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=12&q=william+morris",
    }, {
      fixture: "morrisFilteredSearchResults.json"
    })
    allResultsObject.objectIDs.map(id => cy.intercept({
      method: "GET",
      url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
    }, {
      fixture: `morrisResult${id}.json`
    })
    )
    cy.visit("http://localhost:3000/search?query=william+morris&type=artist&dept=all&page=1")
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

  it("should display the total number of search results, number of displayed results, and department searched within", () => {
    cy.getByData("params-main").should("have.text", "27 results for \"william morris\"")
    cy.getByData("results-count-upper").should("have.text", "viewing 24 of 27 results")
    cy.getByData("results-count-lower").should("have.text", "viewing 24 of 27 results")
    cy.getByData("params-dept").should("have.text", "in all departments")

    cy.getByData("search-header").click()
    cy.getByData("search-input").type("william morris")
    cy.getByData("dept-select").select("European Sculpture and Decorative Arts")
    cy.getByData("submit-search").click()
    cy.getByData("params-main").should("have.text", "4 results for \"william morris\"")
    cy.getByData("results-count-upper").should("have.text", "viewing 4 of 4 results")
    cy.getByData("results-count-lower").should("have.text", "viewing 4 of 4 results")
    cy.getByData("params-dept").should("have.text", "in European Sculpture and Decorative Arts")
  })

  it("should navigate to the next page of results and back", () => {
    cy.getByData("next-button").click()
    cy.url().should("eq", "http://localhost:3000/search?query=william+morris&type=artist&dept=all&page=2")
    cy.getByData("283072").should("be.visible")
    cy.getByData("283067").should("be.visible")
    cy.getByData("results-list").find("li").should("have.length", 2)
    cy.getByData("params-main").should("have.text", "27 results for \"william morris\"")
    cy.getByData("results-count-upper").should("have.text", "viewing 2 of 27 results")
    cy.getByData("results-count-lower").should("have.text", "viewing 2 of 27 results")

    cy.getByData("back-button").click()
    cy.url().should("eq", "http://localhost:3000/search?query=william+morris&type=artist&dept=all&page=1")
    cy.getByData("results-list").find("li").should("have.length", 24)
    cy.getByData("11178").should("be.visible")
    cy.getByData("14944").should("be.visible")
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

  it("should not have an active \"page-back\" button when viewing the first page of results", () => {
    cy.getByData("back-button").should("have.attr", "disabled")
    cy.getByData("back-button").should("have.class", "nav--disabled")

    cy.getByData("next-button").click()
    cy.getByData("back-button").should("not.have.attr", "disabled")
    cy.getByData("back-button").should("not.have.class", "nav--disabled")
  })

  it("should not have an active \"next-page\" button when viewing the last page of results", () => {
    cy.getByData("next-button").should("not.have.attr", "disabled")
    cy.getByData("next-button").should("not.have.class", "nav--disabled")

    cy.getByData("next-button").click()
    cy.getByData("next-button").should("have.attr", "disabled")
    cy.getByData("next-button").should("have.class", "nav--disabled")
  })

  it("should navigate to the appropriate \"Artwork Details\" page when a result is clicked", () => {
    cy.getByData("14944").click()
    cy.url().should("eq", "http://localhost:3000/explore/14944")
  })

  it("should persist when navigated to via browser history", () => {
    cy.visit("http://localhost:3000/search-form")
    cy.getByData("search-input").type("william morris")
    cy.getByData("type-select").select("artist name")
    cy.getByData("submit-search").click()

    cy.go("back")
    cy.go("forward")
    cy.url().should("eq", "http://localhost:3000/search?query=william+morris&type=artist&dept=all&page=1")
    cy.getByData("results-list").find("li").should("have.length", 24)
    cy.getByData("11178").should("be.visible")

    cy.getByData("14944").click()
    cy.go("back")
    cy.url().should("eq", "http://localhost:3000/search?query=william+morris&type=artist&dept=all&page=1")
    cy.getByData("results-list").find("li").should("have.length", 24)
    cy.getByData("11178").should("be.visible")
  })
})

describe("Search Results View - Body (no results)", () => {

  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "https://collectionapi.metmuseum.org/public/collection/v1/search?q=foobar",
    }, {
      fixture: "noResults.json"
    })
    cy.visit("http://localhost:3000/search?query=foobar&type=keyword&dept=all&page=1")
  })

  it("should maintain usable global state when there are no results", () => {
    cy.assertState({
      collections: [],
      results: {
        allResults: null,
        isLoadingResults: false
      }
    })
  })

  it("should display the total number of search results, number of displayed results, and department searched within", () => {
    cy.getByData("params-main").should("have.text", "0 results for \"foobar\"")
    cy.getByData("results-count-upper").should("have.text", "viewing 0 of 0 results")
    cy.getByData("results-count-lower").should("have.text", "viewing 0 of 0 results")
    cy.getByData("params-dept").should("have.text", "in all departments")
  })

  it("should have disabled page navigation buttons", () => {
    cy.getByData("back-button").should("have.attr", "disabled")
    cy.getByData("back-button").should("have.class", "nav--disabled")
    cy.getByData("next-button").should("have.attr", "disabled")
    cy.getByData("next-button").should("have.class", "nav--disabled")
  })

  it("should alert the user when there are no results", () => {
    cy.getByData("no-results").should("be.visible")
  })
})
