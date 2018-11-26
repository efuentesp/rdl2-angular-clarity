/* PSG  Afiliado Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { PermissionService } from '../permission.psg.service';

@Component({
  selector: 'clr-permission-demo-styles',
  templateUrl: './permission-administrar.psg.html',
})
export class PermissionAdministrarDemo {
  // Permisos
  token: string;
  user: User;
  permissionArray: Permission[];

  constructor(private router: Router, private route: ActivatedRoute, private permissionService: PermissionService) {}

  ngOnInit() {
    this.setButtons();
    this.cargaPermission();
  }

  cargaPermission() {
    this.permissionService.getAllPermission().subscribe(
      res => {
        if (res) {
          this.permissionArray = res;
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the afiliado.', 'error');
      }
    );
  }

  setButtons() {}
}
