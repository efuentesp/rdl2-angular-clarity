/* PSG  Recurso Module */
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { HttpModule } from '@angular/http';

import { ROUTING } from './recurso.psg.routing';
import { RecursoService } from './recurso.psg.service';
import { RecursoDemo } from './recurso.psg';
import { RecursoAdministrarDemo } from './administrar/recurso-administrar';
import { RecursoAgregarDemo } from './agregar/recurso-agregar';
import { RecursoAgregarFormDemo } from './agregar/recurso-agregar-form';
import { RecursoEditarDemo } from './editar/recurso-editar';
import { RecursoEditarFormDemo } from './editar/recurso-editar-form';
import { RecursoEliminarFormDemo } from './eliminar/recurso-eliminar-form';
import { RecursoEliminarDemo } from './eliminar/recurso-eliminar';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [
    RecursoDemo,
    RecursoAdministrarDemo,
    RecursoAgregarDemo,
    RecursoAgregarFormDemo,
    RecursoEditarFormDemo,
    RecursoEditarDemo,
    RecursoEliminarFormDemo,
    RecursoEliminarDemo,
  ],
  exports: [
    RecursoDemo,
    RecursoAdministrarDemo,
    RecursoAgregarDemo,
    RecursoAgregarFormDemo,
    RecursoEditarFormDemo,
    RecursoEditarDemo,
    RecursoEliminarFormDemo,
    RecursoEliminarDemo,
  ],
  providers: [ValidationService, RecursoService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecursoDemoModule {}
