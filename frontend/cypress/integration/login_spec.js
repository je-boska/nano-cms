describe('Admin login', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  it('Enters correct username and password', function () {
    cy.login(Cypress.env('email'), Cypress.env('password'))

    cy.location('pathname').should('eq', '/admin')

    cy.get('.logout-button').click()
  })

  it('Enters incorrect username and/or password', function () {
    cy.login('incorrect@example.com', '1234')

    cy.location('pathname').should('eq', '/login')
    cy.get('.error').should('contain', 'Invalid email or password')
  })
})
