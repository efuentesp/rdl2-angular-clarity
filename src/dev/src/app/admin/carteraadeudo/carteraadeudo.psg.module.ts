/* PSG  Carteraadeudo Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { CarteraadeudoRoutingModule } from './carteraadeudo.psg.routing';
import { CarteraadeudoService } from './carteraadeudo.psg.service';
import { CarteraadeudoAdministrar } from './administrar/carteraadeudo-administrar';
import { CarteraadeudoAgregarForm } from './agregar/carteraadeudo-agregar-form';
import { CarteraadeudoEditarForm } from './editar/carteraadeudo-editar-form';
import { CarteraadeudoEliminarForm } from './eliminar/carteraadeudo-eliminar-form';

import { HonorarioscontratoService } from '../honorarioscontrato/honorarioscontrato.psg.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,

    CarteraadeudoRoutingModule,
  ],
  declarations: [
    CarteraadeudoAdministrar,
    CarteraadeudoAgregarForm,
    CarteraadeudoEditarForm,
    CarteraadeudoEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HonorarioscontratoService, CarteraadeudoService],
})
export class CarteraadeudoModule {}
