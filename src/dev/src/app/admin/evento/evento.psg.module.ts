/* PSG  Evento Module */
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { HttpModule } from '@angular/http';

import { ROUTING } from './evento.psg.routing';
import { EventoService } from './evento.psg.service';
import { EventoDemo } from './evento.psg';
import { EventoAdministrarDemo } from './administrar/evento-administrar';
import { EventoAgregarDemo } from './agregar/evento-agregar';
import { EventoAgregarFormDemo } from './agregar/evento-agregar-form';
import { EventoEditarDemo } from './editar/evento-editar';
import { EventoEditarFormDemo } from './editar/evento-editar-form';
import { EventoEliminarFormDemo } from './eliminar/evento-eliminar-form';
import { EventoEliminarDemo } from './eliminar/evento-eliminar';

import { RegistroDetailsFormDemo } from './registro-details/administrar/registro-administrar';
import { RegistroDetailsAgregarFormDemo } from './registro-details/agregar/registro-agregar-form';
import { RegistroDetailsEditarFormDemo } from './registro-details/editar/registro-editar-form';
import { RegistroDetailsEliminarFormDemo } from './registro-details/eliminar/registro-eliminar-form';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [
    EventoDemo,
    EventoAdministrarDemo,
    EventoAgregarDemo,
    EventoAgregarFormDemo,
    EventoEditarFormDemo,
    EventoEditarDemo,
    EventoEliminarFormDemo,
    EventoEliminarDemo,
    RegistroDetailsFormDemo,
    RegistroDetailsAgregarFormDemo,
    RegistroDetailsEditarFormDemo,
    RegistroDetailsEliminarFormDemo,
  ],
  exports: [
    EventoDemo,
    EventoAdministrarDemo,
    EventoAgregarDemo,
    EventoAgregarFormDemo,
    EventoEditarFormDemo,
    EventoEditarDemo,
    EventoEliminarFormDemo,
    EventoEliminarDemo,
    RegistroDetailsFormDemo,
    RegistroDetailsAgregarFormDemo,
    RegistroDetailsEditarFormDemo,
    RegistroDetailsEliminarFormDemo,
  ],
  providers: [ValidationService, EventoService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EventoDemoModule {}
