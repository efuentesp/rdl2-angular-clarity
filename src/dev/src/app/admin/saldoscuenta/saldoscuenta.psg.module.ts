/* PSG  Saldoscuenta Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { SaldoscuentaRoutingModule } from './saldoscuenta.psg.routing';
import { SaldoscuentaService } from './saldoscuenta.psg.service';
import { SaldoscuentaAdministrar } from './administrar/saldoscuenta-administrar';
import { SaldoscuentaAgregarForm } from './agregar/saldoscuenta-agregar-form';
import { SaldoscuentaEditarForm } from './editar/saldoscuenta-editar-form';
import { SaldoscuentaEliminarForm } from './eliminar/saldoscuenta-eliminar-form';

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

    SaldoscuentaRoutingModule,
  ],
  declarations: [SaldoscuentaAdministrar, SaldoscuentaAgregarForm, SaldoscuentaEditarForm, SaldoscuentaEliminarForm],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, SubfisoService, SaldoscuentaService],
})
export class SaldoscuentaModule {}
