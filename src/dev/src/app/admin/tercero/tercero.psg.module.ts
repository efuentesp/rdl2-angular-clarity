/* PSG  Tercero Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { TerceroRoutingModule } from './tercero.psg.routing';
import { TerceroService } from './tercero.psg.service';
import { TerceroAdministrar } from './administrar/tercero-administrar';
import { TerceroAgregarForm } from './agregar/tercero-agregar-form';
import { TerceroEditarForm } from './editar/tercero-editar-form';
import { TerceroEliminarForm } from './eliminar/tercero-eliminar-form';

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

    TerceroRoutingModule,
  ],
  declarations: [TerceroAdministrar, TerceroAgregarForm, TerceroEditarForm, TerceroEliminarForm],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, TerceroService],
})
export class TerceroModule {}
