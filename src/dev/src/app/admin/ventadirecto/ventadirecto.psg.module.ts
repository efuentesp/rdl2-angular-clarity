/* PSG  Ventadirecto Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { VentadirectoRoutingModule } from './ventadirecto.psg.routing';
import { VentadirectoService } from './ventadirecto.psg.service';
import { VentadirectoAdministrar } from './administrar/ventadirecto-administrar';
import { VentadirectoAgregarForm } from './agregar/ventadirecto-agregar-form';
import { VentadirectoEditarForm } from './editar/ventadirecto-editar-form';
import { VentadirectoEliminarForm } from './eliminar/ventadirecto-eliminar-form';

import { InstruccionService } from '../instruccion/instruccion.psg.service';
import { SubfisoService } from '../subfiso/subfiso.psg.service';
import { FideicomisoService } from '../fideicomiso/fideicomiso.psg.service';
import { ContratoinversionService } from '../contratoinversion/contratoinversion.psg.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,

    VentadirectoRoutingModule,
  ],
  declarations: [VentadirectoAdministrar, VentadirectoAgregarForm, VentadirectoEditarForm, VentadirectoEliminarForm],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [InstruccionService, SubfisoService, FideicomisoService, ContratoinversionService, VentadirectoService],
})
export class VentadirectoModule {}
