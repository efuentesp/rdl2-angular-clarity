/* PSG  Movimiento Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { MovimientoRoutingModule } from './movimiento.psg.routing';
import { MovimientoService } from './movimiento.psg.service';
import { MovimientoAdministrar } from './administrar/movimiento-administrar';
import { MovimientoAgregarForm } from './agregar/movimiento-agregar-form';
import { MovimientoEditarForm } from './editar/movimiento-editar-form';
import { MovimientoEliminarForm } from './eliminar/movimiento-eliminar-form';

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

    MovimientoRoutingModule,
  ],
  declarations: [MovimientoAdministrar, MovimientoAgregarForm, MovimientoEditarForm, MovimientoEliminarForm],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, SubfisoService, MovimientoService],
})
export class MovimientoModule {}
