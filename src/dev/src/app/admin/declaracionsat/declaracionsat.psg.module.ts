/* PSG  Declaracionsat Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { DeclaracionsatRoutingModule } from './declaracionsat.psg.routing';
import { DeclaracionsatService } from './declaracionsat.psg.service';
import { DeclaracionsatAdministrar } from './administrar/declaracionsat-administrar';
import { DeclaracionsatAgregarForm } from './agregar/declaracionsat-agregar-form';
import { DeclaracionsatEditarForm } from './editar/declaracionsat-editar-form';
import { DeclaracionsatEliminarForm } from './eliminar/declaracionsat-eliminar-form';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,

    DeclaracionsatRoutingModule,
  ],
  declarations: [
    DeclaracionsatAdministrar,
    DeclaracionsatAgregarForm,
    DeclaracionsatEditarForm,
    DeclaracionsatEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DeclaracionsatService],
})
export class DeclaracionsatModule {}
