class ThanksPage {
  elements = {
    title: () => cy.get('[data-cy="thanks-title"]'),
    summaryTitle: () => cy.get('[data-cy="thanks-summary-title"]'),
    reviewIcon: () => cy.get('[data-cy="thanks-review"]').find('svg'),
    comment: () => cy.get('[data-cy="thanks-comment"]'),
    submitBtn: () => cy.get('[data-cy="btn-submit"]'),
    backBtn: () => cy.get('[data-cy="btn-back"]'),
    container: () => cy.get('[data-cy="thanks-container"]'),
  };

  clickSubmit() {
    this.elements.submitBtn().click();
  }

  clickBack() {
    this.elements.backBtn().click();
  }

  isAtStep() {
    this.elements.container().should('be.visible');
  }
}

export default new ThanksPage();
