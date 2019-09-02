describe("Test VentaDirecto", function () {
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

        
    it('Consulta datos a eliminar de ventadirecto', function () {
        cy.get('div.nav-content').within(() => {
            cy.get('span.nav-text').contains('Fiduciario').click()
            cy.get('span.nav-text').contains('Instrucción de venta de valores').click()
        })

        cy.get('div.content-area').within(() => {
            cy.get('div.datagrid').within(() => {
                cy.get('clr-dg-action-overflow#0').click()
                cy.get('button').contains('Borrar').click()
            })
        })	

        cy.get('div.content-area').contains('Eliminar Instrucción de venta de valores').within(() => {
			cy.get('app-outputbox[label="Instrucción"]').within(() => {
			    cy.get('label').contains('Instrucción')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})			
			cy.get('app-outputbox[label="Fecha valor"]').within(() => {
			    cy.get('label').contains('Fecha valor')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})
			cy.get('app-outputbox[label="Títulos en garantía"]').within(() => {
			    cy.get('label').contains('Títulos en garantía')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})		
			cy.get('app-outputbox[label="Sub fiso"]').within(() => {
			    cy.get('label').contains('Sub fiso')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})			
			cy.get('app-outputbox[label="Operación Futura"]').within(() => {
			    cy.get('label').contains('Operación Futura')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})		
			cy.get('app-outputbox[label="Fecha de operación"]').within(() => {
			    cy.get('label').contains('Fecha de operación')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})	
			cy.get('app-outputbox[label="Activos"]').within(() => {
			    cy.get('label').contains('Activos')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})		
			cy.get('app-outputbox[label="Tipo movimiento"]').within(() => {
			    cy.get('label').contains('Tipo movimiento')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})
			cy.get('app-outputbox[label="Importe"]').within(() => {
			    cy.get('label').contains('Importe')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})
			cy.get('app-outputbox[label="Custodio"]').within(() => {
			    cy.get('label').contains('Custodio')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})
			cy.get('app-outputbox[label="Comisión"]').within(() => {
			    cy.get('label').contains('Comisión')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})
			cy.get('app-outputbox[label="Mercado"]').within(() => {
			    cy.get('label').contains('Mercado')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})		
			cy.get('app-outputbox[label="Instrumento"]').within(() => {
			    cy.get('label').contains('Instrumento')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})		
			cy.get('app-outputbox[label="ISR"]').within(() => {
			    cy.get('label').contains('ISR')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})
			cy.get('app-outputbox[label="Moneda"]').within(() => {
			    cy.get('label').contains('Moneda')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})		
			cy.get('app-outputbox[label="Fideicomiso"]').within(() => {
			    cy.get('label').contains('Fideicomiso')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})			
			cy.get('app-outputbox[label="Contrato de inversión"]').within(() => {
			    cy.get('label').contains('Contrato de inversión')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})			
			cy.get('app-outputbox[label="Fecha de Liquidación"]').within(() => {
			    cy.get('label').contains('Fecha de Liquidación')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})
			cy.get('app-outputbox[label="Emisiones"]').within(() => {
			    cy.get('label').contains('Emisiones')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})		
			cy.get('app-outputbox[label="Serie"]').within(() => {
			    cy.get('label').contains('Serie')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})
			cy.get('app-outputbox[label="No. Títulos"]').within(() => {
			    cy.get('label').contains('No. Títulos')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})
			cy.get('app-outputbox[label="Precio"]').within(() => {
			    cy.get('label').contains('Precio')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})
			cy.get('app-outputbox[label="Descripción complementaria"]').within(() => {
			    cy.get('label').contains('Descripción complementaria')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})
			cy.get('app-outputbox[label="Intereses"]').within(() => {
			    cy.get('label').contains('Intereses')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})
			cy.get('app-outputbox[label="Pizarra/Clave de cotización"]').within(() => {
			    cy.get('label').contains('Pizarra/Clave de cotización')
			    cy.get('div.clr-control-container').should(($p) => {
			        if ($p.length !== 1) {
			            throw new Error('Did not find 1 element')
			        } else if ($p.text() === '') {
			            throw new Error('There are not data')
			        }
			    })
			})
			cy.get('app-outputbox[label="Cupón"]').within(() => {
			    cy.get('label').contains('Cupón')
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
