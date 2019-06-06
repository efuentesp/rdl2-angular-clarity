/* PSG  Aportacioninmueble Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { AportacioninmuebleRoutingModule } from './aportacioninmueble.psg.routing';
import { AportacioninmuebleService } from './aportacioninmueble.psg.service';
import { AportacioninmuebleAdministrar } from './administrar/aportacioninmueble-administrar';
import { AportacioninmuebleAgregarForm } from './agregar/aportacioninmueble-agregar-form';
import { AportacioninmuebleEditarForm } from './editar/aportacioninmueble-editar-form';
import { AportacioninmuebleEliminarForm } from './eliminar/aportacioninmueble-eliminar-form';

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

    AportacioninmuebleRoutingModule,
  ],
  declarations: [
    AportacioninmuebleAdministrar,
    AportacioninmuebleAgregarForm,
    AportacioninmuebleEditarForm,
    AportacioninmuebleEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, SubfisoService, AportacioninmuebleService],
})
export class AportacioninmuebleModule {}
