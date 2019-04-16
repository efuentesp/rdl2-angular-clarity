/* PSG  Registro Module */
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { HttpModule } from '@angular/http';

import { ROUTING } from './registro.psg.routing';
import { RegistroService } from './registro.psg.service';
import { RegistroDemo } from './registro.psg';
import { RegistroAdministrarDemo } from './administrar/registro-administrar';
import { RegistroAgregarDemo } from './agregar/registro-agregar';
import { RegistroAgregarFormDemo } from './agregar/registro-agregar-form';
import { RegistroEditarDemo } from './editar/registro-editar';
import { RegistroEditarFormDemo } from './editar/registro-editar-form';
import { RegistroEliminarFormDemo } from './eliminar/registro-eliminar-form';
import { RegistroEliminarDemo } from './eliminar/registro-eliminar';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [
    RegistroDemo,
    RegistroAdministrarDemo,
    RegistroAgregarDemo,
    RegistroAgregarFormDemo,
    RegistroEditarFormDemo,
    RegistroEditarDemo,
    RegistroEliminarFormDemo,
    RegistroEliminarDemo,
  ],
  exports: [
    RegistroDemo,
    RegistroAdministrarDemo,
    RegistroAgregarDemo,
    RegistroAgregarFormDemo,
    RegistroEditarFormDemo,
    RegistroEditarDemo,
    RegistroEliminarFormDemo,
    RegistroEliminarDemo,
  ],
  providers: [ValidationService, RegistroService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegistroDemoModule {}
