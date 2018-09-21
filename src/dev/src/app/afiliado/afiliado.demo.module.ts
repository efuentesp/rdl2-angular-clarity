import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { AfiliadoDemo } from './afiliado.demo';
import { ROUTING } from './afiliado.demo.routing';
import { Inventory } from './inventory/inventory';
import { AfiliadoAdministrarDemo } from './administrar/afiliado-administrar';
import { AfiliadoAgregarDemo } from './agregar/afiliado-agregar';
import { AfiliadoAgregarFormDemo } from './agregar/afiliado-agregar-form';
import { AfiliadoEditarFormDemo } from './editar/afiliado-editar-form';
import { AfiliadoEliminarFormDemo } from './eliminar/afiliado-eliminar-form';
import { AfiliadoEditarDemo } from './editar/afiliado-editar';
import { AfiliadoEliminarDemo } from './eliminar/afiliado-eliminar';
import { ValidationService } from '../_validation/validation.service';
import { AfiliadoService } from './afiliado.demo.service';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [
    CommonModule, 
    ClarityModule, 
    ROUTING, 
    HttpModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  declarations: [
    AfiliadoDemo,
    AfiliadoAdministrarDemo,
    AfiliadoAgregarDemo,
    AfiliadoAgregarFormDemo,
    AfiliadoEditarFormDemo,
    AfiliadoEliminarFormDemo,
    AfiliadoEditarDemo,
    AfiliadoEliminarDemo
  ],
  exports: [
    AfiliadoDemo,
    AfiliadoAdministrarDemo,
    AfiliadoAgregarDemo,
    AfiliadoAgregarFormDemo,
    AfiliadoEditarFormDemo,
    AfiliadoEliminarFormDemo,
    AfiliadoEditarDemo,
    AfiliadoEliminarDemo,
  ],  
  providers:[
    Inventory,
    ValidationService,
    AfiliadoService
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AfiliadoDemoModule {}
