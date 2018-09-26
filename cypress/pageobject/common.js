export default class Common {
	login(user, password) {
		cy.visit(Cypress.env('api_server'))
	}
	
	goToMenu(){
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
		cy.url().should('contain', '/Afiliado/administrar')
		cy.wait(1000)
	}
	
	logout(){
		// Code Here
	}
}
