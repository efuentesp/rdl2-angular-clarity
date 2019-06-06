/* PSG  Comitetecnico Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { ComitetecnicoRoutingModule } from './comitetecnico.psg.routing';
import { ComitetecnicoService } from './comitetecnico.psg.service';
import { ComitetecnicoAdministrar } from './administrar/comitetecnico-administrar';
import { ComitetecnicoAgregarForm } from './agregar/comitetecnico-agregar-form';
import { ComitetecnicoEditarForm } from './editar/comitetecnico-editar-form';
import { ComitetecnicoEliminarForm } from './eliminar/comitetecnico-eliminar-form';

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

    ComitetecnicoRoutingModule,
  ],
  declarations: [
    ComitetecnicoAdministrar,
    ComitetecnicoAgregarForm,
    ComitetecnicoEditarForm,
    ComitetecnicoEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, ComitetecnicoService],
})
export class ComitetecnicoModule {}
