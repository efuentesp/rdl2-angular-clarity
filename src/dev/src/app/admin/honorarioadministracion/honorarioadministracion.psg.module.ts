/* PSG  Honorarioadministracion Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { HonorarioadministracionRoutingModule } from './honorarioadministracion.psg.routing';
import { HonorarioadministracionService } from './honorarioadministracion.psg.service';
import { HonorarioadministracionAdministrar } from './administrar/honorarioadministracion-administrar';
import { HonorarioadministracionAgregarForm } from './agregar/honorarioadministracion-agregar-form';
import { HonorarioadministracionEditarForm } from './editar/honorarioadministracion-editar-form';
import { HonorarioadministracionEliminarForm } from './eliminar/honorarioadministracion-eliminar-form';

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

    HonorarioadministracionRoutingModule,
  ],
  declarations: [
    HonorarioadministracionAdministrar,
    HonorarioadministracionAgregarForm,
    HonorarioadministracionEditarForm,
    HonorarioadministracionEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, HonorarioadministracionService],
})
export class HonorarioadministracionModule {}
