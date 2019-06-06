/* PSG  Subfiso Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { SubfisoRoutingModule } from './subfiso.psg.routing';
import { SubfisoService } from './subfiso.psg.service';
import { SubfisoAdministrar } from './administrar/subfiso-administrar';
import { SubfisoAgregarForm } from './agregar/subfiso-agregar-form';
import { SubfisoEditarForm } from './editar/subfiso-editar-form';
import { SubfisoEliminarForm } from './eliminar/subfiso-eliminar-form';

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

    SubfisoRoutingModule,
  ],
  declarations: [SubfisoAdministrar, SubfisoAgregarForm, SubfisoEditarForm, SubfisoEliminarForm],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, SubfisoService],
})
export class SubfisoModule {}
