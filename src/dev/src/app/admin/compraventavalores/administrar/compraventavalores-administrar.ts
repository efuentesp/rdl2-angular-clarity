/* PSG  Compraventavalores Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Compraventavalores } from '../compraventavalores.psg.model';
import { CompraventavaloresService } from '../compraventavalores.psg.service';

// Detalles
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';
import { ContratoinversionService } from '../../contratoinversion/contratoinversion.psg.service';
import { Contratoinversion } from '../../contratoinversion/contratoinversion.psg.model';
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-compraventavalores',
  styleUrls: ['../compraventavalores.psg.scss'],
  templateUrl: './compraventavalores-administrar.psg.html',
})
export class CompraventavaloresAdministrar {
  compraventavaloresArray: Compraventavalores[];
  compraventavalores: Compraventavalores;
  idCompraventavalores: number;
  loading = false;

  public subfiso: Subfiso;
  public contratoinversion: Contratoinversion;
  public fideicomiso: Fideicomiso;

  // Detalles
  idSubfiso: number;
  idContratoinversion: number;
  idFideicomiso: number;

  // Modal
  modalsubfiso: boolean = false;
  modalcontratoinversion: boolean = false;
  modalfideicomiso: boolean = false;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  compraventavalores_update: boolean = false;
  compraventavalores_delete: boolean = false;
  compraventavalores_create: boolean = false;
  compraventavalores_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subfisoService: SubfisoService,
    private contratoinversionService: ContratoinversionService,
    private fideicomisoService: FideicomisoService,
    private compraventavaloresService: CompraventavaloresService
  ) {}

  ngOnInit() {
    console.log('Compraventavalores administrar()');

    this.getUser();
    this.setButtons();
    this.cargaCompraventavalores();

    this.route.params.subscribe(params => {
      this.idCompraventavalores = params['id'];
    });

    if (this.idCompraventavalores !== undefined) {
      this.getRecuperaCompraventavaloresPorSubfiso(this.idCompraventavalores);
    }
    if (this.idCompraventavalores !== undefined) {
      this.getRecuperaCompraventavaloresPorContratoinversion(this.idCompraventavalores);
    }
    if (this.idCompraventavalores !== undefined) {
      this.getRecuperaCompraventavaloresPorFideicomiso(this.idCompraventavalores);
    }
  }

  cargaCompraventavalores() {
    this.compraventavaloresService.getRecuperaCompraventavalores().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.compraventavaloresArray = res.json();
            this.llenaCampos(this.compraventavaloresArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Solicitud compra - venta de valores.', 'error');
      }
    );
  }

  getRecuperaCompraventavaloresPorSubfiso(id) {
    this.compraventavaloresService.getRecuperaCompraventavaloresPorSubfiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.compraventavaloresArray = res.json();
            this.llenaCampos(this.compraventavaloresArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the compraventavalores.', 'error');
      }
    );
  }
  getRecuperaCompraventavaloresPorContratoinversion(id) {
    this.compraventavaloresService.getRecuperaCompraventavaloresPorContratoinversion(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.compraventavaloresArray = res.json();
            this.llenaCampos(this.compraventavaloresArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the compraventavalores.', 'error');
      }
    );
  }
  getRecuperaCompraventavaloresPorFideicomiso(id) {
    this.compraventavaloresService.getRecuperaCompraventavaloresPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.compraventavaloresArray = res.json();
            this.llenaCampos(this.compraventavaloresArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the compraventavalores.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      element.fechaoperacionAux = new Date(element.fechaoperacion);
      this.subfisoService.getRecuperaSubfisoPorId(element.subfisoId).subscribe(res => {
        this.subfiso = res.json();
        element.subfisoItem = this.subfiso.numero + '';
      });
      this.contratoinversionService.getRecuperaContratoinversionPorId(element.contratoinversionId).subscribe(res => {
        this.contratoinversion = res.json();
        element.contratoinversionItem = this.contratoinversion.contratoiversion + '';
      });
      if (element.operacion == 'COMPRA') {
        element.operacionItem = 'COMPRA';
      }
      if (element.operacion == 'VENTA') {
        element.operacionItem = 'VENTA';
      }
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
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
      if (element.emergente == 'NO') {
        element.emergenteItem = 'NO';
      }
      if (element.emergente == 'SI') {
        element.emergenteItem = 'SI';
      }
    });
  }

  setClickedRowEditaCompraventavalores(index, compraventavalores) {
    this.compraventavaloresService.setCompraventavalores(compraventavalores);
    if (this.idCompraventavalores === undefined) {
      this.router.navigate(['editar', compraventavalores.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', compraventavalores.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaCompraventavalores(index, compraventavalores) {
    this.compraventavaloresService.setCompraventavalores(compraventavalores);
    if (this.idCompraventavalores === undefined) {
      this.router.navigate(['eliminar', compraventavalores.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', compraventavalores.id], { relativeTo: this.route });
    }
  }

  getCompraventavalores() {
    if (this.idCompraventavalores === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idCompraventavalores], { relativeTo: this.route });
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
        this.compraventavalores_create = true;
        this.compraventavalores_delete = true;
        this.compraventavalores_update = true;
        this.compraventavalores_read = true;
      }

      if (element.code == 'COMPRAVENTAVALORES:UPDATE') {
        this.compraventavalores_update = true;
      }

      if (element.code == 'COMPRAVENTAVALORES:DELETE') {
        this.compraventavalores_delete = true;
      }

      if (element.code == 'COMPRAVENTAVALORES:READ') {
        this.compraventavalores_read = true;
      }

      if (element.code == 'COMPRAVENTAVALORES:CREATE') {
        this.compraventavalores_create = true;
      }

      if (element.code == 'COMPRAVENTAVALORES:*') {
        this.compraventavalores_update = true;
        this.compraventavalores_create = true;
        this.compraventavalores_delete = true;
        this.compraventavalores_read = true;
      }
    });
  }
}
