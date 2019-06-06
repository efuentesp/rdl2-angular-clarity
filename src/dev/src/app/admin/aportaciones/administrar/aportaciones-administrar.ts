/* PSG  Aportaciones Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Aportaciones } from '../aportaciones.psg.model';
import { AportacionesService } from '../aportaciones.psg.service';

// Detalles
import { InstruccionService } from '../../instruccion/instruccion.psg.service';
import { Instruccion } from '../../instruccion/instruccion.psg.model';
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-aportaciones',
  styleUrls: ['../aportaciones.psg.scss'],
  templateUrl: './aportaciones-administrar.psg.html',
})
export class AportacionesAdministrar {
  aportacionesArray: Aportaciones[];
  aportaciones: Aportaciones;
  idAportaciones: number;
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

  aportaciones_update: boolean = false;
  aportaciones_delete: boolean = false;
  aportaciones_create: boolean = false;
  aportaciones_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private instruccionService: InstruccionService,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private aportacionesService: AportacionesService
  ) {}

  ngOnInit() {
    console.log('Aportaciones administrar()');

    this.getUser();
    this.setButtons();
    this.cargaAportaciones();

    this.route.params.subscribe(params => {
      this.idAportaciones = params['id'];
    });

    if (this.idAportaciones !== undefined) {
      this.getRecuperaAportacionesPorInstruccion(this.idAportaciones);
    }
    if (this.idAportaciones !== undefined) {
      this.getRecuperaAportacionesPorFideicomiso(this.idAportaciones);
    }
    if (this.idAportaciones !== undefined) {
      this.getRecuperaAportacionesPorSubfiso(this.idAportaciones);
    }
  }

  cargaAportaciones() {
    this.aportacionesService.getRecuperaAportaciones().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.aportacionesArray = res.json();
            this.llenaCampos(this.aportacionesArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Aportaciones.', 'error');
      }
    );
  }

  getRecuperaAportacionesPorInstruccion(id) {
    this.aportacionesService.getRecuperaAportacionesPorInstruccion(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.aportacionesArray = res.json();
            this.llenaCampos(this.aportacionesArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the aportaciones.', 'error');
      }
    );
  }
  getRecuperaAportacionesPorFideicomiso(id) {
    this.aportacionesService.getRecuperaAportacionesPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.aportacionesArray = res.json();
            this.llenaCampos(this.aportacionesArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the aportaciones.', 'error');
      }
    );
  }
  getRecuperaAportacionesPorSubfiso(id) {
    this.aportacionesService.getRecuperaAportacionesPorSubfiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.aportacionesArray = res.json();
            this.llenaCampos(this.aportacionesArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the aportaciones.', 'error');
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
      this.subfisoService.getRecuperaSubfisoPorId(element.subfisoId).subscribe(res => {
        this.subfiso = res.json();
        element.subfisoItem = this.subfiso.numero + '';
      });
      if (element.destinorecepcion == 'DESTINO1') {
        element.destinorecepcionItem = 'APORTACION PATRIMONIAL';
      }
      if (element.destinorecepcion == 'DESTINO2') {
        element.destinorecepcionItem = 'COBROD DE COMISIONES';
      }
      if (element.destinorecepcion == 'DESTINO3') {
        element.destinorecepcionItem = 'COBRO LIQUIDACIÓN AL VENCIMIENTO';
      }
      if (element.destinorecepcion == 'DESTINO4') {
        element.destinorecepcionItem = 'COBRO LIQUIDACIÓN DIARIA';
      }
      if (element.destinorecepcion == 'DESTINO5') {
        element.destinorecepcionItem = 'DEPÓSITOS PARA PAGO DE HONORARIOS';
      }
      if (element.destinorecepcion == 'DESTINO6') {
        element.destinorecepcionItem = 'DEVOLUCIONES POR APLICAR';
      }
      if (element.destinorecepcion == 'DESTINO7') {
        element.destinorecepcionItem = 'DONATIVOS';
      }
      if (element.destinorecepcion == 'DESTINO8') {
        element.destinorecepcionItem = 'POR VENTA DE DIVISAS';
      }
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
      if (element.moneda == 'DLS') {
        element.monedaItem = 'DLS. U.S.A.';
      }
      if (element.moneda == 'EURO') {
        element.monedaItem = 'EUROS';
      }
      if (element.moneda == 'NACIONAL') {
        element.monedaItem = 'MONEDA NACIONAL';
      }
      if (element.formarecepcion == 'RECEPCION1') {
        element.formarecepcionItem = 'CARGO A CUENTA CHEQUES SCOTIABANK';
      }
      if (element.formarecepcion == 'RECEPCION2') {
        element.formarecepcionItem = 'DEPÓSITO CHEQUE SCOTIABAKN';
      }
      if (element.formarecepcion == 'RECEPCION3') {
        element.formarecepcionItem = 'DEPÓSITO POR SPEUA';
      }
      if (element.formarecepcion == 'RECEPCION4') {
        element.formarecepcionItem = 'DEPÓSITO EN SUCURSAL TF EFECTIVO';
      }
      if (element.estatusoperacion == 'NORMAL') {
        element.estatusoperacionItem = 'NORMAL';
      }
      if (element.estatusoperacion == 'COTABILIDAD') {
        element.estatusoperacionItem = 'SOLO CONTABLE';
      }
      if (element.tipopersona == 'FISICA') {
        element.tipopersonaItem = 'FISICA';
      }
      if (element.tipopersona == 'GOBIERNO') {
        element.tipopersonaItem = 'GOBIERNO';
      }
      if (element.tipopersona == 'MORAL') {
        element.tipopersonaItem = 'MORAL';
      }
      element.fechacontabilizacionAux = new Date(element.fechacontabilizacion);
      if (element.origenrecursos == 'ORIGEN1') {
        element.origenrecursosItem = 'APORTACIONES SOLIDARIOS';
      }
      if (element.origenrecursos == 'ORIGEN2') {
        element.origenrecursosItem = 'CLIENTES MEXDER';
      }
      if (element.origenrecursos == 'ORIGEN3') {
        element.origenrecursosItem = 'FIDEICOMITENTE A';
      }
      if (element.origenrecursos == 'ORIGEN4') {
        element.origenrecursosItem = 'GOBIERNO ESTATAL';
      }
      if (element.origenrecursos == 'ORIGEN5') {
        element.origenrecursosItem = 'GOBIERNO FEDERAL';
      }
      if (element.origenrecursos == 'ORIGEN6') {
        element.origenrecursosItem = 'GOBIERNO MUNICIPAL';
      }
      if (element.origenrecursos == 'ORIGEN7') {
        element.origenrecursosItem = 'PARTICULARES';
      }
      if (element.origenrecursos == 'ORIGEN8') {
        element.origenrecursosItem = 'RECURSOS DEL CONTRATO';
      }
    });
  }

  setClickedRowEditaAportaciones(index, aportaciones) {
    this.aportacionesService.setAportaciones(aportaciones);
    if (this.idAportaciones === undefined) {
      this.router.navigate(['editar', aportaciones.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', aportaciones.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaAportaciones(index, aportaciones) {
    this.aportacionesService.setAportaciones(aportaciones);
    if (this.idAportaciones === undefined) {
      this.router.navigate(['eliminar', aportaciones.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', aportaciones.id], { relativeTo: this.route });
    }
  }

  getAportaciones() {
    if (this.idAportaciones === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idAportaciones], { relativeTo: this.route });
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
        this.aportaciones_create = true;
        this.aportaciones_delete = true;
        this.aportaciones_update = true;
        this.aportaciones_read = true;
      }

      if (element.code == 'APORTACIONES:UPDATE') {
        this.aportaciones_update = true;
      }

      if (element.code == 'APORTACIONES:DELETE') {
        this.aportaciones_delete = true;
      }

      if (element.code == 'APORTACIONES:READ') {
        this.aportaciones_read = true;
      }

      if (element.code == 'APORTACIONES:CREATE') {
        this.aportaciones_create = true;
      }

      if (element.code == 'APORTACIONES:*') {
        this.aportaciones_update = true;
        this.aportaciones_create = true;
        this.aportaciones_delete = true;
        this.aportaciones_read = true;
      }
    });
  }
}
