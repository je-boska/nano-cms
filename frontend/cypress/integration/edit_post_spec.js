describe('Edit post', () => {
  before(() => {
    cy.visit('http://localhost:3000/login')

    cy.login(Cypress.env('email'), Cypress.env('password'))
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

    cy.wait(500)

    cy.location('pathname').should('eq', '/admin')
  })

  it('Checks for newly created post', () => {
    cy.get('.post-card').first().should('contain', 'Test post')
  })

  it('Clicks edit post, goes to edit post screen', () => {
    cy.get('.edit-button').first().click()

    cy.url().should('contain', '/edit')
  })

  it('Edits post and publishes', () => {
    cy.get('input[name="title"]').type('Test post edited')
    cy.get('.save-button').click()
    cy.get('.publish-button').click()

    cy.wait(500)

    cy.location('pathname').should('eq', '/admin')
  })

  it('Checks that the post is edited', () => {
    cy.get('.post-card').first().should('contain', 'Test post edited')
  })

  it('Deletes newly created post', () => {
    cy.get('.delete-button').first().click()
    cy.on('window:confirm', () => true)
    cy.wait(500)

    cy.get('.post-card').first().should('not.contain', 'Test post edited')
  })
})
