/* PSG  Institucion Module */
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { HttpModule } from '@angular/http';

import { ROUTING } from './institucion.psg.routing';
import { InstitucionService } from './institucion.psg.service';
import { InstitucionDemo } from './institucion.psg';
import { InstitucionAdministrarDemo } from './administrar/institucion-administrar';
import { InstitucionAgregarDemo } from './agregar/institucion-agregar';
import { InstitucionAgregarFormDemo } from './agregar/institucion-agregar-form';
import { InstitucionEditarDemo } from './editar/institucion-editar';
import { InstitucionEditarFormDemo } from './editar/institucion-editar-form';
import { InstitucionEliminarFormDemo } from './eliminar/institucion-eliminar-form';
import { InstitucionEliminarDemo } from './eliminar/institucion-eliminar';

// import { EventoDetailsFormDemo } from './evento-details/administrar/evento-administrar';
// import { EventoDetailsAgregarFormDemo } from './evento-details/agregar/evento-agregar-form';
// import { EventoDetailsEditarFormDemo } from './evento-details/editar/evento-editar-form';
// import { EventoDetailsEliminarFormDemo } from './evento-details/eliminar/evento-eliminar-form';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [
    InstitucionDemo,
    InstitucionAdministrarDemo,
    InstitucionAgregarDemo,
    InstitucionAgregarFormDemo,
    InstitucionEditarFormDemo,
    InstitucionEditarDemo,
    InstitucionEliminarFormDemo,
    InstitucionEliminarDemo,
    // EventoDetailsFormDemo,
    // EventoDetailsAgregarFormDemo,
    // EventoDetailsEditarFormDemo,
    // EventoDetailsEliminarFormDemo,
  ],
  exports: [
    InstitucionDemo,
    InstitucionAdministrarDemo,
    InstitucionAgregarDemo,
    InstitucionAgregarFormDemo,
    InstitucionEditarFormDemo,
    InstitucionEditarDemo,
    InstitucionEliminarFormDemo,
    InstitucionEliminarDemo,
    // EventoDetailsFormDemo,
    // EventoDetailsAgregarFormDemo,
    // EventoDetailsEditarFormDemo,
    // EventoDetailsEliminarFormDemo,
  ],
  providers: [ValidationService, InstitucionService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InstitucionDemoModule {}
