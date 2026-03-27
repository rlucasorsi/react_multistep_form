class IdentificationPage {
  elements = {
    nameInput: () => cy.get('[data-cy="input-name"]'),
    emailInput: () => cy.get('[data-cy="input-email"]'),
    nextBtn: () => cy.get('[data-cy="btn-next"]'),
    form: () => cy.get('[data-cy="user-form"]'),
  };

  fillForm(name, email) {
    if (name) {
      this.elements.nameInput().clear().type(name);
    }
    if (email) {
      this.elements.emailInput().clear().type(email);
    }
  }

  clickNext() {
    this.elements.nextBtn().click();
  }

  isAtStep() {
    this.elements.form().should('be.visible');
  }

  isNotAtStep() {
    this.elements.form().should('not.exist');
  }
}

export default new IdentificationPage();
