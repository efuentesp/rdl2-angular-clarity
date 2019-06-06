/* PSG  Compradirecto Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { CompradirectoRoutingModule } from './compradirecto.psg.routing';
import { CompradirectoService } from './compradirecto.psg.service';
import { CompradirectoAdministrar } from './administrar/compradirecto-administrar';
import { CompradirectoAgregarForm } from './agregar/compradirecto-agregar-form';
import { CompradirectoEditarForm } from './editar/compradirecto-editar-form';
import { CompradirectoEliminarForm } from './eliminar/compradirecto-eliminar-form';

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

    CompradirectoRoutingModule,
  ],
  declarations: [
    CompradirectoAdministrar,
    CompradirectoAgregarForm,
    CompradirectoEditarForm,
    CompradirectoEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [InstruccionService, SubfisoService, FideicomisoService, ContratoinversionService, CompradirectoService],
})
export class CompradirectoModule {}
