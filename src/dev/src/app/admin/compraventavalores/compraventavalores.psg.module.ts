/* PSG  Compraventavalores Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { CompraventavaloresRoutingModule } from './compraventavalores.psg.routing';
import { CompraventavaloresService } from './compraventavalores.psg.service';
import { CompraventavaloresAdministrar } from './administrar/compraventavalores-administrar';
import { CompraventavaloresAgregarForm } from './agregar/compraventavalores-agregar-form';
import { CompraventavaloresEditarForm } from './editar/compraventavalores-editar-form';
import { CompraventavaloresEliminarForm } from './eliminar/compraventavalores-eliminar-form';

import { SubfisoService } from '../subfiso/subfiso.psg.service';
import { ContratoinversionService } from '../contratoinversion/contratoinversion.psg.service';
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

    CompraventavaloresRoutingModule,
  ],
  declarations: [
    CompraventavaloresAdministrar,
    CompraventavaloresAgregarForm,
    CompraventavaloresEditarForm,
    CompraventavaloresEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [SubfisoService, ContratoinversionService, FideicomisoService, CompraventavaloresService],
})
export class CompraventavaloresModule {}
