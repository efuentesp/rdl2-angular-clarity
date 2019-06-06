/* PSG  Instruccion Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Instruccion } from '../instruccion.psg.model';
import { InstruccionService } from '../instruccion.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-instruccion',
  styleUrls: ['../instruccion.psg.scss'],
  templateUrl: './instruccion-administrar.psg.html',
})
export class InstruccionAdministrar {
  instruccionArray: Instruccion[];
  instruccion: Instruccion;
  idInstruccion: number;
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

  instruccion_update: boolean = false;
  instruccion_delete: boolean = false;
  instruccion_create: boolean = false;
  instruccion_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private instruccionService: InstruccionService
  ) {}

  ngOnInit() {
    console.log('Instruccion administrar()');

    this.getUser();
    this.setButtons();
    this.cargaInstruccion();

    this.route.params.subscribe(params => {
      this.idInstruccion = params['id'];
    });

    if (this.idInstruccion !== undefined) {
      this.getRecuperaInstruccionPorFideicomiso(this.idInstruccion);
    }
    if (this.idInstruccion !== undefined) {
      this.getRecuperaInstruccionPorSubfiso(this.idInstruccion);
    }
  }

  cargaInstruccion() {
    this.instruccionService.getRecuperaInstruccion().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.instruccionArray = res.json();
            this.llenaCampos(this.instruccionArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Instrucciones.', 'error');
      }
    );
  }

  getRecuperaInstruccionPorFideicomiso(id) {
    this.instruccionService.getRecuperaInstruccionPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.instruccionArray = res.json();
            this.llenaCampos(this.instruccionArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the instruccion.', 'error');
      }
    );
  }
  getRecuperaInstruccionPorSubfiso(id) {
    this.instruccionService.getRecuperaInstruccionPorSubfiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.instruccionArray = res.json();
            this.llenaCampos(this.instruccionArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the instruccion.', 'error');
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
      element.fechadocumetoAux = new Date(element.fechadocumeto);
      if (element.clasificacion == 'NOMON') {
        element.clasificacionItem = 'NO MONETARIAS';
      }
      if (element.clasificacion == 'MON') {
        element.clasificacionItem = 'MONETARIA';
      }
      if (element.clasificacion == 'ADMIN') {
        element.clasificacionItem = 'ADMINISTRATIVAS';
      }
      if (element.personalidadsolicitante == 'BEN') {
        element.personalidadsolicitanteItem = 'BENEFICIARIO';
      }
      if (element.personalidadsolicitante == 'COMITEC') {
        element.personalidadsolicitanteItem = 'COMITÉ TÉCNICO';
      }
      if (element.personalidadsolicitante == 'FIDEICOMITENTES') {
        element.personalidadsolicitanteItem = 'FIDEICOMITENTE(S)';
      }
      if (element.personalidadsolicitante == 'ASESOR') {
        element.personalidadsolicitanteItem = 'ASESOR DE INVERSIONES';
      }
      if (element.personalidadsolicitante == 'REPCOMUN') {
        element.personalidadsolicitanteItem = 'REPRESENTANTE COMÚN';
      }
      element.fechacambioestatusAux = new Date(element.fechacambioestatus);
      if (element.subtipoinstruccion == 'SUB1') {
        element.subtipoinstruccionItem = 'EN EFECTIVO';
      }
      if (element.subtipoinstruccion == 'SUB2') {
        element.subtipoinstruccionItem = 'OPERACIÓN INTERNA FIDUCIARIA';
      }
      if (element.subtipoinstruccion == 'SUB3') {
        element.subtipoinstruccionItem = 'PAGO DE HONORARIOS';
      }
      if (element.subtipoinstruccion == 'SUB4') {
        element.subtipoinstruccionItem = 'POR TRASPASO ENTRE SUBCUENTAS';
      }
      if (element.subtipoinstruccion == 'SUB5') {
        element.subtipoinstruccionItem = 'DE CONTRATOS EN SCOTIABANK';
      }
      if (element.subtipoinstruccion == 'SUB6') {
        element.subtipoinstruccionItem = 'DE CONTRATOS FUERA DE SCOTIABANK';
      }
      element.fechacompromisoAux = new Date(element.fechacompromiso);
      if (element.formarecepcion == 'CARTA') {
        element.formarecepcionItem = 'CARTA ORIGINAL';
      }
      if (element.formarecepcion == 'CORREO') {
        element.formarecepcionItem = 'CORREO ELECTRONICO';
      }
      if (element.formarecepcion == 'INSERTAS') {
        element.formarecepcionItem = 'INSERTAS EN EL CONTRATO';
      }
      if (element.formarecepcion == 'TELEFONICA') {
        element.formarecepcionItem = 'TELEFÓNICA (EXCLUSIVO BANDER)';
      }
      if (element.formarecepcion == 'INTERNET') {
        element.formarecepcionItem = 'INTERNET (EXCLUSIVO AFORE)';
      }
      if (element.estatusinstruccion == 'APLI') {
        element.estatusinstruccionItem = 'APLICADO';
      }
      if (element.estatusinstruccion == 'APLIPAR') {
        element.estatusinstruccionItem = 'APLICADO PARCIAL';
      }
      if (element.estatusinstruccion == 'CANC') {
        element.estatusinstruccionItem = 'CANCELADO';
      }
      if (element.estatusinstruccion == 'PROC') {
        element.estatusinstruccionItem = 'EN PROCESO';
      }
      if (element.estatusinstruccion == 'PEND') {
        element.estatusinstruccionItem = 'PENDIENTE';
      }
      if (element.tipoinstruccion == 'TIPO1') {
        element.tipoinstruccionItem = 'APORTACIONES CON BIENES Y DERECHOS';
      }
      if (element.tipoinstruccion == 'TIPO2') {
        element.tipoinstruccionItem = 'APORTACIONES CON FLUJO DE EFECTIVO';
      }
      if (element.tipoinstruccion == 'TIPO3') {
        element.tipoinstruccionItem = 'APORTACIÓN';
      }
      if (element.tipoinstruccion == 'TIPO4') {
        element.tipoinstruccionItem = 'DESINVERSIONES';
      }
      if (element.tipoinstruccion == 'TIPO5') {
        element.tipoinstruccionItem = 'DISPOSICIONES DE BIENES Y DERECHOS';
      }
      if (element.tipoinstruccion == 'TIPO6') {
        element.tipoinstruccionItem = 'PAGOS';
      }
      if (element.tipoinstruccion == 'TIPO7') {
        element.tipoinstruccionItem = 'PRESTAMOS';
      }
      if (element.tipoinstruccion == 'TIPO8') {
        element.tipoinstruccionItem = 'INVERSIONES';
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
    });
  }

  setClickedRowEditaInstruccion(index, instruccion) {
    this.instruccionService.setInstruccion(instruccion);
    if (this.idInstruccion === undefined) {
      this.router.navigate(['editar', instruccion.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', instruccion.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaInstruccion(index, instruccion) {
    this.instruccionService.setInstruccion(instruccion);
    if (this.idInstruccion === undefined) {
      this.router.navigate(['eliminar', instruccion.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', instruccion.id], { relativeTo: this.route });
    }
  }

  getInstruccion() {
    if (this.idInstruccion === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idInstruccion], { relativeTo: this.route });
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
        this.instruccion_create = true;
        this.instruccion_delete = true;
        this.instruccion_update = true;
        this.instruccion_read = true;
      }

      if (element.code == 'INSTRUCCION:UPDATE') {
        this.instruccion_update = true;
      }

      if (element.code == 'INSTRUCCION:DELETE') {
        this.instruccion_delete = true;
      }

      if (element.code == 'INSTRUCCION:READ') {
        this.instruccion_read = true;
      }

      if (element.code == 'INSTRUCCION:CREATE') {
        this.instruccion_create = true;
      }

      if (element.code == 'INSTRUCCION:*') {
        this.instruccion_update = true;
        this.instruccion_create = true;
        this.instruccion_delete = true;
        this.instruccion_read = true;
      }
    });
  }
}
