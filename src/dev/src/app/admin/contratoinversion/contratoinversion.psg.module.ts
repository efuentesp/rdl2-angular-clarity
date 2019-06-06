/* PSG  Contratoinversion Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { ContratoinversionRoutingModule } from './contratoinversion.psg.routing';
import { ContratoinversionService } from './contratoinversion.psg.service';
import { ContratoinversionAdministrar } from './administrar/contratoinversion-administrar';
import { ContratoinversionAgregarForm } from './agregar/contratoinversion-agregar-form';
import { ContratoinversionEditarForm } from './editar/contratoinversion-editar-form';
import { ContratoinversionEliminarForm } from './eliminar/contratoinversion-eliminar-form';

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

    ContratoinversionRoutingModule,
  ],
  declarations: [
    ContratoinversionAdministrar,
    ContratoinversionAgregarForm,
    ContratoinversionEditarForm,
    ContratoinversionEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, SubfisoService, ContratoinversionService],
})
export class ContratoinversionModule {}
