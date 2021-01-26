describe('Move post', () => {
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

  it('Clicks the down arrow', () => {
    cy.get('.down-arrow').first().click()
  })

  it('Checks that the created post has moved down', () => {
    cy.get('.post-card').eq(1).should('contain', 'Test post')
  })

  it('Clicks the up arrow', () => {
    cy.get('.up-arrow').eq(1).click()
  })

  it('Checks that the created post has moved up', () => {
    cy.get('.post-card').first().should('contain', 'Test post')
  })

  it('Deletes newly created post', () => {
    cy.get('.delete-button').first().click()
    cy.on('window:confirm', () => true)
    cy.wait(500)

    cy.get('.post-card').eq(1).should('not.contain', 'Test post')
  })
})
