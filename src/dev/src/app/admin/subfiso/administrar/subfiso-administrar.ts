/* PSG  Subfiso Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Subfiso } from '../subfiso.psg.model';
import { SubfisoService } from '../subfiso.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-subfiso',
  styleUrls: ['../subfiso.psg.scss'],
  templateUrl: './subfiso-administrar.psg.html',
})
export class SubfisoAdministrar {
  subfisoArray: Subfiso[];
  subfiso: Subfiso;
  idSubfiso: number;
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

  subfiso_update: boolean = false;
  subfiso_delete: boolean = false;
  subfiso_create: boolean = false;
  subfiso_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService
  ) {}

  ngOnInit() {
    console.log('Subfiso administrar()');

    this.getUser();
    this.setButtons();
    this.cargaSubfiso();

    this.route.params.subscribe(params => {
      this.idSubfiso = params['id'];
    });

    if (this.idSubfiso !== undefined) {
      this.getRecuperaSubfisoPorFideicomiso(this.idSubfiso);
    }
  }

  cargaSubfiso() {
    this.subfisoService.getRecuperaSubfiso().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.subfisoArray = res.json();
            this.llenaCampos(this.subfisoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Sub fiso.', 'error');
      }
    );
  }

  getRecuperaSubfisoPorFideicomiso(id) {
    this.subfisoService.getRecuperaSubfisoPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.subfisoArray = res.json();
            this.llenaCampos(this.subfisoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the subfiso.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
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
      element.fecharegistroAux = new Date(element.fecharegistro);
    });
  }

  setClickedRowEditaSubfiso(index, subfiso) {
    this.subfisoService.setSubfiso(subfiso);
    if (this.idSubfiso === undefined) {
      this.router.navigate(['editar', subfiso.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', subfiso.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaSubfiso(index, subfiso) {
    this.subfisoService.setSubfiso(subfiso);
    if (this.idSubfiso === undefined) {
      this.router.navigate(['eliminar', subfiso.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', subfiso.id], { relativeTo: this.route });
    }
  }

  getSubfiso() {
    if (this.idSubfiso === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idSubfiso], { relativeTo: this.route });
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
        this.subfiso_create = true;
        this.subfiso_delete = true;
        this.subfiso_update = true;
        this.subfiso_read = true;
      }

      if (element.code == 'SUBFISO:UPDATE') {
        this.subfiso_update = true;
      }

      if (element.code == 'SUBFISO:DELETE') {
        this.subfiso_delete = true;
      }

      if (element.code == 'SUBFISO:READ') {
        this.subfiso_read = true;
      }

      if (element.code == 'SUBFISO:CREATE') {
        this.subfiso_create = true;
      }

      if (element.code == 'SUBFISO:*') {
        this.subfiso_update = true;
        this.subfiso_create = true;
        this.subfiso_delete = true;
        this.subfiso_read = true;
      }
    });
  }
}
