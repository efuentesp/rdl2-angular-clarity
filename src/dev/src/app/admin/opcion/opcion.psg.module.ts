/* PSG  Opcion Module */
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { HttpModule } from '@angular/http';

import { ROUTING } from './opcion.psg.routing';
import { OpcionService } from './opcion.psg.service';
import { OpcionDemo } from './opcion.psg';
import { OpcionAdministrarDemo } from './administrar/opcion-administrar';
import { OpcionAgregarDemo } from './agregar/opcion-agregar';
import { OpcionAgregarFormDemo } from './agregar/opcion-agregar-form';
import { OpcionEditarDemo } from './editar/opcion-editar';
import { OpcionEditarFormDemo } from './editar/opcion-editar-form';
import { OpcionEliminarFormDemo } from './eliminar/opcion-eliminar-form';
import { OpcionEliminarDemo } from './eliminar/opcion-eliminar';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [
    OpcionDemo,
    OpcionAdministrarDemo,
    OpcionAgregarDemo,
    OpcionAgregarFormDemo,
    OpcionEditarFormDemo,
    OpcionEditarDemo,
    OpcionEliminarFormDemo,
    OpcionEliminarDemo,
  ],
  exports: [
    OpcionDemo,
    OpcionAdministrarDemo,
    OpcionAgregarDemo,
    OpcionAgregarFormDemo,
    OpcionEditarFormDemo,
    OpcionEditarDemo,
    OpcionEliminarFormDemo,
    OpcionEliminarDemo,
  ],
  providers: [ValidationService, OpcionService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OpcionDemoModule {}
