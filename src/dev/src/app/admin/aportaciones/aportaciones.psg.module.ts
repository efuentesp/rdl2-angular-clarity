/* PSG  Aportaciones Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { AportacionesRoutingModule } from './aportaciones.psg.routing';
import { AportacionesService } from './aportaciones.psg.service';
import { AportacionesAdministrar } from './administrar/aportaciones-administrar';
import { AportacionesAgregarForm } from './agregar/aportaciones-agregar-form';
import { AportacionesEditarForm } from './editar/aportaciones-editar-form';
import { AportacionesEliminarForm } from './eliminar/aportaciones-eliminar-form';

import { InstruccionService } from '../instruccion/instruccion.psg.service';
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

    AportacionesRoutingModule,
  ],
  declarations: [AportacionesAdministrar, AportacionesAgregarForm, AportacionesEditarForm, AportacionesEliminarForm],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [InstruccionService, FideicomisoService, SubfisoService, AportacionesService],
})
export class AportacionesModule {}
