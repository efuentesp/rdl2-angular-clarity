/* PSG  Transaccion Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { TransaccionRoutingModule } from './transaccion.psg.routing';
import { TransaccionService } from './transaccion.psg.service';
import { TransaccionAdministrar } from './administrar/transaccion-administrar';
import { TransaccionAgregarForm } from './agregar/transaccion-agregar-form';
import { TransaccionEditarForm } from './editar/transaccion-editar-form';
import { TransaccionEliminarForm } from './eliminar/transaccion-eliminar-form';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,

    TransaccionRoutingModule,
  ],
  declarations: [TransaccionAdministrar, TransaccionAgregarForm, TransaccionEditarForm, TransaccionEliminarForm],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TransaccionService],
})
export class TransaccionModule {}
