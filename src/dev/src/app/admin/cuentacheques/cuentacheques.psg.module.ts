/* PSG  Cuentacheques Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { CuentachequesRoutingModule } from './cuentacheques.psg.routing';
import { CuentachequesService } from './cuentacheques.psg.service';
import { CuentachequesAdministrar } from './administrar/cuentacheques-administrar';
import { CuentachequesAgregarForm } from './agregar/cuentacheques-agregar-form';
import { CuentachequesEditarForm } from './editar/cuentacheques-editar-form';
import { CuentachequesEliminarForm } from './eliminar/cuentacheques-eliminar-form';

import { FideicomisoService } from '../fideicomiso/fideicomiso.psg.service';
import { FideicomitenteService } from '../fideicomitente/fideicomitente.psg.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,

    CuentachequesRoutingModule,
  ],
  declarations: [
    CuentachequesAdministrar,
    CuentachequesAgregarForm,
    CuentachequesEditarForm,
    CuentachequesEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, FideicomitenteService, CuentachequesService],
})
export class CuentachequesModule {}
