/* PSG  Pagos Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { PagosRoutingModule } from './pagos.psg.routing';
import { PagosService } from './pagos.psg.service';
import { PagosAdministrar } from './administrar/pagos-administrar';
import { PagosAgregarForm } from './agregar/pagos-agregar-form';
import { PagosEditarForm } from './editar/pagos-editar-form';
import { PagosEliminarForm } from './eliminar/pagos-eliminar-form';

import { InstruccionService } from '../instruccion/instruccion.psg.service';
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

    PagosRoutingModule,
  ],
  declarations: [PagosAdministrar, PagosAgregarForm, PagosEditarForm, PagosEliminarForm],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [InstruccionService, FideicomisoService, SubfisoService, PagosService],
})
export class PagosModule {}
