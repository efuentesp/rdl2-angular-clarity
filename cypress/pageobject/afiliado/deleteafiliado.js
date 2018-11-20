import Common from './common.js';

export default class DeleteAfiliado extends Common {
  remove(values) {
    cy.get('div.datagrid-body').within(() => {
      cy
        .get('.datagrid-row')
        .last()
        .within(() => {
          cy
            .get('button')
            .contains(/\bEliminar\b/)
            .click({ force: true });
        });
    });

    cy.url().should('contain', '/Afiliado/eliminar');

    cy
      .get('button')
      .contains(/\bEliminar\b/)
      .click();
  }

  validateMessage() {
    cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click();
    cy
      .get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content')
      .should('contain', 'Afiliado item has been deleted successfully.');
    cy.wait(1000);
    cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click();
  }
}
