/* PSG  Kyc Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { KycRoutingModule } from './kyc.psg.routing';
import { KycService } from './kyc.psg.service';
import { KycAdministrar } from './administrar/kyc-administrar';
import { KycAgregarForm } from './agregar/kyc-agregar-form';
import { KycEditarForm } from './editar/kyc-editar-form';
import { KycEliminarForm } from './eliminar/kyc-eliminar-form';

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

    KycRoutingModule,
  ],
  declarations: [KycAdministrar, KycAgregarForm, KycEditarForm, KycEliminarForm],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, KycService],
})
export class KycModule {}
