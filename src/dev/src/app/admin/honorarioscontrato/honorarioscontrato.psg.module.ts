/* PSG  Honorarioscontrato Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { HonorarioscontratoRoutingModule } from './honorarioscontrato.psg.routing';
import { HonorarioscontratoService } from './honorarioscontrato.psg.service';
import { HonorarioscontratoAdministrar } from './administrar/honorarioscontrato-administrar';
import { HonorarioscontratoAgregarForm } from './agregar/honorarioscontrato-agregar-form';
import { HonorarioscontratoEditarForm } from './editar/honorarioscontrato-editar-form';
import { HonorarioscontratoEliminarForm } from './eliminar/honorarioscontrato-eliminar-form';

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

    HonorarioscontratoRoutingModule,
  ],
  declarations: [
    HonorarioscontratoAdministrar,
    HonorarioscontratoAgregarForm,
    HonorarioscontratoEditarForm,
    HonorarioscontratoEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, SubfisoService, HonorarioscontratoService],
})
export class HonorarioscontratoModule {}
