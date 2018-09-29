import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SolicitudpensionDemo } from './solicitudpension.demo';
import { ROUTING } from './solicitudpension.demo.routing';
import { Inventory } from './inventory/inventory';
import { SolicitudpensionAdministrarDemo } from './administrar/solicitudpension-administrar';
import { SolicitudpensionAgregarDemo } from './agregar/solicitudpension-agregar';
import { SolicitudpensionAgregarFormDemo } from './agregar/solicitudpension-agregar-form';
import { SolicitudpensionEditarFormDemo } from './editar/solicitudpension-editar-form';
import { SolicitudpensionEliminarFormDemo } from './eliminar/solicitudpension-eliminar-form';
import { SolicitudpensionEditarDemo } from './editar/solicitudpension-editar';
import { SolicitudpensionEliminarDemo } from './eliminar/solicitudpension-eliminar';
import { ValidationService } from '../_validation/validation.service';
import { SolicitudpensionService } from './solicitudpension.demo.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [
    SolicitudpensionDemo,
    SolicitudpensionAdministrarDemo,
    SolicitudpensionAgregarDemo,
    SolicitudpensionAgregarFormDemo,
    SolicitudpensionEditarFormDemo,
    SolicitudpensionEliminarFormDemo,
    SolicitudpensionEditarDemo,
    SolicitudpensionEliminarDemo,
  ],
  exports: [
    SolicitudpensionDemo,
    SolicitudpensionAdministrarDemo,
    SolicitudpensionAgregarDemo,
    SolicitudpensionAgregarFormDemo,
    SolicitudpensionEditarFormDemo,
    SolicitudpensionEliminarFormDemo,
    SolicitudpensionEditarDemo,
    SolicitudpensionEliminarDemo,
  ],
  providers: [Inventory, ValidationService, SolicitudpensionService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SolicitudpensionDemoModule {}
