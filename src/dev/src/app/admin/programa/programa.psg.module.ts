/* PSG  Programa Module */
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { HttpModule } from '@angular/http';

import { ROUTING } from './programa.psg.routing';
import { ProgramaService } from './programa.psg.service';
import { ProgramaDemo } from './programa.psg';
import { ProgramaAdministrarDemo } from './administrar/programa-administrar';
import { ProgramaAgregarDemo } from './agregar/programa-agregar';
import { ProgramaAgregarFormDemo } from './agregar/programa-agregar-form';
import { ProgramaEditarDemo } from './editar/programa-editar';
import { ProgramaEditarFormDemo } from './editar/programa-editar-form';
import { ProgramaEliminarFormDemo } from './eliminar/programa-eliminar-form';
import { ProgramaEliminarDemo } from './eliminar/programa-eliminar';

import { EstudianteDetailsFormDemo } from './estudiante-details/administrar/estudiante-administrar';
import { EstudianteDetailsAgregarFormDemo } from './estudiante-details/agregar/estudiante-agregar-form';
import { EstudianteDetailsEditarFormDemo } from './estudiante-details/editar/estudiante-editar-form';
import { EstudianteDetailsEliminarFormDemo } from './estudiante-details/eliminar/estudiante-eliminar-form';
import { PublicacionDetailsFormDemo } from './publicacion-details/administrar/publicacion-administrar';
import { PublicacionDetailsAgregarFormDemo } from './publicacion-details/agregar/publicacion-agregar-form';
import { PublicacionDetailsEditarFormDemo } from './publicacion-details/editar/publicacion-editar-form';
import { PublicacionDetailsEliminarFormDemo } from './publicacion-details/eliminar/publicacion-eliminar-form';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [
    ProgramaDemo,
    ProgramaAdministrarDemo,
    ProgramaAgregarDemo,
    ProgramaAgregarFormDemo,
    ProgramaEditarFormDemo,
    ProgramaEditarDemo,
    ProgramaEliminarFormDemo,
    ProgramaEliminarDemo,
    EstudianteDetailsFormDemo,
    EstudianteDetailsAgregarFormDemo,
    EstudianteDetailsEditarFormDemo,
    EstudianteDetailsEliminarFormDemo,
    PublicacionDetailsFormDemo,
    PublicacionDetailsAgregarFormDemo,
    PublicacionDetailsEditarFormDemo,
    PublicacionDetailsEliminarFormDemo,
  ],
  exports: [
    ProgramaDemo,
    ProgramaAdministrarDemo,
    ProgramaAgregarDemo,
    ProgramaAgregarFormDemo,
    ProgramaEditarFormDemo,
    ProgramaEditarDemo,
    ProgramaEliminarFormDemo,
    ProgramaEliminarDemo,
    EstudianteDetailsFormDemo,
    EstudianteDetailsAgregarFormDemo,
    EstudianteDetailsEditarFormDemo,
    EstudianteDetailsEliminarFormDemo,
    PublicacionDetailsFormDemo,
    PublicacionDetailsAgregarFormDemo,
    PublicacionDetailsEditarFormDemo,
    PublicacionDetailsEliminarFormDemo,
  ],
  providers: [ValidationService, ProgramaService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProgramaDemoModule {}
