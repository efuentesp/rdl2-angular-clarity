/* PSG  Agenda Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { AgendaRoutingModule } from './agenda.psg.routing';
import { AgendaService } from './agenda.psg.service';
import { AgendaAdministrar } from './administrar/agenda-administrar';
import { AgendaAgregarForm } from './agregar/agenda-agregar-form';
import { AgendaEditarForm } from './editar/agenda-editar-form';
import { AgendaEliminarForm } from './eliminar/agenda-eliminar-form';

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

    AgendaRoutingModule,
  ],
  declarations: [AgendaAdministrar, AgendaAgregarForm, AgendaEditarForm, AgendaEliminarForm],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, SubfisoService, AgendaService],
})
export class AgendaModule {}
