/* PSG  Profesor Module */
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { HttpModule } from '@angular/http';

import { ROUTING } from './profesor.psg.routing';
import { ProfesorService } from './profesor.psg.service';
import { ProfesorDemo } from './profesor.psg';
import { ProfesorAdministrarDemo } from './administrar/profesor-administrar';
import { ProfesorAgregarDemo } from './agregar/profesor-agregar';
import { ProfesorAgregarFormDemo } from './agregar/profesor-agregar-form';
import { ProfesorEditarDemo } from './editar/profesor-editar';
import { ProfesorEditarFormDemo } from './editar/profesor-editar-form';
import { ProfesorEliminarFormDemo } from './eliminar/profesor-eliminar-form';
import { ProfesorEliminarDemo } from './eliminar/profesor-eliminar';

// import { EventoDetailsFormDemo } from './evento-details/administrar/evento-administrar';
// import { EventoDetailsAgregarFormDemo } from './evento-details/agregar/evento-agregar-form';
// import { EventoDetailsEditarFormDemo } from './evento-details/editar/evento-editar-form';
// import { EventoDetailsEliminarFormDemo } from './evento-details/eliminar/evento-eliminar-form';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [
    ProfesorDemo,
    ProfesorAdministrarDemo,
    ProfesorAgregarDemo,
    ProfesorAgregarFormDemo,
    ProfesorEditarFormDemo,
    ProfesorEditarDemo,
    ProfesorEliminarFormDemo,
    ProfesorEliminarDemo,
    // EventoDetailsFormDemo,
    // EventoDetailsAgregarFormDemo,
    // EventoDetailsEditarFormDemo,
    // EventoDetailsEliminarFormDemo,
  ],
  exports: [
    ProfesorDemo,
    ProfesorAdministrarDemo,
    ProfesorAgregarDemo,
    ProfesorAgregarFormDemo,
    ProfesorEditarFormDemo,
    ProfesorEditarDemo,
    ProfesorEliminarFormDemo,
    ProfesorEliminarDemo,
    // EventoDetailsFormDemo,
    // EventoDetailsAgregarFormDemo,
    // EventoDetailsEditarFormDemo,
    // EventoDetailsEliminarFormDemo,
  ],
  providers: [ValidationService, ProfesorService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfesorDemoModule {}
