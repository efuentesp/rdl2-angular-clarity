import EditAfiliado from '../pageobject/editafiliado.js'
import DeleteAfiliado from '../pageobject/deleteafiliado.js'
import AddAfiliado from '../pageobject/addafiliado.js'
import Common from '../pageobject/common.js'

export default class SearchAfiliado extends Common {
	
	add(values) {
		const a = new AddAfiliado()
		a.add(values)
		a.validateMessage()
	}
	
	edit(values) {
		const e = new EditAfiliado()
		e.edit(values)
		e.validateMessage()
	}
	
	remove(values) {
		const r = new EditAfiliado()
		r.edit(values)
		r.validateMessage()
	}
	
	goToRelationship(relationshipName){
		var regex = new RegExp('\\b' + relationshipName + '\\b')
		
		cy.get('div.datagrid-body').within(() => {
			cy.get('.datagrid-row').last().within(() => {
				cy.get('button')
				  .contains(regex)
				  .click({ force: true })
			})
		})
	}
}