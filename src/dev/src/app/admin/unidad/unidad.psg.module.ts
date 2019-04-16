/* PSG  Unidad Module */
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { HttpModule } from '@angular/http';

import { ROUTING } from './unidad.psg.routing';
import { UnidadService } from './unidad.psg.service';
import { UnidadDemo } from './unidad.psg';
import { UnidadAdministrarDemo } from './administrar/unidad-administrar';
import { UnidadAgregarDemo } from './agregar/unidad-agregar';
import { UnidadAgregarFormDemo } from './agregar/unidad-agregar-form';
import { UnidadEditarDemo } from './editar/unidad-editar';
import { UnidadEditarFormDemo } from './editar/unidad-editar-form';
import { UnidadEliminarFormDemo } from './eliminar/unidad-eliminar-form';
import { UnidadEliminarDemo } from './eliminar/unidad-eliminar';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [
    UnidadDemo,
    UnidadAdministrarDemo,
    UnidadAgregarDemo,
    UnidadAgregarFormDemo,
    UnidadEditarFormDemo,
    UnidadEditarDemo,
    UnidadEliminarFormDemo,
    UnidadEliminarDemo,
  ],
  exports: [
    UnidadDemo,
    UnidadAdministrarDemo,
    UnidadAgregarDemo,
    UnidadAgregarFormDemo,
    UnidadEditarFormDemo,
    UnidadEditarDemo,
    UnidadEliminarFormDemo,
    UnidadEliminarDemo,
  ],
  providers: [ValidationService, UnidadService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UnidadDemoModule {}
