import Login from "../classes/login";
import 'cypress-file-upload';

describe('test spec', () => {
  context('Create Article Testing', () => {
    const login = new Login();
    beforeEach(() => {
      cy.visit('http://localhost:4200/login');

      login.completeForm(
        'matei.georgiana11@gmail.com',
        'uNsnaPSpitte2.')
      login.submitButton();
      cy.get("#create-article-button").click();
    })

    it('should show preview when clicking on the preview button', () => {
      const title = 'Test Article Title';
      const summary = 'Test Article Summary';
      const content = 'Test Article Content';
      cy.get('#article-title').type(title);
      cy.get('#article-summary').type(summary);
      cy.fixture('test-image.png').then(fileContent => {
        cy.get('.fileInput').attachFile({
          fileContent: fileContent.toString(),
          fileName: 'test-image.png',
          mimeType: 'image/png'
        });
      });
      cy.get('.ql-editor').type(content);
      cy.get('.preview-button').click();
      cy.get('mat-card').should('be.visible');
      cy.contains('Articolul a fost publicat cu succes!').should('not.exist');
    });

    it('should display the create article form', () => {
      cy.get('mat-card-title').contains('Creează un articol').should('be.visible');
      cy.get('#article-title').should('exist');
      cy.get('#article-summary').should('exist');
      cy.get('.fileUploadContainer').should('exist');
      cy.get('.ql-editor').should('exist');
      cy.get('.submit-button').should('be.visible');
      cy.get('.preview-button').should('be.visible');
    });

    it('should show error messages for invalid inputs', () => {
      cy.get('.error-message').should('contain.text', '*Titlul este obligatoriu.');
      cy.get('.error-message').should('contain.text', '*Rezumatul este obligatoriu.');
      cy.get('.error-message').should('contain.text', '*Imaginea pentru titlu este obligatorie.');
      cy.get('.error-message').should('contain.text', '*Conținutul este obligatoriu.');
    });

    it('should allow user to fill out and submit the form', () => {
      const title = 'Test Article Title';
      const summary = 'Test Article Summary';
      const content = 'Test Article Content';

      cy.get('#article-title').type(title);
      cy.get('#article-summary').type(summary);
      cy.fixture('test-image.png').then(fileContent => {
        cy.get('.fileInput').attachFile({
          fileContent: fileContent.toString(),
          fileName: 'test-image.png',
          mimeType: 'image/png'
        });
      });
    });

  })
})

