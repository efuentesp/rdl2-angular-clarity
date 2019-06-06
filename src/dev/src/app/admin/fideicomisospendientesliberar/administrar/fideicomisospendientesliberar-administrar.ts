/* PSG  Fideicomisospendientesliberar Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Fideicomisospendientesliberar } from '../fideicomisospendientesliberar.psg.model';
import { FideicomisospendientesliberarService } from '../fideicomisospendientesliberar.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-fideicomisospendientesliberar',
  styleUrls: ['../fideicomisospendientesliberar.psg.scss'],
  templateUrl: './fideicomisospendientesliberar-administrar.psg.html',
})
export class FideicomisospendientesliberarAdministrar {
  fideicomisospendientesliberarArray: Fideicomisospendientesliberar[];
  fideicomisospendientesliberar: Fideicomisospendientesliberar;
  idFideicomisospendientesliberar: number;
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

  fideicomisospendientesliberar_update: boolean = false;
  fideicomisospendientesliberar_delete: boolean = false;
  fideicomisospendientesliberar_create: boolean = false;
  fideicomisospendientesliberar_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private fideicomisospendientesliberarService: FideicomisospendientesliberarService
  ) {}

  ngOnInit() {
    console.log('Fideicomisospendientesliberar administrar()');

    this.getUser();
    this.setButtons();
    this.cargaFideicomisospendientesliberar();

    this.route.params.subscribe(params => {
      this.idFideicomisospendientesliberar = params['id'];
    });

    if (this.idFideicomisospendientesliberar !== undefined) {
      this.getRecuperaFideicomisospendientesliberarPorFideicomiso(this.idFideicomisospendientesliberar);
    }
  }

  cargaFideicomisospendientesliberar() {
    this.fideicomisospendientesliberarService.getRecuperaFideicomisospendientesliberar().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.fideicomisospendientesliberarArray = res.json();
            this.llenaCampos(this.fideicomisospendientesliberarArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Fideicomisos Pendientes de Liberar.', 'error');
      }
    );
  }

  getRecuperaFideicomisospendientesliberarPorFideicomiso(id) {
    this.fideicomisospendientesliberarService.getRecuperaFideicomisospendientesliberarPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.fideicomisospendientesliberarArray = res.json();
            this.llenaCampos(this.fideicomisospendientesliberarArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the fideicomisospendientesliberar.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
      if (element.tiponegocio == 'TIPO1') {
        element.tiponegocioItem = 'FIDEICOMISO';
      }
      if (element.tiponegocio == 'TIPO2') {
        element.tiponegocioItem = 'MANDATO';
      }
      if (element.tiponegocio == 'TIPO3') {
        element.tiponegocioItem = 'COMISIÓN MERCANTIL';
      }
      if (element.tiponegocio == 'TIPO4') {
        element.tiponegocioItem = 'DEPÓSITO CONDICIONAL';
      }
      if (element.tiponegocio == 'TIPO5') {
        element.tiponegocioItem = 'REPRESENTACIÓN COMÚN';
      }
      if (element.clasifproducto == 'PROD1') {
        element.clasifproductoItem = 'PLANEACIÓN PATRIMONIAL TESTAMENTARIA';
      }
      if (element.clasifproducto == 'PROD2') {
        element.clasifproductoItem = 'ADMINISTRACIÓN DE RECURSOS';
      }
      if (element.clasifproducto == 'PROD3') {
        element.clasifproductoItem = 'GARANTÍA';
      }
      if (element.clasifproducto == 'PROD4') {
        element.clasifproductoItem = 'FUENTE DE PAGO';
      }
      if (element.clasifproducto == 'PROD5') {
        element.clasifproductoItem = 'ZONA RESTRINGIDA';
      }
      if (element.clasifproducto == 'PROD6') {
        element.clasifproductoItem = 'MANDATO';
      }
      if (element.clasifproducto == 'PROD7') {
        element.clasifproductoItem = 'PENSIONES Y JUBILACIONES';
      }
      if (element.clasifproducto == 'PROD8') {
        element.clasifproductoItem = 'DESARROLLO INMOBILIARIO';
      }
      if (element.clasifproducto == 'PROD9') {
        element.clasifproductoItem = 'INFRAESTRUCTURA';
      }
      if (element.clasifproducto == 'PROD10') {
        element.clasifproductoItem = 'REPRESENTACIÓN COMÚN';
      }
      if (element.clasifproducto == 'PROD11') {
        element.clasifproductoItem = 'DEPÓSITO CONDICIONAL (Escrow)';
      }
      if (element.manejo == 'DISCRESTR') {
        element.manejoItem = 'DISCRECIONAL RESTRINGIDO';
      }
      if (element.manejo == 'NODISCR') {
        element.manejoItem = 'NO DISCRECIONAL';
      }
      if (element.manejo == 'SINMANEJO') {
        element.manejoItem = 'SIN MANEJO DE INVERSION';
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
      if (element.estatus == 'AUTORIZAR') {
        element.estatusItem = 'AUTORIZAR';
      }
    });
  }

  setClickedRowEditaFideicomisospendientesliberar(index, fideicomisospendientesliberar) {
    this.fideicomisospendientesliberarService.setFideicomisospendientesliberar(fideicomisospendientesliberar);
    if (this.idFideicomisospendientesliberar === undefined) {
      this.router.navigate(['editar', fideicomisospendientesliberar.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', fideicomisospendientesliberar.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaFideicomisospendientesliberar(index, fideicomisospendientesliberar) {
    this.fideicomisospendientesliberarService.setFideicomisospendientesliberar(fideicomisospendientesliberar);
    if (this.idFideicomisospendientesliberar === undefined) {
      this.router.navigate(['eliminar', fideicomisospendientesliberar.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', fideicomisospendientesliberar.id], { relativeTo: this.route });
    }
  }

  getFideicomisospendientesliberar() {
    if (this.idFideicomisospendientesliberar === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idFideicomisospendientesliberar], { relativeTo: this.route });
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
        this.fideicomisospendientesliberar_create = true;
        this.fideicomisospendientesliberar_delete = true;
        this.fideicomisospendientesliberar_update = true;
        this.fideicomisospendientesliberar_read = true;
      }

      if (element.code == 'FIDEICOMISOSPENDIENTESLIBERAR:UPDATE') {
        this.fideicomisospendientesliberar_update = true;
      }

      if (element.code == 'FIDEICOMISOSPENDIENTESLIBERAR:DELETE') {
        this.fideicomisospendientesliberar_delete = true;
      }

      if (element.code == 'FIDEICOMISOSPENDIENTESLIBERAR:READ') {
        this.fideicomisospendientesliberar_read = true;
      }

      if (element.code == 'FIDEICOMISOSPENDIENTESLIBERAR:CREATE') {
        this.fideicomisospendientesliberar_create = true;
      }

      if (element.code == 'FIDEICOMISOSPENDIENTESLIBERAR:*') {
        this.fideicomisospendientesliberar_update = true;
        this.fideicomisospendientesliberar_create = true;
        this.fideicomisospendientesliberar_delete = true;
        this.fideicomisospendientesliberar_read = true;
      }
    });
  }
}
