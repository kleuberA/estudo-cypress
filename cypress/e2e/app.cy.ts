describe('Navigation', () => {
    it('Verified if exist text home', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        cy.get('h1').contains('Home')
    })
})