import Login from "../classes/login";

describe('test spec', () => {
    context('Login Testing', () => {
      const login = new Login();
      beforeEach(() => {
        cy.visit('http://localhost:4200/login')
      })

      it('Verify required validator', () => {
        login.elements.formEmail().focus().blur()
        login.elements.formPassword().focus().blur()

        cy.get('#requiredPasswordError').should('contain.text', 'Parola e obligatorie!')
        cy.get('#requiredEmailError').should('contain.text', 'Adresa de email este obligatorie!')
      })

      it('Verify email validator', () => {
        login.elements.formEmail().type("plainText").blur()

        cy.get('#invalidEmailError').should('contain.text', 'Vă rugăm introduceți o adresă de email validă!')
      })

      it('Verify incorrect credentials', () => {
        login.completeForm(
          'adin@admin',
          'notTheCorrectPassword2.')
        login.submitButton()

        cy.get('simple-snack-bar').should('be.visible')
                                          .should('contain.text', 'Încercare eșuată de conectare! Asigurați-vă că ați confirmat adresa de email!');
      })

      it('Verify login request', () => {

        login.completeForm(
          'matei.georgiana11@gmail.com',
          'uNsnaPSpitte2.'
        )
        cy.intercept({
          url: 'https://localhost:7066/api/Auth/login',
          method: 'POST'
        }).as('loginRequest')
        cy.intercept({
          url: 'https://localhost:7066/api/Article/get-feed-articles',
          method: 'GET'
        }).as('getArticlesRequest')
        login.submitButton()

        cy.get('simple-snack-bar').should('be.visible')
                                           .should('contain.text', 'V-ați conectat cu succes!');
        cy.get('@loginRequest').its('response.statusCode').should('eq', 200)
        cy.get('@getArticlesRequest').its('response.statusCode').should('eq', 200)
      })
    })
})

