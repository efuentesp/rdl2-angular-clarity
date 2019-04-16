/* PSG  Estudiante Module */
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { HttpModule } from '@angular/http';

import { ROUTING } from './estudiante.psg.routing';
import { EstudianteService } from './estudiante.psg.service';
import { EstudianteDemo } from './estudiante.psg';
import { EstudianteAdministrarDemo } from './administrar/estudiante-administrar';
import { EstudianteAgregarDemo } from './agregar/estudiante-agregar';
import { EstudianteAgregarFormDemo } from './agregar/estudiante-agregar-form';
import { EstudianteEditarDemo } from './editar/estudiante-editar';
import { EstudianteEditarFormDemo } from './editar/estudiante-editar-form';
import { EstudianteEliminarFormDemo } from './eliminar/estudiante-eliminar-form';
import { EstudianteEliminarDemo } from './eliminar/estudiante-eliminar';

import { RegistroDetailsFormDemo } from './registro-details/administrar/registro-administrar';
import { RegistroDetailsAgregarFormDemo } from './registro-details/agregar/registro-agregar-form';
import { RegistroDetailsEditarFormDemo } from './registro-details/editar/registro-editar-form';
import { RegistroDetailsEliminarFormDemo } from './registro-details/eliminar/registro-eliminar-form';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [
    EstudianteDemo,
    EstudianteAdministrarDemo,
    EstudianteAgregarDemo,
    EstudianteAgregarFormDemo,
    EstudianteEditarFormDemo,
    EstudianteEditarDemo,
    EstudianteEliminarFormDemo,
    EstudianteEliminarDemo,
    RegistroDetailsFormDemo,
    RegistroDetailsAgregarFormDemo,
    RegistroDetailsEditarFormDemo,
    RegistroDetailsEliminarFormDemo,
  ],
  exports: [
    EstudianteDemo,
    EstudianteAdministrarDemo,
    EstudianteAgregarDemo,
    EstudianteAgregarFormDemo,
    EstudianteEditarFormDemo,
    EstudianteEditarDemo,
    EstudianteEliminarFormDemo,
    EstudianteEliminarDemo,
    RegistroDetailsFormDemo,
    RegistroDetailsAgregarFormDemo,
    RegistroDetailsEditarFormDemo,
    RegistroDetailsEliminarFormDemo,
  ],
  providers: [ValidationService, EstudianteService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EstudianteDemoModule {}
