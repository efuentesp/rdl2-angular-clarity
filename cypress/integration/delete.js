describe("Test Fideicomiso", function () {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    beforeEach(function () {
        cy.visit('http://localhost:4200/')
        cy.get('input[formcontrolname="email"]').type("efuentes@softtek.com")
        cy.get('input[formcontrolname="password"]').type("edgar")
        cy.get('button').contains('Login').click()
        cy.url().should('contain', 'admin')
    })

    it('Consulta datos a eliminar de fideicomiso', function () {
        cy.get('div.nav-content').within(() => {
            cy.get('span.nav-text').contains('Fiduciario').click()
            cy.get('span.nav-text').contains('Prospecto').click()
        })

        cy.get('div.content-area').within(() => {
            cy.get('div.datagrid').within(() => {
                cy.get('clr-dg-action-overflow#2').click()
                cy.get('button').contains('Borrar').click()
            })
        })

        cy.get('div.content-area').contains('Eliminar Fideicomiso').within(() => {
            cy.get('app-outputbox[label="Referencia uno a entidad Dummy"]').within(() => {
                cy.get('label').contains('Referencia uno a entidad Dummy')
                cy.get('div.clr-control-container').should(($p) => {
                    if ($p.length !== 1) {
                        throw new Error('Did not find 1 element')
                    } else if ($p.text() === '') {
                        throw new Error('There are not data')
                    }
                })
            })

            cy.get('app-outputbox[label="Referencia uno a enumeración Dummy"]').within(() => {
                cy.get('label').contains('Referencia uno a enumeración Dummy')
                cy.get('div.clr-control-container').should(($p) => {
                    if ($p.length !== 1) {
                        throw new Error('Did not find 1 element')
                    } else if ($p.text() === '') {
                        throw new Error('There are not data')
                    }
                })
            })
        })
    })
})
