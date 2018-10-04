import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TipopensionDemo } from './tipopension.demo';
import { ROUTING } from './tipopension.demo.routing';
import { Inventory } from './inventory/inventory';
import { TipopensionAdministrarDemo } from './administrar/tipopension-administrar';
import { TipopensionAgregarDemo } from './agregar/tipopension-agregar';
import { TipopensionAgregarFormDemo } from './agregar/tipopension-agregar-form';
import { TipopensionEditarFormDemo } from './editar/tipopension-editar-form';
import { TipopensionEliminarFormDemo } from './eliminar/tipopension-eliminar-form';
import { TipopensionEditarDemo } from './editar/tipopension-editar';
import { TipopensionEliminarDemo } from './eliminar/tipopension-eliminar';
import { ValidationService } from '../../_validation/validation.service';
import { TipopensionService } from './tipopension.demo.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [
    TipopensionDemo,
    TipopensionAdministrarDemo,
    TipopensionAgregarDemo,
    TipopensionAgregarFormDemo,
    TipopensionEditarFormDemo,
    TipopensionEliminarFormDemo,
    TipopensionEditarDemo,
    TipopensionEliminarDemo,
  ],
  exports: [
    TipopensionDemo,
    TipopensionAdministrarDemo,
    TipopensionAgregarDemo,
    TipopensionAgregarFormDemo,
    TipopensionEditarFormDemo,
    TipopensionEliminarFormDemo,
    TipopensionEditarDemo,
    TipopensionEliminarDemo,
  ],
  providers: [Inventory, ValidationService, TipopensionService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TipopensionDemoModule {}
