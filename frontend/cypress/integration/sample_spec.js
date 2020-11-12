const { italic, cyan } = require('colors')

describe('Admin login', function () {
  it('Enters username and password, presses enter', function () {
    cy.visit('http://localhost:3000/login')

    cy.get('input[name="email"]').type('admin@example.com')
    cy.get('input[name="password"]').type('123456{enter}')

    cy.url().should('include', '/admin')
    cy.pause()

    cy.get('.logout').click()
  })
})
