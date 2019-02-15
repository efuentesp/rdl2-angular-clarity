/* PSG  Afiliado Module */
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { HttpModule } from '@angular/http';
import { ShoppingcartDemo } from './shoppingcart.psg';
import { ROUTING } from './shoppingcart.psg.routing';
import { Shoppingcart } from './shoppingcart/shoppingcart';

// import { ROUTING } from './afiliado.psg.routing';
// import { AfiliadoService } from './afiliado.psg.service';
// import { AfiliadoDemo } from './afiliado.psg';
// import { AfiliadoAdministrarDemo } from './administrar/afiliado-administrar';
// import { AfiliadoAgregarDemo } from './agregar/afiliado-agregar';
// import { AfiliadoAgregarFormDemo } from './agregar/afiliado-agregar-form';
// import { AfiliadoEditarDemo } from './editar/afiliado-editar';
// import { AfiliadoEditarFormDemo } from './editar/afiliado-editar-form';
// import { AfiliadoEliminarFormDemo } from './eliminar/afiliado-eliminar-form';
// import { AfiliadoEliminarDemo } from './eliminar/afiliado-eliminar';

// import { BeneficiarioDetailsFormDemo } from './beneficiario-details/beneficiario-details';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [ShoppingcartDemo, Shoppingcart],
  exports: [ShoppingcartDemo, Shoppingcart],
  providers: [ValidationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShoppingcartDemoModule {}
