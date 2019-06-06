/* PSG  Autodeclaracioncrs Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { AutodeclaracioncrsRoutingModule } from './autodeclaracioncrs.psg.routing';
import { AutodeclaracioncrsService } from './autodeclaracioncrs.psg.service';
import { AutodeclaracioncrsAdministrar } from './administrar/autodeclaracioncrs-administrar';
import { AutodeclaracioncrsAgregarForm } from './agregar/autodeclaracioncrs-agregar-form';
import { AutodeclaracioncrsEditarForm } from './editar/autodeclaracioncrs-editar-form';
import { AutodeclaracioncrsEliminarForm } from './eliminar/autodeclaracioncrs-eliminar-form';

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

    AutodeclaracioncrsRoutingModule,
  ],
  declarations: [
    AutodeclaracioncrsAdministrar,
    AutodeclaracioncrsAgregarForm,
    AutodeclaracioncrsEditarForm,
    AutodeclaracioncrsEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, AutodeclaracioncrsService],
})
export class AutodeclaracioncrsModule {}
