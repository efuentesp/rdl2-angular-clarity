/* PSG  Declaracionsat Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Declaracionsat } from '../declaracionsat.psg.model';
import { DeclaracionsatService } from '../declaracionsat.psg.service';

// Detalles

@Component({
  selector: 'clr-declaracionsat',
  styleUrls: ['../declaracionsat.psg.scss'],
  templateUrl: './declaracionsat-administrar.psg.html',
})
export class DeclaracionsatAdministrar {
  declaracionsatArray: Declaracionsat[];
  declaracionsat: Declaracionsat;
  idDeclaracionsat: number;
  loading = false;

  // Detalles

  // Modal

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  declaracionsat_update: boolean = false;
  declaracionsat_delete: boolean = false;
  declaracionsat_create: boolean = false;
  declaracionsat_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private declaracionsatService: DeclaracionsatService
  ) {}

  ngOnInit() {
    console.log('Declaracionsat administrar()');

    this.getUser();
    this.setButtons();
    this.cargaDeclaracionsat();

    this.route.params.subscribe(params => {
      this.idDeclaracionsat = params['id'];
    });
  }

  cargaDeclaracionsat() {
    this.declaracionsatService.getRecuperaDeclaracionsat().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.declaracionsatArray = res.json();
            this.llenaCampos(this.declaracionsatArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Generación archivo SAT 32-B.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      element.inicioejerciciofiscalAux = new Date(element.inicioejerciciofiscal);
      if (element.tipodeclaracion == 'NORMAL') {
        element.tipodeclaracionItem = 'NORMAL';
      }
      if (element.tipodeclaracion == 'COMPL') {
        element.tipodeclaracionItem = 'COMPLEMENTARIA';
      }
      element.finejerciciofiscalAux = new Date(element.finejerciciofiscal);
      element.fechadeclaracionanteriorAux = new Date(element.fechadeclaracionanterior);
    });
  }

  setClickedRowEditaDeclaracionsat(index, declaracionsat) {
    this.declaracionsatService.setDeclaracionsat(declaracionsat);
    if (this.idDeclaracionsat === undefined) {
      this.router.navigate(['editar', declaracionsat.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', declaracionsat.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaDeclaracionsat(index, declaracionsat) {
    this.declaracionsatService.setDeclaracionsat(declaracionsat);
    if (this.idDeclaracionsat === undefined) {
      this.router.navigate(['eliminar', declaracionsat.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', declaracionsat.id], { relativeTo: this.route });
    }
  }

  getDeclaracionsat() {
    if (this.idDeclaracionsat === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idDeclaracionsat], { relativeTo: this.route });
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
        this.declaracionsat_create = true;
        this.declaracionsat_delete = true;
        this.declaracionsat_update = true;
        this.declaracionsat_read = true;
      }

      if (element.code == 'DECLARACIONSAT:UPDATE') {
        this.declaracionsat_update = true;
      }

      if (element.code == 'DECLARACIONSAT:DELETE') {
        this.declaracionsat_delete = true;
      }

      if (element.code == 'DECLARACIONSAT:READ') {
        this.declaracionsat_read = true;
      }

      if (element.code == 'DECLARACIONSAT:CREATE') {
        this.declaracionsat_create = true;
      }

      if (element.code == 'DECLARACIONSAT:*') {
        this.declaracionsat_update = true;
        this.declaracionsat_create = true;
        this.declaracionsat_delete = true;
        this.declaracionsat_read = true;
      }
    });
  }
}
