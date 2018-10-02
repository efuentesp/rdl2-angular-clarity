import Common from './common.js';

export default class AddAfiliado extends Common {
  add(values) {
    cy
      .get('button')
      .contains(/\bAgregar\b/)
      .click();

    cy.url().should('contain', '/Afiliado/agregar');

    Object.keys(values).forEach(function(key) {
      if (key.split('_')[0] == 'f') {
        cy.get('#' + key.split('_')[1]).type(values[key]);
      } else if (key.split('_')[0] == 's') {
        cy.get('#' + key.split('_')[1]).within(() => {
          cy
            .get('clr-radio-wrapper')
            .contains(values[key])
            .within(() => {
              cy.get('input[type="radio"]').check();
            });
        });
      } else if (key.split('_')[0] == 'm') {
        cy.get('div#' + key.split('_')[1]).within(() => {
          cy
            .get('button')
            .contains('clr-icon[shape="search"]')
            .click();
          cy.get('clr-modal>div.modal-body').as('modal-body');
          cy.get('@modal-body').within(() => {
            cy
              .get('table>div[class="datagrid-body"]>clr-dg-row')
              .first()
              .as('row');
            cy.get('@row').within(() => {
              cy.get('input[type="radio"]').check();
            });
          });

          cy.get('clr-modal>div.modal-footer').as('modal-footer');
          cy.get('@modal-footer').within(() => {
            cy.get('button').contains(/\bElegir\b/);
          });
        });
      } else if (key.split('_')[0] == 'fl') {
        cy.uploadFile('#' + key.split('_')[1], values[key]);
      }
    });

    cy
      .get('button')
      .contains(/\bAgregar\b/)
      .click();
  }

  validateMessage() {
    cy
      .get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content')
      .should('contain', 'Etiquetaasignada save successfully.');

    cy.wait(1000);

    cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click();
  }
}
