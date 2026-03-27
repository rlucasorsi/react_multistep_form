import identificationPage from '../../../support/pages/IdentificationPage';
import reviewPage from '../../../support/pages/ReviewPage';
import thanksPage from '../../../support/pages/ThanksPage';

describe('Evaluation Form - Multistep Form', () => {
  let name;
  let email;

  before(() => {
    cy.env(['name', 'email']).then(({ name: nameEnv, email: emailEnv }) => {
      name = nameEnv;
      email = emailEnv;
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  context('1. Initial Page Load', () => {
    it('1.1 - Should display the title and description', () => {
      cy.get('[data-cy="header-title"]').should('contain.text', 'Deixe sua avaliação');
      cy.get('[data-cy="header-description"]').should(
        'contain.text',
        'Ficamos felizes com a sua compra'
      );
    });

    it('1.2 - Should display the Step Indicator with step 1 active', () => {
      cy.get('[data-cy="step-identification"]').should('have.class', 'active');
      cy.get('[data-cy="step-review"]').should('not.have.class', 'active');
      cy.get('[data-cy="step-submit"]').should('not.have.class', 'active');
    });

    it('1.3 - Should display empty UserForm fields', () => {
      identificationPage.elements.nameInput().should('be.visible').and('have.value', '');
      identificationPage.elements.emailInput().should('be.visible').and('have.value', '');
    });

    it('1.4 - Should display only the "Avançar" button (no "Voltar" button)', () => {
      identificationPage.elements.nextBtn().should('be.visible');
      cy.get('[data-cy="btn-back"]').should('not.exist');
    });
  });

  context('2. Step 1 – Identification Form (UserForm)', () => {
    it('2.1 - Should advance to Step 2 when filling valid name and email', () => {
      identificationPage.fillForm(name, email);
      identificationPage.clickNext();

      reviewPage.isAtStep();
      identificationPage.isNotAtStep();
    });

    it('2.2 - Should not advance without filling the name', () => {
      identificationPage.fillForm(null, email);
      identificationPage.clickNext();

      identificationPage.isAtStep();
      identificationPage.elements.nameInput()
        .invoke('prop', 'validationMessage')
        .should('not.be.empty');
    });

    it('2.3 - Should not advance without filling the email', () => {
      identificationPage.fillForm(name, null);
      identificationPage.clickNext();

      identificationPage.isAtStep();
      identificationPage.elements.emailInput()
        .invoke('prop', 'validationMessage')
        .should('not.be.empty');
    });

    it('2.4 - Should not advance with an invalid email', () => {
      identificationPage.fillForm(name, 'email-invalido');
      identificationPage.clickNext();

      identificationPage.isAtStep();
      identificationPage.elements.emailInput()
        .invoke('prop', 'validity')
        .its('typeMismatch')
        .should('be.true');
    });
  });

  context('3. Step 2 – Review Form (ReviewForm)', () => {
    beforeEach(() => {
      identificationPage.fillForm(name, email);
      identificationPage.clickNext();
    });

    it('3.1 - Should display all 4 satisfaction options', () => {
      const options = ['unsatisfied', 'neutral', 'satisfied', 'very-satisfied'];
      options.forEach(option => {
        reviewPage.elements.radioOption(option).should('be.visible');
      });
    });

    it('3.2 - Should display the comment field with correct placeholder', () => {
      reviewPage.elements.commentInput()
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Conte como foi sua experiência com o produto...');
    });

    it('3.3 - Should display both "Voltar" and "Avançar" buttons', () => {
      reviewPage.elements.backBtn().should('be.visible');
      reviewPage.elements.nextBtn().should('be.visible');
    });

    it('3.4 - Should allow selecting each satisfaction option', () => {
      const options = ['unsatisfied', 'neutral', 'satisfied', 'very-satisfied'];

      options.forEach((option) => {
        reviewPage.elements.radioOption(option).click();
        reviewPage.elements.radioOption(option).find('input').should('be.checked');
      });
    });

    it('3.5 - Should advance to Step 3 when filling satisfaction and comment', () => {
      reviewPage.fillForm('satisfied', 'Ótimo produto!');
      reviewPage.clickNext();

      thanksPage.isAtStep();
      reviewPage.isNotAtStep();
    });

    it('3.6 - Should not advance without selecting a satisfaction option', () => {
      reviewPage.elements.commentInput().type('Comentário qualquer');
      reviewPage.clickNext();

      reviewPage.isAtStep();
    });

    it('3.7 - Should not advance without filling the comment', () => {
      reviewPage.elements.radioOption('satisfied').click();
      reviewPage.clickNext();

      reviewPage.isAtStep();
      reviewPage.elements.commentInput()
        .invoke('prop', 'validationMessage')
        .should('not.be.empty');
    });
  });

  context('4. Step 3 – Confirmation Screen (Thanks)', () => {
    beforeEach(() => {
      identificationPage.fillForm(name, email);
      identificationPage.clickNext();
      reviewPage.fillForm('very-satisfied', 'Produto excelente!');
      reviewPage.clickNext();
    });

    it('4.1 - Should display the title "Falta pouco..."', () => {
      thanksPage.elements.title().should('contain.text', 'Falta pouco...');
    });

    it('4.2 - Should display the summary with the user name', () => {
      thanksPage.elements.summaryTitle().should('contain.text', name);
    });

    it('4.3 - Should display the corresponding satisfaction icon', () => {
      thanksPage.elements.reviewIcon().should('exist');
    });

    it('4.4 - Should display the typed comment', () => {
      thanksPage.elements.comment().should('contain.text', 'Produto excelente!');
    });

    it('4.5 - Should display "Voltar" and "Enviar" buttons (no "Avançar")', () => {
      thanksPage.elements.backBtn().should('be.visible');
      thanksPage.elements.submitBtn().should('be.visible');
      cy.get('[data-cy="btn-next"]').should('not.exist');
    });
  });

  context('5. Step Navigation', () => {
    it('5.1 - Should go back from Step 2 to Step 1', () => {
      identificationPage.fillForm(name, email);
      identificationPage.clickNext();

      reviewPage.isAtStep();
      reviewPage.clickBack();
      identificationPage.isAtStep();
    });

    it('5.2 - Should go back from Step 3 to Step 2', () => {
      identificationPage.fillForm(name, email);
      identificationPage.clickNext();
      reviewPage.fillForm('satisfied', 'Bom produto');
      reviewPage.clickNext();

      thanksPage.isAtStep();
      thanksPage.clickBack();
      reviewPage.isAtStep();
    });

    it('5.3 - Should update the Step Indicator when navigating', () => {
      // Step 1 - only identification active
      cy.get('[data-cy="step-identification"]').should('have.class', 'active');
      cy.get('[data-cy="step-review"]').should('not.have.class', 'active');
      cy.get('[data-cy="step-submit"]').should('not.have.class', 'active');

      // Go to Step 2
      identificationPage.fillForm(name, email);
      identificationPage.clickNext();

      cy.get('[data-cy="step-identification"]').should('have.class', 'active');
      cy.get('[data-cy="step-review"]').should('have.class', 'active');
      cy.get('[data-cy="step-submit"]').should('not.have.class', 'active');

      // Go to Step 3
      reviewPage.fillForm('neutral', 'OK');
      reviewPage.clickNext();

      cy.get('[data-cy="step-identification"]').should('have.class', 'active');
      cy.get('[data-cy="step-review"]').should('have.class', 'active');
      cy.get('[data-cy="step-submit"]').should('have.class', 'active');
    });

    it('5.4 - Should preserve data when navigating between steps', () => {
      identificationPage.fillForm(name, email);
      identificationPage.clickNext();
      reviewPage.fillForm('satisfied', 'Bom produto');

      // Go back to Step 1 and verify preserved data
      reviewPage.clickBack();
      identificationPage.elements.nameInput().should('have.value', name);
      identificationPage.elements.emailInput().should('have.value', email);

      // Go back to Step 2 and verify preserved data
      identificationPage.clickNext();
      reviewPage.elements.radioOption('satisfied').find('input').should('be.checked');
      reviewPage.elements.commentInput().should('have.value', 'Bom produto');
    });
  });

  context('6. Complete Flow (Happy Path)', () => {
    it('6.1 - Should complete the entire form successfully', () => {
      // Step 1 - Identification
      identificationPage.isAtStep();
      identificationPage.fillForm(name, email);
      identificationPage.clickNext();

      // Step 2 - Review
      reviewPage.isAtStep();
      reviewPage.fillForm('very-satisfied', 'Produto incrível, superou expectativas!');
      reviewPage.clickNext();

      // Step 3 - Verify summary
      thanksPage.isAtStep();
      thanksPage.elements.title().should('contain.text', 'Falta pouco...');
      thanksPage.elements.summaryTitle().should('contain.text', name);
      thanksPage.elements.reviewIcon().should('exist');
      thanksPage.elements.comment().should(
        'contain.text',
        'Produto incrível, superou expectativas!'
      );
      thanksPage.elements.submitBtn().should('be.visible');
    });
  });
});
