/* PSG  Rol Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { DireccionService } from '../../direccion/direccion.psg.service';
import { Direccion } from '../../direccion/direccion.psg.model';
import { TipopensionService } from '../../tipopension/tipopension.psg.service';
import { Tipopension } from '../../tipopension/tipopension.psg.model';
import { SolicitudpensionService } from '../../solicitudpension/solicitudpension.psg.service';
import { Solicitudpension } from '../../solicitudpension/solicitudpension.psg.model';
import { BeneficiarioService } from '../../beneficiario/beneficiario.psg.service';
import { Beneficiario } from '../../beneficiario/beneficiario.psg.model';
import { RolService } from '../rol.psg.service';
import { Rol } from '../rol.psg.model';

@Component({
  selector: 'clr-rol-demo-styles',
  styleUrls: ['../rol.psg.scss'],
  templateUrl: './rol-administrar.psg.html',
})
export class RolAdministrarDemo {
  public direccioncorreo: Direccion;
  public domicilio: Direccion;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];
  public rolArray: Rol[];

  private roles_update: boolean = false;
  private roles_delete: boolean = false;
  private roles_create: boolean = false;
  private roles_read: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private rolService: RolService) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaRoles();
  }

  cargaRoles() {
    this.rolService.getRecuperaRol().subscribe(
      res => {
        if (res) {
          console.log('Roles:', res);
          this.rolArray = res;
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling the direccions.', 'error');
      }
    );
  }

  setClickedRowEditaRol(index, rol) {
    this.rolService.setRol(rol);
    this.router.navigate(['../editar', rol.id], { relativeTo: this.route });
  }

  setClickedRowEliminaRol(index, rol) {
    this.rolService.setRol(rol);
    this.router.navigate(['../eliminar', rol.id], { relativeTo: this.route });
  }

  getRol() {
    this.router.navigate(['../agregar'], { relativeTo: this.route });
  }

  getUser() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['access_token'];
    this.permissions = obj['permissions'];
    this.user = obj['user'];
  }

  setButtons() {
    this.permissions.forEach(element => {
      if (element.code == '*:*') {
        this.roles_update = true;
        this.roles_delete = true;
        this.roles_create = true;
        this.roles_read = true;
      }

      if (element.code == 'ROLES:UPDATE') {
        this.roles_update = true;
      }

      if (element.code == 'ROLES:DELETE') {
        this.roles_delete = true;
      }

      if (element.code == 'ROLES:READ') {
        this.roles_read = true;
      }

      if (element.code == 'ROLES:CREATE') {
        this.roles_create = true;
      }

      if (element.code == 'ROLES:*') {
        this.roles_update = true;
        this.roles_delete = true;
        this.roles_create = true;
        this.roles_read = true;
      }
    });
  }
}
