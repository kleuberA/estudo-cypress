describe('Register', () => {
    it('Send form without filling in the fields', () => {
        cy.visit('http://localhost:3000/')

        // cy.get('input').type('tom')

        cy.get('.register').click()
        cy.get('.username').contains('Username is required.')
        cy.get('.email').contains('Invalid email')
        cy.get('.password').contains('Password must be at least 8 characters long.')
        cy.get('.confirmPassword').contains('Confirm password is required.')
    })

    it('Send form with invalid email', () => {
        cy.visit('http://localhost:3000/')

        cy.get('input[name="username"]').type('tom5569')
        cy.get('input[name="email"]').type('tom@hotmail.com')
        cy.get('input[name="password"]').type('Tom12345')
        cy.get('input[name="confirm_password"]').type('Tom12345')

        cy.get('.register').click()

        cy.get('.username').contains('Only letters are allowed')
        cy.get('.password').contains('The Password must contain at least 1 capital letter.')

        cy.get('input[name="password"]').clear()
        cy.get('input[name="password"]').type('Tom12345@')
        cy.get('.register').click()

        cy.get('.confirmPassword').contains("Password doesn't match.")

        cy.get('input[name="username"]').clear()
        cy.get('input[name="username"]').type('tom')
        cy.get('input[name="confirm_password"]').clear()
        cy.get('input[name="confirm_password"]').type('Tom12345@')
        cy.get('.register').click()

    })
})