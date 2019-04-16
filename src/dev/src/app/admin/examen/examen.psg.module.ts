/* PSG  Examen Module */
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { HttpModule } from '@angular/http';

import { ROUTING } from './examen.psg.routing';
import { ExamenService } from './examen.psg.service';
import { ExamenDemo } from './examen.psg';
import { ExamenAdministrarDemo } from './administrar/examen-administrar';
import { ExamenAgregarDemo } from './agregar/examen-agregar';
import { ExamenAgregarFormDemo } from './agregar/examen-agregar-form';
import { ExamenEditarDemo } from './editar/examen-editar';
import { ExamenEditarFormDemo } from './editar/examen-editar-form';
import { ExamenEliminarFormDemo } from './eliminar/examen-eliminar-form';
import { ExamenEliminarDemo } from './eliminar/examen-eliminar';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [
    ExamenDemo,
    ExamenAdministrarDemo,
    ExamenAgregarDemo,
    ExamenAgregarFormDemo,
    ExamenEditarFormDemo,
    ExamenEditarDemo,
    ExamenEliminarFormDemo,
    ExamenEliminarDemo,
  ],
  exports: [
    ExamenDemo,
    ExamenAdministrarDemo,
    ExamenAgregarDemo,
    ExamenAgregarFormDemo,
    ExamenEditarFormDemo,
    ExamenEditarDemo,
    ExamenEliminarFormDemo,
    ExamenEliminarDemo,
  ],
  providers: [ValidationService, ExamenService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExamenDemoModule {}
