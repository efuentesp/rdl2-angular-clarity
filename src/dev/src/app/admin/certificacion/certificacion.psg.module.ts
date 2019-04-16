/* PSG  Certificacion Module */
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { HttpModule } from '@angular/http';

import { ROUTING } from './certificacion.psg.routing';
import { CertificacionService } from './certificacion.psg.service';
import { CertificacionDemo } from './certificacion.psg';
import { CertificacionAdministrarDemo } from './administrar/certificacion-administrar';
import { CertificacionAgregarDemo } from './agregar/certificacion-agregar';
import { CertificacionAgregarFormDemo } from './agregar/certificacion-agregar-form';
import { CertificacionEditarDemo } from './editar/certificacion-editar';
import { CertificacionEditarFormDemo } from './editar/certificacion-editar-form';
import { CertificacionEliminarFormDemo } from './eliminar/certificacion-eliminar-form';
import { CertificacionEliminarDemo } from './eliminar/certificacion-eliminar';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [
    CertificacionDemo,
    CertificacionAdministrarDemo,
    CertificacionAgregarDemo,
    CertificacionAgregarFormDemo,
    CertificacionEditarFormDemo,
    CertificacionEditarDemo,
    CertificacionEliminarFormDemo,
    CertificacionEliminarDemo,
  ],
  exports: [
    CertificacionDemo,
    CertificacionAdministrarDemo,
    CertificacionAgregarDemo,
    CertificacionAgregarFormDemo,
    CertificacionEditarFormDemo,
    CertificacionEditarDemo,
    CertificacionEliminarFormDemo,
    CertificacionEliminarDemo,
  ],
  providers: [ValidationService, CertificacionService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CertificacionDemoModule {}
