/* PSG  Autodeclaracioncrs Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Autodeclaracioncrs } from '../autodeclaracioncrs.psg.model';
import { AutodeclaracioncrsService } from '../autodeclaracioncrs.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-autodeclaracioncrs',
  styleUrls: ['../autodeclaracioncrs.psg.scss'],
  templateUrl: './autodeclaracioncrs-administrar.psg.html',
})
export class AutodeclaracioncrsAdministrar {
  autodeclaracioncrsArray: Autodeclaracioncrs[];
  autodeclaracioncrs: Autodeclaracioncrs;
  idAutodeclaracioncrs: number;
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

  autodeclaracioncrs_update: boolean = false;
  autodeclaracioncrs_delete: boolean = false;
  autodeclaracioncrs_create: boolean = false;
  autodeclaracioncrs_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private autodeclaracioncrsService: AutodeclaracioncrsService
  ) {}

  ngOnInit() {
    console.log('Autodeclaracioncrs administrar()');

    this.getUser();
    this.setButtons();
    this.cargaAutodeclaracioncrs();

    this.route.params.subscribe(params => {
      this.idAutodeclaracioncrs = params['id'];
    });

    if (this.idAutodeclaracioncrs !== undefined) {
      this.getRecuperaAutodeclaracioncrsPorFideicomiso(this.idAutodeclaracioncrs);
    }
  }

  cargaAutodeclaracioncrs() {
    this.autodeclaracioncrsService.getRecuperaAutodeclaracioncrs().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.autodeclaracioncrsArray = res.json();
            this.llenaCampos(this.autodeclaracioncrsArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Autodeclaración CRS.', 'error');
      }
    );
  }

  getRecuperaAutodeclaracioncrsPorFideicomiso(id) {
    this.autodeclaracioncrsService.getRecuperaAutodeclaracioncrsPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.autodeclaracioncrsArray = res.json();
            this.llenaCampos(this.autodeclaracioncrsArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the autodeclaracioncrs.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
      if (element.tipopersona == 'FISICA') {
        element.tipopersonaItem = 'FISICA';
      }
      if (element.tipopersona == 'GOBIERNO') {
        element.tipopersonaItem = 'GOBIERNO';
      }
      if (element.tipopersona == 'MORAL') {
        element.tipopersonaItem = 'MORAL';
      }
      if (element.tipoparticipante == 'FIDEICOMITENTE') {
        element.tipoparticipanteItem = 'FIDEICOMITENTE';
      }
    });
  }

  setClickedRowEditaAutodeclaracioncrs(index, autodeclaracioncrs) {
    this.autodeclaracioncrsService.setAutodeclaracioncrs(autodeclaracioncrs);
    if (this.idAutodeclaracioncrs === undefined) {
      this.router.navigate(['editar', autodeclaracioncrs.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', autodeclaracioncrs.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaAutodeclaracioncrs(index, autodeclaracioncrs) {
    this.autodeclaracioncrsService.setAutodeclaracioncrs(autodeclaracioncrs);
    if (this.idAutodeclaracioncrs === undefined) {
      this.router.navigate(['eliminar', autodeclaracioncrs.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', autodeclaracioncrs.id], { relativeTo: this.route });
    }
  }

  getAutodeclaracioncrs() {
    if (this.idAutodeclaracioncrs === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idAutodeclaracioncrs], { relativeTo: this.route });
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
        this.autodeclaracioncrs_create = true;
        this.autodeclaracioncrs_delete = true;
        this.autodeclaracioncrs_update = true;
        this.autodeclaracioncrs_read = true;
      }

      if (element.code == 'AUTODECLARACIONCRS:UPDATE') {
        this.autodeclaracioncrs_update = true;
      }

      if (element.code == 'AUTODECLARACIONCRS:DELETE') {
        this.autodeclaracioncrs_delete = true;
      }

      if (element.code == 'AUTODECLARACIONCRS:READ') {
        this.autodeclaracioncrs_read = true;
      }

      if (element.code == 'AUTODECLARACIONCRS:CREATE') {
        this.autodeclaracioncrs_create = true;
      }

      if (element.code == 'AUTODECLARACIONCRS:*') {
        this.autodeclaracioncrs_update = true;
        this.autodeclaracioncrs_create = true;
        this.autodeclaracioncrs_delete = true;
        this.autodeclaracioncrs_read = true;
      }
    });
  }
}
