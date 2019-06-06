/* PSG  Fideicomisospendientesliberar Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { FideicomisospendientesliberarRoutingModule } from './fideicomisospendientesliberar.psg.routing';
import { FideicomisospendientesliberarService } from './fideicomisospendientesliberar.psg.service';
import { FideicomisospendientesliberarAdministrar } from './administrar/fideicomisospendientesliberar-administrar';
import { FideicomisospendientesliberarAgregarForm } from './agregar/fideicomisospendientesliberar-agregar-form';
import { FideicomisospendientesliberarEditarForm } from './editar/fideicomisospendientesliberar-editar-form';
import { FideicomisospendientesliberarEliminarForm } from './eliminar/fideicomisospendientesliberar-eliminar-form';

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

    FideicomisospendientesliberarRoutingModule,
  ],
  declarations: [
    FideicomisospendientesliberarAdministrar,
    FideicomisospendientesliberarAgregarForm,
    FideicomisospendientesliberarEditarForm,
    FideicomisospendientesliberarEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, FideicomisospendientesliberarService],
})
export class FideicomisospendientesliberarModule {}
