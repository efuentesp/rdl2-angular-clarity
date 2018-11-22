/* PSG  Afiliado Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { User } from '../../../_models';

import { DireccionService } from '../../direccion/direccion.psg.service';
import { Direccion } from '../../direccion/direccion.psg.model';
import { TipopensionService } from '../../tipopension/tipopension.psg.service';
import { Tipopension } from '../../tipopension/tipopension.psg.model';
import { SolicitudpensionService } from '../../solicitudpension/solicitudpension.psg.service';
import { Solicitudpension } from '../../solicitudpension/solicitudpension.psg.model';
import { BeneficiarioService } from '../../beneficiario/beneficiario.psg.service';
import { Beneficiario } from '../../beneficiario/beneficiario.psg.model';
import { AfiliadoService } from '../../afiliado/afiliado.psg.service';
import { AdminPermission } from '../administracion.psg.model';
import { PermissionSend } from '../administracion.psg.model-send';
import { PermissionService } from '../../permission/permission.psg.service';

@Component({
  selector: 'clr-administracion-demo-styles',
  styleUrls: ['../administracion.psg.scss'],
  templateUrl: './administracion.psg.html',
})
export class AdministracionAdministrarDemo {
  // Permisos
  token: string;
  user: User;
  adminPermisoList: AdminPermission[];
  permission: PermissionSend;

  constructor(private router: Router, private route: ActivatedRoute, private permissionService: PermissionService) {}

  ngOnInit() {
    this.loadAdminPermiso();
  }

  loadAdminPermiso() {
    this.permissionService.getAllPrivilege().subscribe(
      data => {
        if (data) {
          this.adminPermisoList = data;
          console.log('Los permisos: ', this.adminPermisoList);
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the beneficiarios.', 'error');
      }
    );
  }

  saveData(permiso, rol) {
    this.permission = new PermissionSend();
    this.permission.permissionId = permiso.permission.id;
    this.permission.roleId = rol.id;

    if (rol.assigned) {
      this.permissionService.removePermission(this.permission).subscribe(
        data => {
          console.log('Resultado:', data);
        },
        error => {
          swal('Error...', 'An error occurred while calling the beneficiarios.', 'error');
        }
      );
    } else {
      this.permissionService.assignPermission(this.permission).subscribe(
        data => {
          console.log('Resultado:', data);
        },
        error => {
          swal('Error...', 'An error occurred while calling the beneficiarios.', 'error');
        }
      );
    }
  }
}
