/* PSG  Grupoa Module */
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { HttpModule } from '@angular/http';

import { ROUTING } from './grupoa.psg.routing';
import { GrupoaService } from './grupoa.psg.service';
import { GrupoaDemo } from './grupoa.psg';
import { GrupoaAdministrarDemo } from './administrar/grupoa-administrar';
import { GrupoaAgregarDemo } from './agregar/grupoa-agregar';
import { GrupoaAgregarFormDemo } from './agregar/grupoa-agregar-form';
import { GrupoaEditarDemo } from './editar/grupoa-editar';
import { GrupoaEditarFormDemo } from './editar/grupoa-editar-form';
import { GrupoaEliminarFormDemo } from './eliminar/grupoa-eliminar-form';
import { GrupoaEliminarDemo } from './eliminar/grupoa-eliminar';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [
    GrupoaDemo,
    GrupoaAdministrarDemo,
    GrupoaAgregarDemo,
    GrupoaAgregarFormDemo,
    GrupoaEditarFormDemo,
    GrupoaEditarDemo,
    GrupoaEliminarFormDemo,
    GrupoaEliminarDemo,
  ],
  exports: [
    GrupoaDemo,
    GrupoaAdministrarDemo,
    GrupoaAgregarDemo,
    GrupoaAgregarFormDemo,
    GrupoaEditarFormDemo,
    GrupoaEditarDemo,
    GrupoaEliminarFormDemo,
    GrupoaEliminarDemo,
  ],
  providers: [ValidationService, GrupoaService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GrupoaDemoModule {}
