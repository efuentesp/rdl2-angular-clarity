/* PSG  Honorarioadministracion Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Honorarioadministracion } from '../honorarioadministracion.psg.model';
import { HonorarioadministracionService } from '../honorarioadministracion.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-honorarioadministracion',
  styleUrls: ['../honorarioadministracion.psg.scss'],
  templateUrl: './honorarioadministracion-administrar.psg.html',
})
export class HonorarioadministracionAdministrar {
  honorarioadministracionArray: Honorarioadministracion[];
  honorarioadministracion: Honorarioadministracion;
  idHonorarioadministracion: number;
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

  honorarioadministracion_update: boolean = false;
  honorarioadministracion_delete: boolean = false;
  honorarioadministracion_create: boolean = false;
  honorarioadministracion_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private honorarioadministracionService: HonorarioadministracionService
  ) {}

  ngOnInit() {
    console.log('Honorarioadministracion administrar()');

    this.getUser();
    this.setButtons();
    this.cargaHonorarioadministracion();

    this.route.params.subscribe(params => {
      this.idHonorarioadministracion = params['id'];
    });

    if (this.idHonorarioadministracion !== undefined) {
      this.getRecuperaHonorarioadministracionPorFideicomiso(this.idHonorarioadministracion);
    }
  }

  cargaHonorarioadministracion() {
    this.honorarioadministracionService.getRecuperaHonorarioadministracion().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.honorarioadministracionArray = res.json();
            this.llenaCampos(this.honorarioadministracionArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Honorario por administración.', 'error');
      }
    );
  }

  getRecuperaHonorarioadministracionPorFideicomiso(id) {
    this.honorarioadministracionService.getRecuperaHonorarioadministracionPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.honorarioadministracionArray = res.json();
            this.llenaCampos(this.honorarioadministracionArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the honorarioadministracion.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
      if (element.periodo == 'SEMESTRAL') {
        element.periodoItem = 'SEMESTRAL';
      }
      if (element.periodo == 'MENSUAL') {
        element.periodoItem = 'MENSUAL';
      }
      if (element.periodo == 'TRIMESTRAL') {
        element.periodoItem = 'TRIMESTRAL';
      }
      if (element.periodo == 'ANUAL') {
        element.periodoItem = 'ANUAL';
      }
    });
  }

  setClickedRowEditaHonorarioadministracion(index, honorarioadministracion) {
    this.honorarioadministracionService.setHonorarioadministracion(honorarioadministracion);
    if (this.idHonorarioadministracion === undefined) {
      this.router.navigate(['editar', honorarioadministracion.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', honorarioadministracion.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaHonorarioadministracion(index, honorarioadministracion) {
    this.honorarioadministracionService.setHonorarioadministracion(honorarioadministracion);
    if (this.idHonorarioadministracion === undefined) {
      this.router.navigate(['eliminar', honorarioadministracion.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', honorarioadministracion.id], { relativeTo: this.route });
    }
  }

  getHonorarioadministracion() {
    if (this.idHonorarioadministracion === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idHonorarioadministracion], { relativeTo: this.route });
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
        this.honorarioadministracion_create = true;
        this.honorarioadministracion_delete = true;
        this.honorarioadministracion_update = true;
        this.honorarioadministracion_read = true;
      }

      if (element.code == 'HONORARIOADMINISTRACION:UPDATE') {
        this.honorarioadministracion_update = true;
      }

      if (element.code == 'HONORARIOADMINISTRACION:DELETE') {
        this.honorarioadministracion_delete = true;
      }

      if (element.code == 'HONORARIOADMINISTRACION:READ') {
        this.honorarioadministracion_read = true;
      }

      if (element.code == 'HONORARIOADMINISTRACION:CREATE') {
        this.honorarioadministracion_create = true;
      }

      if (element.code == 'HONORARIOADMINISTRACION:*') {
        this.honorarioadministracion_update = true;
        this.honorarioadministracion_create = true;
        this.honorarioadministracion_delete = true;
        this.honorarioadministracion_read = true;
      }
    });
  }
}
