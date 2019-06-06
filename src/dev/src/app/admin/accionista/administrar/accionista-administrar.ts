/* PSG  Accionista Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Accionista } from '../accionista.psg.model';
import { AccionistaService } from '../accionista.psg.service';

// Detalles

@Component({
  selector: 'clr-accionista',
  styleUrls: ['../accionista.psg.scss'],
  templateUrl: './accionista-administrar.psg.html',
})
export class AccionistaAdministrar {
  accionistaArray: Accionista[];
  accionista: Accionista;
  idAccionista: number;
  loading = false;

  // Detalles

  // Modal

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  accionista_update: boolean = false;
  accionista_delete: boolean = false;
  accionista_create: boolean = false;
  accionista_read: boolean = false;

  // Child Entities *

  constructor(private router: Router, private route: ActivatedRoute, private accionistaService: AccionistaService) {}

  ngOnInit() {
    console.log('Accionista administrar()');

    this.getUser();
    this.setButtons();
    this.cargaAccionista();

    this.route.params.subscribe(params => {
      this.idAccionista = params['id'];
    });
  }

  cargaAccionista() {
    this.accionistaService.getRecuperaAccionista().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.accionistaArray = res.json();
            this.llenaCampos(this.accionistaArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Accionista.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      if (element.tipopersona == 'FISICA') {
        element.tipopersonaItem = 'FISICA';
      }
      if (element.tipopersona == 'GOBIERNO') {
        element.tipopersonaItem = 'GOBIERNO';
      }
      if (element.tipopersona == 'MORAL') {
        element.tipopersonaItem = 'MORAL';
      }
      if (element.nacionalidad == 'MEXICANO') {
        element.nacionalidadItem = 'MEXICANO';
      }
      if (element.nacionalidad == 'NORTAM') {
        element.nacionalidadItem = 'ESTADOUNIDENSE';
      }
      if (element.pep == 'NO') {
        element.pepItem = 'NO';
      }
      if (element.pep == 'SI') {
        element.pepItem = 'SI';
      }
    });
  }

  setClickedRowEditaAccionista(index, accionista) {
    this.accionistaService.setAccionista(accionista);
    if (this.idAccionista === undefined) {
      this.router.navigate(['editar', accionista.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', accionista.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaAccionista(index, accionista) {
    this.accionistaService.setAccionista(accionista);
    if (this.idAccionista === undefined) {
      this.router.navigate(['eliminar', accionista.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', accionista.id], { relativeTo: this.route });
    }
  }

  getAccionista() {
    if (this.idAccionista === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idAccionista], { relativeTo: this.route });
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
        this.accionista_create = true;
        this.accionista_delete = true;
        this.accionista_update = true;
        this.accionista_read = true;
      }

      if (element.code == 'ACCIONISTA:UPDATE') {
        this.accionista_update = true;
      }

      if (element.code == 'ACCIONISTA:DELETE') {
        this.accionista_delete = true;
      }

      if (element.code == 'ACCIONISTA:READ') {
        this.accionista_read = true;
      }

      if (element.code == 'ACCIONISTA:CREATE') {
        this.accionista_create = true;
      }

      if (element.code == 'ACCIONISTA:*') {
        this.accionista_update = true;
        this.accionista_create = true;
        this.accionista_delete = true;
        this.accionista_read = true;
      }
    });
  }
}
