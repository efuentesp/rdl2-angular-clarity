/* PSG  Accionista Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { AccionistaRoutingModule } from './accionista.psg.routing';
import { AccionistaService } from './accionista.psg.service';
import { AccionistaAdministrar } from './administrar/accionista-administrar';
import { AccionistaAgregarForm } from './agregar/accionista-agregar-form';
import { AccionistaEditarForm } from './editar/accionista-editar-form';
import { AccionistaEliminarForm } from './eliminar/accionista-eliminar-form';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,

    AccionistaRoutingModule,
  ],
  declarations: [AccionistaAdministrar, AccionistaAgregarForm, AccionistaEditarForm, AccionistaEliminarForm],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AccionistaService],
})
export class AccionistaModule {}
