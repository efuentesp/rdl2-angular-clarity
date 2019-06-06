/* PSG  Instruccion Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { InstruccionRoutingModule } from './instruccion.psg.routing';
import { InstruccionService } from './instruccion.psg.service';
import { InstruccionAdministrar } from './administrar/instruccion-administrar';
import { InstruccionAgregarForm } from './agregar/instruccion-agregar-form';
import { InstruccionEditarForm } from './editar/instruccion-editar-form';
import { InstruccionEliminarForm } from './eliminar/instruccion-eliminar-form';

import { FideicomisoService } from '../fideicomiso/fideicomiso.psg.service';
import { SubfisoService } from '../subfiso/subfiso.psg.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,

    InstruccionRoutingModule,
  ],
  declarations: [InstruccionAdministrar, InstruccionAgregarForm, InstruccionEditarForm, InstruccionEliminarForm],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, SubfisoService, InstruccionService],
})
export class InstruccionModule {}
