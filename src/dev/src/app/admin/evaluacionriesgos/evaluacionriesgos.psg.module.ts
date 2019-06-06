/* PSG  Evaluacionriesgos Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { EvaluacionriesgosRoutingModule } from './evaluacionriesgos.psg.routing';
import { EvaluacionriesgosService } from './evaluacionriesgos.psg.service';
import { EvaluacionriesgosAdministrar } from './administrar/evaluacionriesgos-administrar';
import { EvaluacionriesgosAgregarForm } from './agregar/evaluacionriesgos-agregar-form';
import { EvaluacionriesgosEditarForm } from './editar/evaluacionriesgos-editar-form';
import { EvaluacionriesgosEliminarForm } from './eliminar/evaluacionriesgos-eliminar-form';

import { FideicomisoService } from '../fideicomiso/fideicomiso.psg.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,

    EvaluacionriesgosRoutingModule,
  ],
  declarations: [
    EvaluacionriesgosAdministrar,
    EvaluacionriesgosAgregarForm,
    EvaluacionriesgosEditarForm,
    EvaluacionriesgosEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, EvaluacionriesgosService],
})
export class EvaluacionriesgosModule {}
