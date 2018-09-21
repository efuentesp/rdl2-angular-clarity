import { Component } from '@angular/core';
import { User } from './inventory/user';
import { Inventory } from './inventory/inventory';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';

@Component({ selector: 'clr-alert-demo', 
             styleUrls: ['./afiliado.demo.scss'], 
             templateUrl: './afiliado.demo.html' })

export class AfiliadoDemo {
    
    users: User[];

    constructor(inventory: Inventory) {
      inventory.size = 100;
      inventory.reset();
      this.users = inventory.all;
    }
    
}
