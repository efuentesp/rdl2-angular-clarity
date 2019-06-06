/* PSG  Formasliquidacion Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { FormasliquidacionRoutingModule } from './formasliquidacion.psg.routing';
import { FormasliquidacionService } from './formasliquidacion.psg.service';
import { FormasliquidacionAdministrar } from './administrar/formasliquidacion-administrar';
import { FormasliquidacionAgregarForm } from './agregar/formasliquidacion-agregar-form';
import { FormasliquidacionEditarForm } from './editar/formasliquidacion-editar-form';
import { FormasliquidacionEliminarForm } from './eliminar/formasliquidacion-eliminar-form';

import { FideicomisoService } from '../fideicomiso/fideicomiso.psg.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,

    FormasliquidacionRoutingModule,
  ],
  declarations: [
    FormasliquidacionAdministrar,
    FormasliquidacionAgregarForm,
    FormasliquidacionEditarForm,
    FormasliquidacionEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, FormasliquidacionService],
})
export class FormasliquidacionModule {}
