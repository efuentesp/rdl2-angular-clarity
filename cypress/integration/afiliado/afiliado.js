describe('Prueba Afiliado', function() {
	
	it('1. Crear una Aplicación nueva con datos incompletos', function() {	
		cy.visit(Cypress.env('api_server'))
		
		// goToMenu
		cy.get('section.sidenav-content').within(() => {
			cy.get('section').contains('label', 'Pensiones').parent().as('menu')
			cy.get('@menu').within(() => {
				cy.get('li>a').as('opts').then(opts => {
					if(opts.is(':visible')){
						cy.get('li').contains('a', /\bAfiliado\b/).click()
					} else {
						cy.get('@menu').click()
						cy.get('li').contains('a', /\bAfiliado\b/).click()
					}
				})
			})
		})
		cy.wait(1000)
		
		// Agregar
		cy.get('button').contains(/\bAgregar\b/).click()
		cy.get('input#nss').type('123456789')
		cy.get('input#nombre').type('Miriam')
		cy.get('input#apellidopaterno').type('Garrido')
		cy.get('input#apellidomaterno').type('Guevara')
		cy.get('input[value="masculino"]').check()
		cy.get('textarea#observaciones').type('Observaciones')
		cy.get('input#fechaafiliacion').type('09/24/2018')
		cy.get('input#correo').type('miriam.garridog@softtek.com')
		cy.get('input#semanascotizadas').type('123')
		cy.get('input#numero').type('456')
		cy.uploadFile('#foto', 'foto_test.png')
		cy.uploadFile('#actanacimiento', 'foto_test.png')
		cy.get('button').contains(/\bAgregar\b/).click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Etiquetaasignada save successfully.')
		cy.wait(1000)
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
		
		cy.get('section.sidenav-content').within(() => {
			cy.get('section').contains('label', /\bPensiones\b/).parent().as('menu')
			cy.get('@menu').within(() => {
				cy.get('li>a').as('opts').then(opts => {
					if(opts.is(':visible')){
						cy.get('li').contains('a', /\bAfiliado\b/).click()
					} else {
						cy.get('@menu').click()
						cy.get('li').contains('a', /\bAfiliado\b/).click()
					}
				})
			})
		})
		cy.wait(1000)
		
		// Editar
		
		// Select row from table
		cy.get('div.datagrid-body').within(() => {
			cy.get('.datagrid-row').last().within(() => {
				cy.get('button').contains(/\bEditar\b/).click({ force: true })
			})
		})
		
		cy.get('input#nss').clear().type('987654321')
		cy.get('input#nombre').clear().type('Miriam')
		cy.get('input#apellidopaterno').clear().type('Garrido')
		cy.get('input#apellidomaterno').clear().type('Guevara')
		cy.get('input[value="femenino"]').check()
		cy.get('textarea#observaciones').clear().type('Observaciones editadas')
		cy.get('input#fechaafiliacion').clear().type('09/25/2018')
		cy.get('input#correo').clear().type('mgarrido@softtek.com')
		cy.get('input#semanascotizadas').clear().type('456')
		cy.get('input#numero').clear().type('789')
		cy.uploadFile('#foto', 'foto_test.png')
		cy.uploadFile('#actanacimiento', 'foto_test.png')
		
		cy.get('button').contains(/\Editar\b/).click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Afiliado save successfully.')
		cy.wait(1000)
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
		
		// Eliminar
		
		// Select row from table
		cy.get('div.datagrid-body').within(() => {
			cy.get('.datagrid-row').last().within(() => {
				cy.get('button').contains(/\bEliminar\b/).click({ force: true })
			})
		})
		
		cy.get('button').contains(/\bEliminar\b/).click()
		
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Afiliado item has been deleted successfully.')
		cy.wait(1000)
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()

	})

})