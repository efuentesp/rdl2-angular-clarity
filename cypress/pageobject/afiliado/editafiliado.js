import Common from './common.js';

export default class EditAfiliado extends Common {
  edit(values) {
    cy.get('div.datagrid-body').within(() => {
      cy
        .get('.datagrid-row')
        .last()
        .within(() => {
          cy
            .get('button')
            .contains(/\bEditar\b/)
            .click({ force: true });
        });
    });

    cy.url().should('contain', '/Afiliado/editar');

    Object.keys(values).forEach(function(key) {
      if (key.split('_')[0] == 'f') {
        cy
          .get('#' + key.split('_')[1])
          .clear()
          .type(values[key]);
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
      .contains(/\bEditar\b/)
      .click();
  }

  validateMessage() {
    cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Afiliado save successfully.');

    cy.wait(1000);

    cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click();
  }
}
