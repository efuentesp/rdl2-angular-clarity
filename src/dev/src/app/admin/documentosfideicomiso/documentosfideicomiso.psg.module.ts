/* PSG  Documentosfideicomiso Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { DocumentosfideicomisoRoutingModule } from './documentosfideicomiso.psg.routing';
import { DocumentosfideicomisoService } from './documentosfideicomiso.psg.service';
import { DocumentosfideicomisoAdministrar } from './administrar/documentosfideicomiso-administrar';
import { DocumentosfideicomisoAgregarForm } from './agregar/documentosfideicomiso-agregar-form';
import { DocumentosfideicomisoEditarForm } from './editar/documentosfideicomiso-editar-form';
import { DocumentosfideicomisoEliminarForm } from './eliminar/documentosfideicomiso-eliminar-form';

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

    DocumentosfideicomisoRoutingModule,
  ],
  declarations: [
    DocumentosfideicomisoAdministrar,
    DocumentosfideicomisoAgregarForm,
    DocumentosfideicomisoEditarForm,
    DocumentosfideicomisoEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, DocumentosfideicomisoService],
})
export class DocumentosfideicomisoModule {}
