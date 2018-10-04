import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BeneficiarioDemo } from './beneficiario.demo';
import { ROUTING } from './beneficiario.demo.routing';
import { Inventory } from './inventory/inventory';
import { BeneficiarioAdministrarDemo } from './administrar/beneficiario-administrar';
import { BeneficiarioAgregarDemo } from './agregar/beneficiario-agregar';
import { BeneficiarioAgregarFormDemo } from './agregar/beneficiario-agregar-form';
import { BeneficiarioEditarFormDemo } from './editar/beneficiario-editar-form';
import { BeneficiarioEliminarFormDemo } from './eliminar/beneficiario-eliminar-form';
import { BeneficiarioEditarDemo } from './editar/beneficiario-editar';
import { BeneficiarioEliminarDemo } from './eliminar/beneficiario-eliminar';
import { ValidationService } from '../../_validation/validation.service';
import { BeneficiarioService } from './beneficiario.demo.service';
import { HttpModule } from '@angular/http';
import { AfiliadoService } from '../afiliado/afiliado.demo.service';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING, HttpModule, ReactiveFormsModule, FormsModule],
  declarations: [
    BeneficiarioDemo,
    BeneficiarioAdministrarDemo,
    BeneficiarioAgregarDemo,
    BeneficiarioAgregarFormDemo,
    BeneficiarioEditarFormDemo,
    BeneficiarioEliminarFormDemo,
    BeneficiarioEditarDemo,
    BeneficiarioEliminarDemo,
  ],
  exports: [
    BeneficiarioDemo,
    BeneficiarioAdministrarDemo,
    BeneficiarioAgregarDemo,
    BeneficiarioAgregarFormDemo,
    BeneficiarioEditarFormDemo,
    BeneficiarioEliminarFormDemo,
    BeneficiarioEditarDemo,
    BeneficiarioEliminarDemo,
  ],
  providers: [Inventory, ValidationService, BeneficiarioService, AfiliadoService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BeneficiarioDemoModule {}
