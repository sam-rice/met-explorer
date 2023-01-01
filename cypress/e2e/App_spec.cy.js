describe("App - Redux Initialization", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })

  it("has expected state on load", () => {
    cy.assertState({
      collections: [],
      results: {}
    })
  })
})