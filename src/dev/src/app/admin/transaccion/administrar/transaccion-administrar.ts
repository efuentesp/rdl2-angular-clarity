/* PSG  Transaccion Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Transaccion } from '../transaccion.psg.model';
import { TransaccionService } from '../transaccion.psg.service';

// Detalles

@Component({
  selector: 'clr-transaccion',
  styleUrls: ['../transaccion.psg.scss'],
  templateUrl: './transaccion-administrar.psg.html',
})
export class TransaccionAdministrar {
  transaccionArray: Transaccion[];
  transaccion: Transaccion;
  idTransaccion: number;
  loading = false;

  // Detalles

  // Modal

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  transaccion_update: boolean = false;
  transaccion_delete: boolean = false;
  transaccion_create: boolean = false;
  transaccion_read: boolean = false;

  // Child Entities *

  constructor(private router: Router, private route: ActivatedRoute, private transaccionService: TransaccionService) {}

  ngOnInit() {
    console.log('Transaccion administrar()');

    this.getUser();
    this.setButtons();
    this.cargaTransaccion();

    this.route.params.subscribe(params => {
      this.idTransaccion = params['id'];
    });
  }

  cargaTransaccion() {
    this.transaccionService.getRecuperaTransaccion().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.transaccionArray = res.json();
            this.llenaCampos(this.transaccionArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Catálogo de transacciones.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      if (element.modulo == 'MOD1') {
        element.moduloItem = 'OPERACIÓN FIDUCIARIA';
      }
      if (element.modulo == 'MOD2') {
        element.moduloItem = 'HONORARIOS';
      }
      if (element.modulo == 'MOD3') {
        element.moduloItem = 'INVERSIONES';
      }
      if (element.modulo == 'MOD4') {
        element.moduloItem = 'ADMINISTRACIÓN';
      }
      if (element.modulo == 'MOD5') {
        element.moduloItem = 'INMUEBLES';
      }
      if (element.estatustrans == 'ACTIVO') {
        element.estatustransItem = 'ACTIVO';
      }
      if (element.estatustrans == 'CANCELADO') {
        element.estatustransItem = 'CANCELADO';
      }
      if (element.estatustrans == 'SUSPENDIDO') {
        element.estatustransItem = 'SUSPENDIDO';
      }
      if (element.estatustrans == 'BAJA') {
        element.estatustransItem = 'BAJA';
      }
      if (element.moneda == 'DLS') {
        element.monedaItem = 'DLS. U.S.A.';
      }
      if (element.moneda == 'EURO') {
        element.monedaItem = 'EUROS';
      }
      if (element.moneda == 'NACIONAL') {
        element.monedaItem = 'MONEDA NACIONAL';
      }
      if (element.columedocuenta == 'ABONO') {
        element.columedocuentaItem = 'ABONO';
      }
      if (element.columedocuenta == 'CARGO') {
        element.columedocuentaItem = 'CARGO';
      }
      if (element.columedocuenta == 'COMPRA') {
        element.columedocuentaItem = 'COMPRA';
      }
      if (element.columedocuenta == 'VENTA') {
        element.columedocuentaItem = 'VENTA';
      }
      if (element.columedocuenta == 'CONTABILIZA') {
        element.columedocuentaItem = 'CONTABILIZA';
      }
      if (element.columedocuenta == 'POLIZA') {
        element.columedocuentaItem = 'PÓLIZA';
      }
      if (element.columedocuenta == 'CORRECCION') {
        element.columedocuentaItem = 'CORRECCIÓN';
      }
    });
  }

  setClickedRowEditaTransaccion(index, transaccion) {
    this.transaccionService.setTransaccion(transaccion);
    if (this.idTransaccion === undefined) {
      this.router.navigate(['editar', transaccion.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', transaccion.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaTransaccion(index, transaccion) {
    this.transaccionService.setTransaccion(transaccion);
    if (this.idTransaccion === undefined) {
      this.router.navigate(['eliminar', transaccion.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', transaccion.id], { relativeTo: this.route });
    }
  }

  getTransaccion() {
    if (this.idTransaccion === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idTransaccion], { relativeTo: this.route });
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
        this.transaccion_create = true;
        this.transaccion_delete = true;
        this.transaccion_update = true;
        this.transaccion_read = true;
      }

      if (element.code == 'TRANSACCION:UPDATE') {
        this.transaccion_update = true;
      }

      if (element.code == 'TRANSACCION:DELETE') {
        this.transaccion_delete = true;
      }

      if (element.code == 'TRANSACCION:READ') {
        this.transaccion_read = true;
      }

      if (element.code == 'TRANSACCION:CREATE') {
        this.transaccion_create = true;
      }

      if (element.code == 'TRANSACCION:*') {
        this.transaccion_update = true;
        this.transaccion_create = true;
        this.transaccion_delete = true;
        this.transaccion_read = true;
      }
    });
  }
}
