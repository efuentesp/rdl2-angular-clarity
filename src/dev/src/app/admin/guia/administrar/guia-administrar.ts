/* PSG  Guia Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Guia } from '../guia.psg.model';
import { GuiaService } from '../guia.psg.service';

// Detalles
import { TransaccionService } from '../../transaccion/transaccion.psg.service';
import { Transaccion } from '../../transaccion/transaccion.psg.model';

@Component({
  selector: 'clr-guia',
  styleUrls: ['../guia.psg.scss'],
  templateUrl: './guia-administrar.psg.html',
})
export class GuiaAdministrar {
  guiaArray: Guia[];
  guia: Guia;
  idGuia: number;
  loading = false;

  public transaccion: Transaccion;

  // Detalles
  idTransaccion: number;

  // Modal
  modaltransaccion: boolean = false;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  guia_update: boolean = false;
  guia_delete: boolean = false;
  guia_create: boolean = false;
  guia_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private transaccionService: TransaccionService,
    private guiaService: GuiaService
  ) {}

  ngOnInit() {
    console.log('Guia administrar()');

    this.getUser();
    this.setButtons();
    this.cargaGuia();

    this.route.params.subscribe(params => {
      this.idGuia = params['id'];
    });

    if (this.idGuia !== undefined) {
      this.getRecuperaGuiaPorTransaccion(this.idGuia);
    }
  }

  cargaGuia() {
    this.guiaService.getRecuperaGuia().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.guiaArray = res.json();
            this.llenaCampos(this.guiaArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Catálogo de guías.', 'error');
      }
    );
  }

  getRecuperaGuiaPorTransaccion(id) {
    this.guiaService.getRecuperaGuiaPorTransaccion(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.guiaArray = res.json();
            this.llenaCampos(this.guiaArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the guia.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.transaccionService.getRecuperaTransaccionPorId(element.transaccionId).subscribe(res => {
        this.transaccion = res.json();
        element.transaccionItem = this.transaccion.notransaccion + '';
      });
      if (element.aplicadato == 'APLICADATO1') {
        element.aplicadatoItem = 'IMPORTE';
      }
      if (element.aplicadato == 'APLICADATO2') {
        element.aplicadatoItem = 'IVA';
      }
      if (element.aplicadato == 'APLICADATO3') {
        element.aplicadatoItem = 'ISR';
      }
      if (element.aplicadato == 'APLICADATO4') {
        element.aplicadatoItem = 'IPC';
      }
      if (element.aplicadato == 'APLICADATO5') {
        element.aplicadatoItem = 'IVA COMISIÓN';
      }
      if (element.ca == 'CARGO') {
        element.caItem = 'CARGO';
      }
      if (element.ca == 'ABONO') {
        element.caItem = 'ABONO';
      }
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
    });
  }

  setClickedRowEditaGuia(index, guia) {
    this.guiaService.setGuia(guia);
    if (this.idGuia === undefined) {
      this.router.navigate(['editar', guia.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', guia.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaGuia(index, guia) {
    this.guiaService.setGuia(guia);
    if (this.idGuia === undefined) {
      this.router.navigate(['eliminar', guia.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', guia.id], { relativeTo: this.route });
    }
  }

  getGuia() {
    if (this.idGuia === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idGuia], { relativeTo: this.route });
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
        this.guia_create = true;
        this.guia_delete = true;
        this.guia_update = true;
        this.guia_read = true;
      }

      if (element.code == 'GUIA:UPDATE') {
        this.guia_update = true;
      }

      if (element.code == 'GUIA:DELETE') {
        this.guia_delete = true;
      }

      if (element.code == 'GUIA:READ') {
        this.guia_read = true;
      }

      if (element.code == 'GUIA:CREATE') {
        this.guia_create = true;
      }

      if (element.code == 'GUIA:*') {
        this.guia_update = true;
        this.guia_create = true;
        this.guia_delete = true;
        this.guia_read = true;
      }
    });
  }
}
