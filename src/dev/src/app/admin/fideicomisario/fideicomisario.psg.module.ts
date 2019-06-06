/* PSG  Fideicomisario Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { FideicomisarioRoutingModule } from './fideicomisario.psg.routing';
import { FideicomisarioService } from './fideicomisario.psg.service';
import { FideicomisarioAdministrar } from './administrar/fideicomisario-administrar';
import { FideicomisarioAgregarForm } from './agregar/fideicomisario-agregar-form';
import { FideicomisarioEditarForm } from './editar/fideicomisario-editar-form';
import { FideicomisarioEliminarForm } from './eliminar/fideicomisario-eliminar-form';

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

    FideicomisarioRoutingModule,
  ],
  declarations: [
    FideicomisarioAdministrar,
    FideicomisarioAgregarForm,
    FideicomisarioEditarForm,
    FideicomisarioEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, FideicomisarioService],
})
export class FideicomisarioModule {}
