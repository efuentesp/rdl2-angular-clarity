import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { User } from '../inventory/user';
import { Inventory } from '../inventory/inventory';

@Component({
  selector: 'clr-alert-demo-styles',
  styleUrls: ['../afiliado.demo.scss'],
  templateUrl: './afiliado-administrar.demo.html',
})
export class AfiliadoAdministrarDemo {

  users: User[];

  constructor(inventory: Inventory) {
    inventory.size = 100;
    inventory.reset();
    this.users = inventory.all;
  }

}
