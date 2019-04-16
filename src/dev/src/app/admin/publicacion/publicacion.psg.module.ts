/* PSG  Publicacion Module */
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { HttpModule } from '@angular/http';

import { ROUTING } from './publicacion.psg.routing';
import { PublicacionService } from './publicacion.psg.service';
import { PublicacionDemo } from './publicacion.psg';
import { PublicacionAdministrarDemo } from './administrar/publicacion-administrar';
import { PublicacionAgregarDemo } from './agregar/publicacion-agregar';
import { PublicacionAgregarFormDemo } from './agregar/publicacion-agregar-form';
import { PublicacionEditarDemo } from './editar/publicacion-editar';
import { PublicacionEditarFormDemo } from './editar/publicacion-editar-form';
import { PublicacionEliminarFormDemo } from './eliminar/publicacion-eliminar-form';
import { PublicacionEliminarDemo } from './eliminar/publicacion-eliminar';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [
    PublicacionDemo,
    PublicacionAdministrarDemo,
    PublicacionAgregarDemo,
    PublicacionAgregarFormDemo,
    PublicacionEditarFormDemo,
    PublicacionEditarDemo,
    PublicacionEliminarFormDemo,
    PublicacionEliminarDemo,
  ],
  exports: [
    PublicacionDemo,
    PublicacionAdministrarDemo,
    PublicacionAgregarDemo,
    PublicacionAgregarFormDemo,
    PublicacionEditarFormDemo,
    PublicacionEditarDemo,
    PublicacionEliminarFormDemo,
    PublicacionEliminarDemo,
  ],
  providers: [ValidationService, PublicacionService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PublicacionDemoModule {}
