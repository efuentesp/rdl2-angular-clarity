/* PSG  Pregunta Module */
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { HttpModule } from '@angular/http';

import { ROUTING } from './pregunta.psg.routing';
import { PreguntaService } from './pregunta.psg.service';
import { PreguntaDemo } from './pregunta.psg';
import { PreguntaAdministrarDemo } from './administrar/pregunta-administrar';
import { PreguntaAgregarDemo } from './agregar/pregunta-agregar';
import { PreguntaAgregarFormDemo } from './agregar/pregunta-agregar-form';
import { PreguntaEditarDemo } from './editar/pregunta-editar';
import { PreguntaEditarFormDemo } from './editar/pregunta-editar-form';
import { PreguntaEliminarFormDemo } from './eliminar/pregunta-eliminar-form';
import { PreguntaEliminarDemo } from './eliminar/pregunta-eliminar';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [
    PreguntaDemo,
    PreguntaAdministrarDemo,
    PreguntaAgregarDemo,
    PreguntaAgregarFormDemo,
    PreguntaEditarFormDemo,
    PreguntaEditarDemo,
    PreguntaEliminarFormDemo,
    PreguntaEliminarDemo,
  ],
  exports: [
    PreguntaDemo,
    PreguntaAdministrarDemo,
    PreguntaAgregarDemo,
    PreguntaAgregarFormDemo,
    PreguntaEditarFormDemo,
    PreguntaEditarDemo,
    PreguntaEliminarFormDemo,
    PreguntaEliminarDemo,
  ],
  providers: [ValidationService, PreguntaService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PreguntaDemoModule {}
