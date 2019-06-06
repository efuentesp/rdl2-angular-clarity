/* PSG  Comitetecnico Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Comitetecnico } from '../comitetecnico.psg.model';
import { ComitetecnicoService } from '../comitetecnico.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-comitetecnico',
  styleUrls: ['../comitetecnico.psg.scss'],
  templateUrl: './comitetecnico-administrar.psg.html',
})
export class ComitetecnicoAdministrar {
  comitetecnicoArray: Comitetecnico[];
  comitetecnico: Comitetecnico;
  idComitetecnico: number;
  loading = false;

  public fideicomiso: Fideicomiso;

  // Detalles
  idFideicomiso: number;

  // Modal
  modalfideicomiso: boolean = false;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  comitetecnico_update: boolean = false;
  comitetecnico_delete: boolean = false;
  comitetecnico_create: boolean = false;
  comitetecnico_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private comitetecnicoService: ComitetecnicoService
  ) {}

  ngOnInit() {
    console.log('Comitetecnico administrar()');

    this.getUser();
    this.setButtons();
    this.cargaComitetecnico();

    this.route.params.subscribe(params => {
      this.idComitetecnico = params['id'];
    });

    if (this.idComitetecnico !== undefined) {
      this.getRecuperaComitetecnicoPorFideicomiso(this.idComitetecnico);
    }
  }

  cargaComitetecnico() {
    this.comitetecnicoService.getRecuperaComitetecnico().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.comitetecnicoArray = res.json();
            this.llenaCampos(this.comitetecnicoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Comité Técnico.', 'error');
      }
    );
  }

  getRecuperaComitetecnicoPorFideicomiso(id) {
    this.comitetecnicoService.getRecuperaComitetecnicoPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.comitetecnicoArray = res.json();
            this.llenaCampos(this.comitetecnicoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the comitetecnico.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
      element.fechaconstitucionAux = new Date(element.fechaconstitucion);
      if (element.estatus == 'ACTIVO') {
        element.estatusItem = 'ACTIVO';
      }
      if (element.estatus == 'CANCELADO') {
        element.estatusItem = 'CANCELADO';
      }
      if (element.estatus == 'SUSPENDIDO') {
        element.estatusItem = 'SUSPENDIDO';
      }
      if (element.estatus == 'BAJA') {
        element.estatusItem = 'BAJA';
      }
      if (element.nacionalidadpresidentepropietario == 'MEXICANO') {
        element.nacionalidadpresidentepropietarioItem = 'MEXICANO';
      }
      if (element.nacionalidadpresidentepropietario == 'NORTAM') {
        element.nacionalidadpresidentepropietarioItem = 'ESTADOUNIDENSE';
      }
      if (element.peppresidentepropietario == 'NO') {
        element.peppresidentepropietarioItem = 'NO';
      }
      if (element.peppresidentepropietario == 'SI') {
        element.peppresidentepropietarioItem = 'SI';
      }
      if (element.nacionalidadpresidentesuplente == 'MEXICANO') {
        element.nacionalidadpresidentesuplenteItem = 'MEXICANO';
      }
      if (element.nacionalidadpresidentesuplente == 'NORTAM') {
        element.nacionalidadpresidentesuplenteItem = 'ESTADOUNIDENSE';
      }
      if (element.peppresidentesuplente == 'NO') {
        element.peppresidentesuplenteItem = 'NO';
      }
      if (element.peppresidentesuplente == 'SI') {
        element.peppresidentesuplenteItem = 'SI';
      }
      if (element.nacionalidadsecretariopropietario == 'MEXICANO') {
        element.nacionalidadsecretariopropietarioItem = 'MEXICANO';
      }
      if (element.nacionalidadsecretariopropietario == 'NORTAM') {
        element.nacionalidadsecretariopropietarioItem = 'ESTADOUNIDENSE';
      }
      if (element.pepsecretariopropietario == 'NO') {
        element.pepsecretariopropietarioItem = 'NO';
      }
      if (element.pepsecretariopropietario == 'SI') {
        element.pepsecretariopropietarioItem = 'SI';
      }
      if (element.nacionalidadsecretariosuplente == 'MEXICANO') {
        element.nacionalidadsecretariosuplenteItem = 'MEXICANO';
      }
      if (element.nacionalidadsecretariosuplente == 'NORTAM') {
        element.nacionalidadsecretariosuplenteItem = 'ESTADOUNIDENSE';
      }
      if (element.pepsecretariosuplente == 'NO') {
        element.pepsecretariosuplenteItem = 'NO';
      }
      if (element.pepsecretariosuplente == 'SI') {
        element.pepsecretariosuplenteItem = 'SI';
      }
      if (element.nacionalidadvocalpropietario == 'MEXICANO') {
        element.nacionalidadvocalpropietarioItem = 'MEXICANO';
      }
      if (element.nacionalidadvocalpropietario == 'NORTAM') {
        element.nacionalidadvocalpropietarioItem = 'ESTADOUNIDENSE';
      }
      if (element.pepvocalpropietario == 'NO') {
        element.pepvocalpropietarioItem = 'NO';
      }
      if (element.pepvocalpropietario == 'SI') {
        element.pepvocalpropietarioItem = 'SI';
      }
      if (element.nacionalidadvocalsuplente == 'MEXICANO') {
        element.nacionalidadvocalsuplenteItem = 'MEXICANO';
      }
      if (element.nacionalidadvocalsuplente == 'NORTAM') {
        element.nacionalidadvocalsuplenteItem = 'ESTADOUNIDENSE';
      }
      if (element.pepvocalsuplente == 'NO') {
        element.pepvocalsuplenteItem = 'NO';
      }
      if (element.pepvocalsuplente == 'SI') {
        element.pepvocalsuplenteItem = 'SI';
      }
    });
  }

  setClickedRowEditaComitetecnico(index, comitetecnico) {
    this.comitetecnicoService.setComitetecnico(comitetecnico);
    if (this.idComitetecnico === undefined) {
      this.router.navigate(['editar', comitetecnico.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', comitetecnico.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaComitetecnico(index, comitetecnico) {
    this.comitetecnicoService.setComitetecnico(comitetecnico);
    if (this.idComitetecnico === undefined) {
      this.router.navigate(['eliminar', comitetecnico.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', comitetecnico.id], { relativeTo: this.route });
    }
  }

  getComitetecnico() {
    if (this.idComitetecnico === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idComitetecnico], { relativeTo: this.route });
    }
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
        this.comitetecnico_create = true;
        this.comitetecnico_delete = true;
        this.comitetecnico_update = true;
        this.comitetecnico_read = true;
      }

      if (element.code == 'COMITETECNICO:UPDATE') {
        this.comitetecnico_update = true;
      }

      if (element.code == 'COMITETECNICO:DELETE') {
        this.comitetecnico_delete = true;
      }

      if (element.code == 'COMITETECNICO:READ') {
        this.comitetecnico_read = true;
      }

      if (element.code == 'COMITETECNICO:CREATE') {
        this.comitetecnico_create = true;
      }

      if (element.code == 'COMITETECNICO:*') {
        this.comitetecnico_update = true;
        this.comitetecnico_create = true;
        this.comitetecnico_delete = true;
        this.comitetecnico_read = true;
      }
    });
  }
}
