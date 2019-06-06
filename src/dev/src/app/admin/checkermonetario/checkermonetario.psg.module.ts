/* PSG  Checkermonetario Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { CheckermonetarioRoutingModule } from './checkermonetario.psg.routing';
import { CheckermonetarioService } from './checkermonetario.psg.service';
import { CheckermonetarioAdministrar } from './administrar/checkermonetario-administrar';
import { CheckermonetarioAgregarForm } from './agregar/checkermonetario-agregar-form';
import { CheckermonetarioEditarForm } from './editar/checkermonetario-editar-form';
import { CheckermonetarioEliminarForm } from './eliminar/checkermonetario-eliminar-form';

import { FideicomisoService } from '../fideicomiso/fideicomiso.psg.service';
import { SubfisoService } from '../subfiso/subfiso.psg.service';
import { InstruccionService } from '../instruccion/instruccion.psg.service';
import { TransaccionService } from '../transaccion/transaccion.psg.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,

    CheckermonetarioRoutingModule,
  ],
  declarations: [
    CheckermonetarioAdministrar,
    CheckermonetarioAgregarForm,
    CheckermonetarioEditarForm,
    CheckermonetarioEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, SubfisoService, InstruccionService, TransaccionService, CheckermonetarioService],
})
export class CheckermonetarioModule {}
