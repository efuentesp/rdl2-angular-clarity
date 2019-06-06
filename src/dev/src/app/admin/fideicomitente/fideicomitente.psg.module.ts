/* PSG  Fideicomitente Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { FideicomitenteRoutingModule } from './fideicomitente.psg.routing';
import { FideicomitenteService } from './fideicomitente.psg.service';
import { FideicomitenteAdministrar } from './administrar/fideicomitente-administrar';
import { FideicomitenteAgregarForm } from './agregar/fideicomitente-agregar-form';
import { FideicomitenteEditarForm } from './editar/fideicomitente-editar-form';
import { FideicomitenteEliminarForm } from './eliminar/fideicomitente-eliminar-form';

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

    FideicomitenteRoutingModule,
  ],
  declarations: [
    FideicomitenteAdministrar,
    FideicomitenteAgregarForm,
    FideicomitenteEditarForm,
    FideicomitenteEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, FideicomitenteService],
})
export class FideicomitenteModule {}
