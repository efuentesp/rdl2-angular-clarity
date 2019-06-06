/* PSG  Parametroscomisiones Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { ParametroscomisionesRoutingModule } from './parametroscomisiones.psg.routing';
import { ParametroscomisionesService } from './parametroscomisiones.psg.service';
import { ParametroscomisionesAdministrar } from './administrar/parametroscomisiones-administrar';
import { ParametroscomisionesAgregarForm } from './agregar/parametroscomisiones-agregar-form';
import { ParametroscomisionesEditarForm } from './editar/parametroscomisiones-editar-form';
import { ParametroscomisionesEliminarForm } from './eliminar/parametroscomisiones-eliminar-form';

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

    ParametroscomisionesRoutingModule,
  ],
  declarations: [
    ParametroscomisionesAdministrar,
    ParametroscomisionesAgregarForm,
    ParametroscomisionesEditarForm,
    ParametroscomisionesEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, ParametroscomisionesService],
})
export class ParametroscomisionesModule {}
