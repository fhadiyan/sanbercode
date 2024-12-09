describe('Login', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.url().should('eq', 'https://www.saucedemo.com/');
    cy.get('#user-name').should('be.visible');
    cy.get('#login-button').should('be.visible');
  });

    it('Should Show Error when Not Input Username and Not Input Password', () => {
      cy.get('#login-button').click()
      cy.get('.error-message-container.error').should('contain', 'Epic sadface: Username is required');
    })

    it('Should Show Error when Input only Username', () => {
      cy.get('#user-name').type("standard_user")
      cy.get('#login-button').click()
      cy.get('.error-message-container.error').should('contain', 'Epic sadface: Password is required');
    })

    it('Should Show Error when Input only Password', () => {
      cy.get('#password').type("secret_sauce")
      cy.get('#login-button').click()
      cy.get('.error-message-container.error').should('contain', 'Epic sadface: Username is required');
    })

    it('Should Show Error when Input Invalid Username', () => {
      cy.get('#user-name').type("standard_user1")
      cy.get('#password').type("secret_sauce")
      cy.get('#login-button').click()
      cy.get('.error-message-container.error').should('contain', 'Epic sadface: Username and password do not match any user in this service');
    })

    it('Should Show Error when Input Invalid Password', () => {
      cy.get('#user-name').type("standard_user")
      cy.get('#password').type("secret_sauce1")
      cy.get('#login-button').click()
      cy.get('.error-message-container.error').should('contain', 'Epic sadface: Username and password do not match any user in this service');

    })

    it('Should Login Successfully when Input Valid Username and Valid Password', () => {
      cy.get('#user-name').type("standard_user")
      cy.get('#password').type("secret_sauce")
      cy.get('#login-button').click()

      cy.url().should('include', '/inventory.html')
    })

})