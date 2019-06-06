/* PSG  Movimiento Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Movimiento } from '../movimiento.psg.model';
import { MovimientoService } from '../movimiento.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-movimiento',
  styleUrls: ['../movimiento.psg.scss'],
  templateUrl: './movimiento-administrar.psg.html',
})
export class MovimientoAdministrar {
  movimientoArray: Movimiento[];
  movimiento: Movimiento;
  idMovimiento: number;
  loading = false;

  public fideicomiso: Fideicomiso;
  public subfiso: Subfiso;

  // Detalles
  idFideicomiso: number;
  idSubfiso: number;

  // Modal
  modalfideicomiso: boolean = false;
  modalsubfiso: boolean = false;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  movimiento_update: boolean = false;
  movimiento_delete: boolean = false;
  movimiento_create: boolean = false;
  movimiento_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private movimientoService: MovimientoService
  ) {}

  ngOnInit() {
    console.log('Movimiento administrar()');

    this.getUser();
    this.setButtons();
    this.cargaMovimiento();

    this.route.params.subscribe(params => {
      this.idMovimiento = params['id'];
    });

    if (this.idMovimiento !== undefined) {
      this.getRecuperaMovimientoPorFideicomiso(this.idMovimiento);
    }
    if (this.idMovimiento !== undefined) {
      this.getRecuperaMovimientoPorSubfiso(this.idMovimiento);
    }
  }

  cargaMovimiento() {
    this.movimientoService.getRecuperaMovimiento().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.movimientoArray = res.json();
            this.llenaCampos(this.movimientoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Movimientos.', 'error');
      }
    );
  }

  getRecuperaMovimientoPorFideicomiso(id) {
    this.movimientoService.getRecuperaMovimientoPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.movimientoArray = res.json();
            this.llenaCampos(this.movimientoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the movimiento.', 'error');
      }
    );
  }
  getRecuperaMovimientoPorSubfiso(id) {
    this.movimientoService.getRecuperaMovimientoPorSubfiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.movimientoArray = res.json();
            this.llenaCampos(this.movimientoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the movimiento.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
      this.subfisoService.getRecuperaSubfisoPorId(element.subfisoId).subscribe(res => {
        this.subfiso = res.json();
        element.subfisoItem = this.subfiso.numero + '';
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
    });
  }

  setClickedRowEditaMovimiento(index, movimiento) {
    this.movimientoService.setMovimiento(movimiento);
    if (this.idMovimiento === undefined) {
      this.router.navigate(['editar', movimiento.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', movimiento.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaMovimiento(index, movimiento) {
    this.movimientoService.setMovimiento(movimiento);
    if (this.idMovimiento === undefined) {
      this.router.navigate(['eliminar', movimiento.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', movimiento.id], { relativeTo: this.route });
    }
  }

  getMovimiento() {
    if (this.idMovimiento === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idMovimiento], { relativeTo: this.route });
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
        this.movimiento_create = true;
        this.movimiento_delete = true;
        this.movimiento_update = true;
        this.movimiento_read = true;
      }

      if (element.code == 'MOVIMIENTO:UPDATE') {
        this.movimiento_update = true;
      }

      if (element.code == 'MOVIMIENTO:DELETE') {
        this.movimiento_delete = true;
      }

      if (element.code == 'MOVIMIENTO:READ') {
        this.movimiento_read = true;
      }

      if (element.code == 'MOVIMIENTO:CREATE') {
        this.movimiento_create = true;
      }

      if (element.code == 'MOVIMIENTO:*') {
        this.movimiento_update = true;
        this.movimiento_create = true;
        this.movimiento_delete = true;
        this.movimiento_read = true;
      }
    });
  }
}
