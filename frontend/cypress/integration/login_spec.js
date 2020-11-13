describe('Admin login', function () {
  it('Enters correct username and password', function () {
    cy.visit('http://localhost:3000/login')

    cy.get('input[name="email"]').type('admin@example.com')
    cy.get('input[name="password"]').type('123456{enter}')

    cy.location('pathname').should('eq', '/admin')

    cy.get('.logout').click()
  })
})

describe('Admin login failure', function () {
  it('Enters incorrect username and/or password', function () {
    cy.visit('http://localhost:3000/login')

    cy.get('input[name="email"]').type('incorrect@example.com')
    cy.get('input[name="password"]').type('1234{enter}')

    cy.location('pathname').should('eq', '/login')
    cy.get('.error').should('contain', 'Invalid email or password')
  })
})
