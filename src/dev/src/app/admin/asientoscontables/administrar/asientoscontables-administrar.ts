/* PSG  Asientoscontables Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Asientoscontables } from '../asientoscontables.psg.model';
import { AsientoscontablesService } from '../asientoscontables.psg.service';

// Detalles
import { TransaccionService } from '../../transaccion/transaccion.psg.service';
import { Transaccion } from '../../transaccion/transaccion.psg.model';

@Component({
  selector: 'clr-asientoscontables',
  styleUrls: ['../asientoscontables.psg.scss'],
  templateUrl: './asientoscontables-administrar.psg.html',
})
export class AsientoscontablesAdministrar {
  asientoscontablesArray: Asientoscontables[];
  asientoscontables: Asientoscontables;
  idAsientoscontables: number;
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

  asientoscontables_update: boolean = false;
  asientoscontables_delete: boolean = false;
  asientoscontables_create: boolean = false;
  asientoscontables_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private transaccionService: TransaccionService,
    private asientoscontablesService: AsientoscontablesService
  ) {}

  ngOnInit() {
    console.log('Asientoscontables administrar()');

    this.getUser();
    this.setButtons();
    this.cargaAsientoscontables();

    this.route.params.subscribe(params => {
      this.idAsientoscontables = params['id'];
    });

    if (this.idAsientoscontables !== undefined) {
      this.getRecuperaAsientoscontablesPorTransaccion(this.idAsientoscontables);
    }
  }

  cargaAsientoscontables() {
    this.asientoscontablesService.getRecuperaAsientoscontables().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.asientoscontablesArray = res.json();
            this.llenaCampos(this.asientoscontablesArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Asientos contables.', 'error');
      }
    );
  }

  getRecuperaAsientoscontablesPorTransaccion(id) {
    this.asientoscontablesService.getRecuperaAsientoscontablesPorTransaccion(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.asientoscontablesArray = res.json();
            this.llenaCampos(this.asientoscontablesArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the asientoscontables.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.transaccionService.getRecuperaTransaccionPorId(element.transaccionId).subscribe(res => {
        this.transaccion = res.json();
        element.transaccionItem = this.transaccion.notransaccion + '';
      });
      if (element.moneda == 'DLS') {
        element.monedaItem = 'DLS. U.S.A.';
      }
      if (element.moneda == 'EURO') {
        element.monedaItem = 'EUROS';
      }
      if (element.moneda == 'NACIONAL') {
        element.monedaItem = 'MONEDA NACIONAL';
      }
      if (element.cargoabono == 'CARGO') {
        element.cargoabonoItem = 'CARGO';
      }
      if (element.cargoabono == 'ABONO') {
        element.cargoabonoItem = 'ABONO';
      }
    });
  }

  setClickedRowEditaAsientoscontables(index, asientoscontables) {
    this.asientoscontablesService.setAsientoscontables(asientoscontables);
    if (this.idAsientoscontables === undefined) {
      this.router.navigate(['editar', asientoscontables.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', asientoscontables.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaAsientoscontables(index, asientoscontables) {
    this.asientoscontablesService.setAsientoscontables(asientoscontables);
    if (this.idAsientoscontables === undefined) {
      this.router.navigate(['eliminar', asientoscontables.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', asientoscontables.id], { relativeTo: this.route });
    }
  }

  getAsientoscontables() {
    if (this.idAsientoscontables === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idAsientoscontables], { relativeTo: this.route });
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
        this.asientoscontables_create = true;
        this.asientoscontables_delete = true;
        this.asientoscontables_update = true;
        this.asientoscontables_read = true;
      }

      if (element.code == 'ASIENTOSCONTABLES:UPDATE') {
        this.asientoscontables_update = true;
      }

      if (element.code == 'ASIENTOSCONTABLES:DELETE') {
        this.asientoscontables_delete = true;
      }

      if (element.code == 'ASIENTOSCONTABLES:READ') {
        this.asientoscontables_read = true;
      }

      if (element.code == 'ASIENTOSCONTABLES:CREATE') {
        this.asientoscontables_create = true;
      }

      if (element.code == 'ASIENTOSCONTABLES:*') {
        this.asientoscontables_update = true;
        this.asientoscontables_create = true;
        this.asientoscontables_delete = true;
        this.asientoscontables_read = true;
      }
    });
  }
}
