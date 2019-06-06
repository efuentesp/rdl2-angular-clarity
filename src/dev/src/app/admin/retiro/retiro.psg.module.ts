/* PSG  Retiro Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { RetiroRoutingModule } from './retiro.psg.routing';
import { RetiroService } from './retiro.psg.service';
import { RetiroAdministrar } from './administrar/retiro-administrar';
import { RetiroAgregarForm } from './agregar/retiro-agregar-form';
import { RetiroEditarForm } from './editar/retiro-editar-form';
import { RetiroEliminarForm } from './eliminar/retiro-eliminar-form';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,

    RetiroRoutingModule,
  ],
  declarations: [RetiroAdministrar, RetiroAgregarForm, RetiroEditarForm, RetiroEliminarForm],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [RetiroService],
})
export class RetiroModule {}
