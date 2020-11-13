describe('Admin login', function () {
  it('Enters correct username and password', function () {
    cy.visit('http://localhost:3000/login')

    cy.login('admin@example.com', '123456')

    cy.location('pathname').should('eq', '/admin')

    cy.get('.logout-button').click()
  })
  it('Enters incorrect username and/or password', function () {
    cy.visit('http://localhost:3000/login')

    cy.login('incorrect@example.com', '1234')

    cy.location('pathname').should('eq', '/login')
    cy.get('.error').should('contain', 'Invalid email or password')
  })
})
