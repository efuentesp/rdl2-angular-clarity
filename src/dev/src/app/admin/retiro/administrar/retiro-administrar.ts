/* PSG  Retiro Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Retiro } from '../retiro.psg.model';
import { RetiroService } from '../retiro.psg.service';

// Detalles

@Component({
  selector: 'clr-retiro',
  styleUrls: ['../retiro.psg.scss'],
  templateUrl: './retiro-administrar.psg.html',
})
export class RetiroAdministrar {
  retiroArray: Retiro[];
  retiro: Retiro;
  idRetiro: number;
  loading = false;

  // Detalles

  // Modal

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  retiro_update: boolean = false;
  retiro_delete: boolean = false;
  retiro_create: boolean = false;
  retiro_read: boolean = false;

  // Child Entities *

  constructor(private router: Router, private route: ActivatedRoute, private retiroService: RetiroService) {}

  ngOnInit() {
    console.log('Retiro administrar()');

    this.getUser();
    this.setButtons();
    this.cargaRetiro();

    this.route.params.subscribe(params => {
      this.idRetiro = params['id'];
    });
  }

  cargaRetiro() {
    this.retiroService.getRecuperaRetiro().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.retiroArray = res.json();
            this.llenaCampos(this.retiroArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Retiros.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {});
  }

  setClickedRowEditaRetiro(index, retiro) {
    this.retiroService.setRetiro(retiro);
    if (this.idRetiro === undefined) {
      this.router.navigate(['editar', retiro.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', retiro.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaRetiro(index, retiro) {
    this.retiroService.setRetiro(retiro);
    if (this.idRetiro === undefined) {
      this.router.navigate(['eliminar', retiro.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', retiro.id], { relativeTo: this.route });
    }
  }

  getRetiro() {
    if (this.idRetiro === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idRetiro], { relativeTo: this.route });
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
        this.retiro_create = true;
        this.retiro_delete = true;
        this.retiro_update = true;
        this.retiro_read = true;
      }

      if (element.code == 'RETIRO:UPDATE') {
        this.retiro_update = true;
      }

      if (element.code == 'RETIRO:DELETE') {
        this.retiro_delete = true;
      }

      if (element.code == 'RETIRO:READ') {
        this.retiro_read = true;
      }

      if (element.code == 'RETIRO:CREATE') {
        this.retiro_create = true;
      }

      if (element.code == 'RETIRO:*') {
        this.retiro_update = true;
        this.retiro_create = true;
        this.retiro_delete = true;
        this.retiro_read = true;
      }
    });
  }
}
