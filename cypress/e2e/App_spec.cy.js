describe("App - Redux Initialization", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })

  it("has expected state on load", () => {
    cy.window().its("store").invoke("getState").should("eql", {
      collections: [],
      results: {}
    })
  })
})