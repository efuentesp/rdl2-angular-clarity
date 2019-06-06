/* PSG  Pagos Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Pagos } from '../pagos.psg.model';
import { PagosService } from '../pagos.psg.service';

// Detalles
import { InstruccionService } from '../../instruccion/instruccion.psg.service';
import { Instruccion } from '../../instruccion/instruccion.psg.model';
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-pagos',
  styleUrls: ['../pagos.psg.scss'],
  templateUrl: './pagos-administrar.psg.html',
})
export class PagosAdministrar {
  pagosArray: Pagos[];
  pagos: Pagos;
  idPagos: number;
  loading = false;

  public instruccion: Instruccion;
  public fideicomiso: Fideicomiso;
  public subfiso: Subfiso;

  // Detalles
  idInstruccion: number;
  idFideicomiso: number;
  idSubfiso: number;

  // Modal
  modalinstruccion: boolean = false;
  modalfideicomiso: boolean = false;
  modalsubfiso: boolean = false;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  pagos_update: boolean = false;
  pagos_delete: boolean = false;
  pagos_create: boolean = false;
  pagos_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private instruccionService: InstruccionService,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private pagosService: PagosService
  ) {}

  ngOnInit() {
    console.log('Pagos administrar()');

    this.getUser();
    this.setButtons();
    this.cargaPagos();

    this.route.params.subscribe(params => {
      this.idPagos = params['id'];
    });

    if (this.idPagos !== undefined) {
      this.getRecuperaPagosPorInstruccion(this.idPagos);
    }
    if (this.idPagos !== undefined) {
      this.getRecuperaPagosPorFideicomiso(this.idPagos);
    }
    if (this.idPagos !== undefined) {
      this.getRecuperaPagosPorSubfiso(this.idPagos);
    }
  }

  cargaPagos() {
    this.pagosService.getRecuperaPagos().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.pagosArray = res.json();
            this.llenaCampos(this.pagosArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Pagos.', 'error');
      }
    );
  }

  getRecuperaPagosPorInstruccion(id) {
    this.pagosService.getRecuperaPagosPorInstruccion(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.pagosArray = res.json();
            this.llenaCampos(this.pagosArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the pagos.', 'error');
      }
    );
  }
  getRecuperaPagosPorFideicomiso(id) {
    this.pagosService.getRecuperaPagosPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.pagosArray = res.json();
            this.llenaCampos(this.pagosArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the pagos.', 'error');
      }
    );
  }
  getRecuperaPagosPorSubfiso(id) {
    this.pagosService.getRecuperaPagosPorSubfiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.pagosArray = res.json();
            this.llenaCampos(this.pagosArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the pagos.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.instruccionService.getRecuperaInstruccionPorId(element.instruccionId).subscribe(res => {
        this.instruccion = res.json();
        element.instruccionItem = this.instruccion.folio + '';
      });
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
      if (element.tipopersona == 'TIPO1') {
        element.tipopersonaItem = 'FIDEICOMISARIO';
      }
      if (element.tipopersona == 'TIPO2') {
        element.tipopersonaItem = 'TERCERO';
      }
      if (element.conceptopago == 'CONCEPTO1') {
        element.conceptopagoItem = 'APLICACIÓN EFECTIVO DE FIDEICOMISOS EXTINGUIDOS';
      }
      if (element.conceptopago == 'CONCEPTO2') {
        element.conceptopagoItem = 'COMRA DE DIVISAS';
      }
      if (element.conceptopago == 'CONCEPTO3') {
        element.conceptopagoItem = 'ENTERO DE IMPUESTOS';
      }
      if (element.conceptopago == 'CONCEPTO4') {
        element.conceptopagoItem = 'OTROS PAGOS (CAPITAL)';
      }
      if (element.conceptopago == 'CONCEPTO5') {
        element.conceptopagoItem = 'OTROS PAGOS (RESULTADOS)';
      }
      if (element.conceptopago == 'CONCEPTO6') {
        element.conceptopagoItem = 'PAGO A BENEFICIARIOS (CAPITAL)';
      }
      if (element.conceptopago == 'CONCEPTO7') {
        element.conceptopagoItem = 'RETIRO DEL PATRIMONIO';
      }
      if (element.conceptopago == 'CONCEPTO8') {
        element.conceptopagoItem = 'PAGO DE LIQUIDACIÓN DIARIA';
      }
      if (element.conceptopago == 'CONCEPTO9') {
        element.conceptopagoItem = 'PAGO DE IMPUESTOS Y CONTRIBUCIONES';
      }
      this.subfisoService.getRecuperaSubfisoPorId(element.subfisoId).subscribe(res => {
        this.subfiso = res.json();
        element.subfisoItem = this.subfiso.numero + '';
      });
      if (element.estatusoperacion == 'NORMAL') {
        element.estatusoperacionItem = 'NORMAL';
      }
      if (element.estatusoperacion == 'COTABILIDAD') {
        element.estatusoperacionItem = 'SOLO CONTABLE';
      }
      element.fechaliquidarAux = new Date(element.fechaliquidar);
      if (element.estatus == 'APLI') {
        element.estatusItem = 'APLICADO';
      }
      if (element.estatus == 'APLIPAR') {
        element.estatusItem = 'APLICADO PARCIAL';
      }
      if (element.estatus == 'CANC') {
        element.estatusItem = 'CANCELADO';
      }
      if (element.estatus == 'PROC') {
        element.estatusItem = 'EN PROCESO';
      }
      if (element.estatus == 'PEND') {
        element.estatusItem = 'PENDIENTE';
      }
    });
  }

  setClickedRowEditaPagos(index, pagos) {
    this.pagosService.setPagos(pagos);
    if (this.idPagos === undefined) {
      this.router.navigate(['editar', pagos.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', pagos.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaPagos(index, pagos) {
    this.pagosService.setPagos(pagos);
    if (this.idPagos === undefined) {
      this.router.navigate(['eliminar', pagos.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', pagos.id], { relativeTo: this.route });
    }
  }

  getPagos() {
    if (this.idPagos === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idPagos], { relativeTo: this.route });
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
        this.pagos_create = true;
        this.pagos_delete = true;
        this.pagos_update = true;
        this.pagos_read = true;
      }

      if (element.code == 'PAGOS:UPDATE') {
        this.pagos_update = true;
      }

      if (element.code == 'PAGOS:DELETE') {
        this.pagos_delete = true;
      }

      if (element.code == 'PAGOS:READ') {
        this.pagos_read = true;
      }

      if (element.code == 'PAGOS:CREATE') {
        this.pagos_create = true;
      }

      if (element.code == 'PAGOS:*') {
        this.pagos_update = true;
        this.pagos_create = true;
        this.pagos_delete = true;
        this.pagos_read = true;
      }
    });
  }
}
