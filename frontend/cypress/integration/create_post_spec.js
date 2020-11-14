const { italic } = require('colors')

describe('Create post', () => {
  before(() => {
    cy.visit('http://localhost:3000/login')

    cy.login('admin@example.com', '123456')
  })

  after(() => {
    cy.get('.logout-button').click()
  })

  it('Clicks create post, goes to edit post screen', () => {
    cy.get('.create-post-button').click()

    cy.url().should('contain', '/edit')
  })

  it('Clicks save and publish, returns to admin sceen', () => {
    cy.get('input[name="title"]').type('Test post')
    cy.get('.save-button').click()
    cy.get('.publish-button').click()

    cy.location('pathname').should('eq', '/admin')
  })

  it('Checks for newly created post', () => {
    cy.wait(1000)
    cy.reload()
    cy.get('.post-card').first().should('contain', 'Test post')
  })

  it('Deletes newly created post', () => {
    cy.get('.delete-button').first().click()
    cy.on('window:confirm', () => true)

    cy.wait(1000)
    cy.reload()

    cy.get('.post-card').first().should('not.contain', 'Test post')
  })
})
