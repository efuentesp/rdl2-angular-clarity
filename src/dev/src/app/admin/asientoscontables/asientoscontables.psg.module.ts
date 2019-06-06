/* PSG  Asientoscontables Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { AsientoscontablesRoutingModule } from './asientoscontables.psg.routing';
import { AsientoscontablesService } from './asientoscontables.psg.service';
import { AsientoscontablesAdministrar } from './administrar/asientoscontables-administrar';
import { AsientoscontablesAgregarForm } from './agregar/asientoscontables-agregar-form';
import { AsientoscontablesEditarForm } from './editar/asientoscontables-editar-form';
import { AsientoscontablesEliminarForm } from './eliminar/asientoscontables-eliminar-form';

import { TransaccionService } from '../transaccion/transaccion.psg.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,

    AsientoscontablesRoutingModule,
  ],
  declarations: [
    AsientoscontablesAdministrar,
    AsientoscontablesAgregarForm,
    AsientoscontablesEditarForm,
    AsientoscontablesEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TransaccionService, AsientoscontablesService],
})
export class AsientoscontablesModule {}
