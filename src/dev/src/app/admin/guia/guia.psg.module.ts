/* PSG  Guia Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { GuiaRoutingModule } from './guia.psg.routing';
import { GuiaService } from './guia.psg.service';
import { GuiaAdministrar } from './administrar/guia-administrar';
import { GuiaAgregarForm } from './agregar/guia-agregar-form';
import { GuiaEditarForm } from './editar/guia-editar-form';
import { GuiaEliminarForm } from './eliminar/guia-eliminar-form';

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

    GuiaRoutingModule,
  ],
  declarations: [GuiaAdministrar, GuiaAgregarForm, GuiaEditarForm, GuiaEliminarForm],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TransaccionService, GuiaService],
})
export class GuiaModule {}
