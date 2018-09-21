import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClarityModule } from '@clr/angular';

import { BeneficiarioDemo } from './beneficiario.demo';
import { ROUTING } from './beneficiario.demo.routing';

import { BeneficiarioAdministrarDemo } from './administrar/beneficiario-administrar';

import { Inventory } from '../beneficiario/inventory/inventory';
import { BeneficiarioAgregarFormDemo } from './agregar/beneficiario-agregar-form';
import { BeneficiarioAgregarDemo } from './agregar/beneficiario-agregar';


@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING],
  declarations: [
    BeneficiarioDemo,
    BeneficiarioAdministrarDemo,
    BeneficiarioAgregarDemo,
    BeneficiarioAgregarFormDemo,
  ],
  exports: [
    BeneficiarioDemo,
    BeneficiarioAdministrarDemo,
    BeneficiarioAgregarDemo,
    BeneficiarioAgregarFormDemo,
  ],  
  providers:[
    Inventory
  ]
})
export class BeneficiarioDemoModule {}
