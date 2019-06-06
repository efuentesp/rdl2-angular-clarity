/* PSG  Aplicacionpagoscontrolados Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { AplicacionpagoscontroladosRoutingModule } from './aplicacionpagoscontrolados.psg.routing';
import { AplicacionpagoscontroladosService } from './aplicacionpagoscontrolados.psg.service';
import { AplicacionpagoscontroladosAdministrar } from './administrar/aplicacionpagoscontrolados-administrar';
import { AplicacionpagoscontroladosAgregarForm } from './agregar/aplicacionpagoscontrolados-agregar-form';
import { AplicacionpagoscontroladosEditarForm } from './editar/aplicacionpagoscontrolados-editar-form';
import { AplicacionpagoscontroladosEliminarForm } from './eliminar/aplicacionpagoscontrolados-eliminar-form';

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

    AplicacionpagoscontroladosRoutingModule,
  ],
  declarations: [
    AplicacionpagoscontroladosAdministrar,
    AplicacionpagoscontroladosAgregarForm,
    AplicacionpagoscontroladosEditarForm,
    AplicacionpagoscontroladosEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, SubfisoService, AplicacionpagoscontroladosService],
})
export class AplicacionpagoscontroladosModule {}
