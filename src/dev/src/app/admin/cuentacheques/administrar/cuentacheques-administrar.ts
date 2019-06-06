/* PSG  Cuentacheques Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Cuentacheques } from '../cuentacheques.psg.model';
import { CuentachequesService } from '../cuentacheques.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { FideicomitenteService } from '../../fideicomitente/fideicomitente.psg.service';
import { Fideicomitente } from '../../fideicomitente/fideicomitente.psg.model';

@Component({
  selector: 'clr-cuentacheques',
  styleUrls: ['../cuentacheques.psg.scss'],
  templateUrl: './cuentacheques-administrar.psg.html',
})
export class CuentachequesAdministrar {
  cuentachequesArray: Cuentacheques[];
  cuentacheques: Cuentacheques;
  idCuentacheques: number;
  loading = false;

  public fideicomiso: Fideicomiso;
  public fideicomitente: Fideicomitente;

  // Detalles
  idFideicomiso: number;
  idFideicomitente: number;

  // Modal
  modalfideicomiso: boolean = false;
  modalfideicomitente: boolean = false;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  cuentacheques_update: boolean = false;
  cuentacheques_delete: boolean = false;
  cuentacheques_create: boolean = false;
  cuentacheques_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private fideicomitenteService: FideicomitenteService,
    private cuentachequesService: CuentachequesService
  ) {}

  ngOnInit() {
    console.log('Cuentacheques administrar()');

    this.getUser();
    this.setButtons();
    this.cargaCuentacheques();

    this.route.params.subscribe(params => {
      this.idCuentacheques = params['id'];
    });

    if (this.idCuentacheques !== undefined) {
      this.getRecuperaCuentachequesPorFideicomiso(this.idCuentacheques);
    }
    if (this.idCuentacheques !== undefined) {
      this.getRecuperaCuentachequesPorFideicomitente(this.idCuentacheques);
    }
  }

  cargaCuentacheques() {
    this.cuentachequesService.getRecuperaCuentacheques().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.cuentachequesArray = res.json();
            this.llenaCampos(this.cuentachequesArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Cuenta de cheques.', 'error');
      }
    );
  }

  getRecuperaCuentachequesPorFideicomiso(id) {
    this.cuentachequesService.getRecuperaCuentachequesPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.cuentachequesArray = res.json();
            this.llenaCampos(this.cuentachequesArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the cuentacheques.', 'error');
      }
    );
  }
  getRecuperaCuentachequesPorFideicomitente(id) {
    this.cuentachequesService.getRecuperaCuentachequesPorFideicomitente(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.cuentachequesArray = res.json();
            this.llenaCampos(this.cuentachequesArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the cuentacheques.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
      if (element.tipopersona == 'FISICA') {
        element.tipopersonaItem = 'FISICA';
      }
      if (element.tipopersona == 'GOBIERNO') {
        element.tipopersonaItem = 'GOBIERNO';
      }
      if (element.tipopersona == 'MORAL') {
        element.tipopersonaItem = 'MORAL';
      }
      this.fideicomitenteService.getRecuperaFideicomitentePorId(element.fideicomitenteId).subscribe(res => {
        this.fideicomitente = res.json();
        element.fideicomitenteItem = this.fideicomitente.numerofideicomitente + '';
      });
      if (element.tipocuenta == 'SPEUA') {
        element.tipocuentaItem = 'SPEUA';
      }
      if (element.tipocuenta == 'CHEQUES') {
        element.tipocuentaItem = 'CUENTA DE CHEQUES SCOTIABANK';
      }
      if (element.tipocuenta == 'CIE') {
        element.tipocuentaItem = 'CONVENIO CIE';
      }
      if (element.tipocuenta == 'TRANS') {
        element.tipocuentaItem = 'TRANSFERENCIA INTERBANCARIA';
      }
      if (element.tipocuenta == 'TARJETACRED') {
        element.tipocuentaItem = 'TARJETA DE CREDITO';
      }
      if (element.tipopago == 'TIPOPAGO1') {
        element.tipopagoItem = 'BANCO A BANCO';
      }
      if (element.tipopago == 'TIPOPAGO2') {
        element.tipopagoItem = 'BANCO A TERCEROS FIDEICOMISOS NORMALES';
      }
      if (element.tipopago == 'TIPOPAGO3') {
        element.tipopagoItem = 'BANCO A TERCEROS MEXDER';
      }
      if (element.tipopago == 'TIPOPAGO4') {
        element.tipopagoItem = 'BANCO A TERCEROS VOSTRO';
      }
      if (element.bancospei == 'INTERMEDIARIO2') {
        element.bancospeiItem = 'BANCO INBURSA S.A.';
      }
      if (element.bancospei == 'INTERMEDIARIO3') {
        element.bancospeiItem = 'BANSI, S.A.';
      }
      if (element.bancospei == 'INTERMEDIARIO4') {
        element.bancospeiItem = 'BANAMEX, S.A.';
      }
      if (element.bancospei == 'INTERMEDIARIO5') {
        element.bancospeiItem = 'HSBC MEXICO S.A.';
      }
      if (element.banco == 'INVERLAT') {
        element.bancoItem = 'SCOTIABANK INVERLAT, S.A.';
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
      if (element.clavevostro == 'CLAVE1') {
        element.clavevostroItem = 'CLAVE VOSTRO 1';
      }
      if (element.clavevostro == 'CLAVE2') {
        element.clavevostroItem = 'CLAVE VOSTRO 2';
      }
      if (element.clavevostro == 'CLAVE3') {
        element.clavevostroItem = 'CLAVE VOSTRO 3';
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
      if (element.cuentachequera == 'NO') {
        element.cuentachequeraItem = 'NO';
      }
      if (element.cuentachequera == 'SI') {
        element.cuentachequeraItem = 'SI';
      }
      if (element.autorizacion == 'CARGOS') {
        element.autorizacionItem = 'CARGOS';
      }
      if (element.autorizacion == 'ABONOS') {
        element.autorizacionItem = 'ABONOS';
      }
      if (element.autorizacion == 'AMBOS') {
        element.autorizacionItem = 'AMBOS';
      }
    });
  }

  setClickedRowEditaCuentacheques(index, cuentacheques) {
    this.cuentachequesService.setCuentacheques(cuentacheques);
    if (this.idCuentacheques === undefined) {
      this.router.navigate(['editar', cuentacheques.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', cuentacheques.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaCuentacheques(index, cuentacheques) {
    this.cuentachequesService.setCuentacheques(cuentacheques);
    if (this.idCuentacheques === undefined) {
      this.router.navigate(['eliminar', cuentacheques.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', cuentacheques.id], { relativeTo: this.route });
    }
  }

  getCuentacheques() {
    if (this.idCuentacheques === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idCuentacheques], { relativeTo: this.route });
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
        this.cuentacheques_create = true;
        this.cuentacheques_delete = true;
        this.cuentacheques_update = true;
        this.cuentacheques_read = true;
      }

      if (element.code == 'CUENTACHEQUES:UPDATE') {
        this.cuentacheques_update = true;
      }

      if (element.code == 'CUENTACHEQUES:DELETE') {
        this.cuentacheques_delete = true;
      }

      if (element.code == 'CUENTACHEQUES:READ') {
        this.cuentacheques_read = true;
      }

      if (element.code == 'CUENTACHEQUES:CREATE') {
        this.cuentacheques_create = true;
      }

      if (element.code == 'CUENTACHEQUES:*') {
        this.cuentacheques_update = true;
        this.cuentacheques_create = true;
        this.cuentacheques_delete = true;
        this.cuentacheques_read = true;
      }
    });
  }
}
