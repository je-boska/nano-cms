const { italic } = require('colors')

describe('Create post', () => {
  it('Goes to create post screen and clicks save and publish', () => {
    cy.visit('http://localhost:3000/login')

    cy.login('admin@example.com', '123456')

    cy.get('.create-post-button').click()
    cy.url().should('contain', '/edit')
    cy.get('.save-button').click()
    cy.get('.publish-button').click()

    cy.location('pathname').should('eq', '/admin')

    cy.get('.logout-button').click()
  })
})
