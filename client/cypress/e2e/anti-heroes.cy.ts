describe('Anti Heroes Page', () => {

  it('Should be able to display Login Page', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
    cy.get('[data-cy=title]').should("contain", "Login");
  })
})
