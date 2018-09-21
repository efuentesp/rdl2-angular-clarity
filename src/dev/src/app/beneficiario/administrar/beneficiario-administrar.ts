import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { User } from '../inventory/user';
import { Inventory } from '../inventory/inventory';

@Component({
  selector: 'clr-alert-demo-styles',
  styleUrls: ['../beneficiario.demo.scss'],
  templateUrl: './beneficiario-administrar.demo.html',
})
export class BeneficiarioAdministrarDemo {

  users: User[];

  constructor(inventory: Inventory) {
    inventory.size = 100;
    inventory.reset();
    this.users = inventory.all;
  }

}
