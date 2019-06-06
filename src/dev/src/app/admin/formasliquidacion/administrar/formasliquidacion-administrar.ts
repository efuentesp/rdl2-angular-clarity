/* PSG  Formasliquidacion Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Formasliquidacion } from '../formasliquidacion.psg.model';
import { FormasliquidacionService } from '../formasliquidacion.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-formasliquidacion',
  styleUrls: ['../formasliquidacion.psg.scss'],
  templateUrl: './formasliquidacion-administrar.psg.html',
})
export class FormasliquidacionAdministrar {
  formasliquidacionArray: Formasliquidacion[];
  formasliquidacion: Formasliquidacion;
  idFormasliquidacion: number;
  loading = false;

  public fideicomiso: Fideicomiso;

  // Detalles
  idFideicomiso: number;

  // Modal
  modalfideicomiso: boolean = false;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  formasliquidacion_update: boolean = false;
  formasliquidacion_delete: boolean = false;
  formasliquidacion_create: boolean = false;
  formasliquidacion_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private formasliquidacionService: FormasliquidacionService
  ) {}

  ngOnInit() {
    console.log('Formasliquidacion administrar()');

    this.getUser();
    this.setButtons();
    this.cargaFormasliquidacion();

    this.route.params.subscribe(params => {
      this.idFormasliquidacion = params['id'];
    });

    if (this.idFormasliquidacion !== undefined) {
      this.getRecuperaFormasliquidacionPorFideicomiso(this.idFormasliquidacion);
    }
  }

  cargaFormasliquidacion() {
    this.formasliquidacionService.getRecuperaFormasliquidacion().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.formasliquidacionArray = res.json();
            this.llenaCampos(this.formasliquidacionArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Formas de Liquidación.', 'error');
      }
    );
  }

  getRecuperaFormasliquidacionPorFideicomiso(id) {
    this.formasliquidacionService.getRecuperaFormasliquidacionPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.formasliquidacionArray = res.json();
            this.llenaCampos(this.formasliquidacionArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the formasliquidacion.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
      if (element.tipo == 'FISICA') {
        element.tipoItem = 'FISICA';
      }
      if (element.tipo == 'GOBIERNO') {
        element.tipoItem = 'GOBIERNO';
      }
      if (element.tipo == 'MORAL') {
        element.tipoItem = 'MORAL';
      }
      if (element.formaliquidacion == 'TIPO1') {
        element.formaliquidacionItem = 'ABONO A CUENTA DE CHEQUES SCOTIABANK';
      }
      if (element.formaliquidacion == 'TIPO3') {
        element.formaliquidacionItem = 'ABONO A CUENTA DE CHEQUES SCOTIABANK REFERENCIADA';
      }
      if (element.formaliquidacion == 'TIPO4') {
        element.formaliquidacionItem = 'ABONO A CUENTA DE CHEQUES NOMINA SCOTIABANK';
      }
      if (element.formaliquidacion == 'TIPO5') {
        element.formaliquidacionItem = 'CON GIRO INTERNACIONAL';
      }
      if (element.formaliquidacion == 'TIPO6') {
        element.formaliquidacionItem = 'CON ORDEN DE PAGO INTERNACIONAL';
      }
      if (element.formaliquidacion == 'TIPO7') {
        element.formaliquidacionItem = 'CON ORDEN DE PAGO NACIONAL';
      }
      if (element.formaliquidacion == 'TIPO8') {
        element.formaliquidacionItem = 'EVOLUCIÓN DERECHOS DE COBRO';
      }
      if (element.formaliquidacion == 'TIPO9') {
        element.formaliquidacionItem = 'HIPOTECARIO';
      }
      if (element.formaliquidacion == 'TIPO10') {
        element.formaliquidacionItem = 'PAGO A TRAVES DE CUENTAS CONCENTRADORAS DE FIDUCIARIO';
      }
      if (element.formaliquidacion == 'TIPO11') {
        element.formaliquidacionItem = 'PAGO A TRAVES DE UNA CUENTA CONTABLE OPERATIVA EN LINEA';
      }
      if (element.formaliquidacion == 'TIPO12') {
        element.formaliquidacionItem = 'PAGO CON CHEQUE DE CAJA SCOTIABANK';
      }
      if (element.formaliquidacion == 'TIPO13') {
        element.formaliquidacionItem = 'PAGO CON SPEUA';
      }
      if (element.formaliquidacion == 'TIPO14') {
        element.formaliquidacionItem = 'PAGO POR SIAC';
      }
      if (element.formaliquidacion == 'TIPO16') {
        element.formaliquidacionItem = 'PAGO POR TRANSFERENCIA INTERBANCARIA TARJETA DE DEBITO';
      }
      if (element.formaliquidacion == 'TIPO17') {
        element.formaliquidacionItem = 'PAGO POR TRANSFERENCIA INTERBANCARIA';
      }
      if (element.formaliquidacion == 'TIPO18') {
        element.formaliquidacionItem = 'PAGO TARJETA DE CREDITO';
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
      if (element.plprincipal == 'DLS') {
        element.plprincipalItem = 'DLS. U.S.A.';
      }
      if (element.plprincipal == 'EURO') {
        element.plprincipalItem = 'EUROS';
      }
      if (element.plprincipal == 'NACIONAL') {
        element.plprincipalItem = 'MONEDA NACIONAL';
      }
      if (element.estado == 'ACTIVO') {
        element.estadoItem = 'ACTIVO';
      }
      if (element.estado == 'CANCELADO') {
        element.estadoItem = 'CANCELADO';
      }
      if (element.estado == 'SUSPENDIDO') {
        element.estadoItem = 'SUSPENDIDO';
      }
      if (element.estado == 'BAJA') {
        element.estadoItem = 'BAJA';
      }
    });
  }

  setClickedRowEditaFormasliquidacion(index, formasliquidacion) {
    this.formasliquidacionService.setFormasliquidacion(formasliquidacion);
    if (this.idFormasliquidacion === undefined) {
      this.router.navigate(['editar', formasliquidacion.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', formasliquidacion.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaFormasliquidacion(index, formasliquidacion) {
    this.formasliquidacionService.setFormasliquidacion(formasliquidacion);
    if (this.idFormasliquidacion === undefined) {
      this.router.navigate(['eliminar', formasliquidacion.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', formasliquidacion.id], { relativeTo: this.route });
    }
  }

  getFormasliquidacion() {
    if (this.idFormasliquidacion === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idFormasliquidacion], { relativeTo: this.route });
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
        this.formasliquidacion_create = true;
        this.formasliquidacion_delete = true;
        this.formasliquidacion_update = true;
        this.formasliquidacion_read = true;
      }

      if (element.code == 'FORMASLIQUIDACION:UPDATE') {
        this.formasliquidacion_update = true;
      }

      if (element.code == 'FORMASLIQUIDACION:DELETE') {
        this.formasliquidacion_delete = true;
      }

      if (element.code == 'FORMASLIQUIDACION:READ') {
        this.formasliquidacion_read = true;
      }

      if (element.code == 'FORMASLIQUIDACION:CREATE') {
        this.formasliquidacion_create = true;
      }

      if (element.code == 'FORMASLIQUIDACION:*') {
        this.formasliquidacion_update = true;
        this.formasliquidacion_create = true;
        this.formasliquidacion_delete = true;
        this.formasliquidacion_read = true;
      }
    });
  }
}
