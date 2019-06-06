/* PSG  Carteraadeudo Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Carteraadeudo } from '../carteraadeudo.psg.model';
import { CarteraadeudoService } from '../carteraadeudo.psg.service';

// Detalles
import { HonorarioscontratoService } from '../../honorarioscontrato/honorarioscontrato.psg.service';
import { Honorarioscontrato } from '../../honorarioscontrato/honorarioscontrato.psg.model';

@Component({
  selector: 'clr-carteraadeudo',
  styleUrls: ['../carteraadeudo.psg.scss'],
  templateUrl: './carteraadeudo-administrar.psg.html',
})
export class CarteraadeudoAdministrar {
  carteraadeudoArray: Carteraadeudo[];
  carteraadeudo: Carteraadeudo;
  idCarteraadeudo: number;
  loading = false;

  public honorarioscontrato: Honorarioscontrato;

  // Detalles
  idHonorarioscontrato: number;

  // Modal
  modalhonorarioscontrato: boolean = false;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  carteraadeudo_update: boolean = false;
  carteraadeudo_delete: boolean = false;
  carteraadeudo_create: boolean = false;
  carteraadeudo_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private honorarioscontratoService: HonorarioscontratoService,
    private carteraadeudoService: CarteraadeudoService
  ) {}

  ngOnInit() {
    console.log('Carteraadeudo administrar()');

    this.getUser();
    this.setButtons();
    this.cargaCarteraadeudo();

    this.route.params.subscribe(params => {
      this.idCarteraadeudo = params['id'];
    });

    if (this.idCarteraadeudo !== undefined) {
      this.getRecuperaCarteraadeudoPorHonorarioscontrato(this.idCarteraadeudo);
    }
  }

  cargaCarteraadeudo() {
    this.carteraadeudoService.getRecuperaCarteraadeudo().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.carteraadeudoArray = res.json();
            this.llenaCampos(this.carteraadeudoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Cartera adeudos.', 'error');
      }
    );
  }

  getRecuperaCarteraadeudoPorHonorarioscontrato(id) {
    this.carteraadeudoService.getRecuperaCarteraadeudoPorHonorarioscontrato(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.carteraadeudoArray = res.json();
            this.llenaCampos(this.carteraadeudoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the carteraadeudo.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.honorarioscontratoService.getRecuperaHonorarioscontratoPorId(element.honorarioscontratoId).subscribe(res => {
        this.honorarioscontrato = res.json();
        element.honorarioscontratoItem = this.honorarioscontrato.persona + '';
      });
      if (element.calificacion == 'PENDIENTE') {
        element.calificacionItem = 'PENDIENTE';
      }
      if (element.calificacion == 'PAGADO') {
        element.calificacionItem = 'PAGADO';
      }
      element.fechacalculoAux = new Date(element.fechacalculo);
      element.delAux = new Date(element.del);
      element.alAux = new Date(element.al);
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

  setClickedRowEditaCarteraadeudo(index, carteraadeudo) {
    this.carteraadeudoService.setCarteraadeudo(carteraadeudo);
    if (this.idCarteraadeudo === undefined) {
      this.router.navigate(['editar', carteraadeudo.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', carteraadeudo.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaCarteraadeudo(index, carteraadeudo) {
    this.carteraadeudoService.setCarteraadeudo(carteraadeudo);
    if (this.idCarteraadeudo === undefined) {
      this.router.navigate(['eliminar', carteraadeudo.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', carteraadeudo.id], { relativeTo: this.route });
    }
  }

  getCarteraadeudo() {
    if (this.idCarteraadeudo === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idCarteraadeudo], { relativeTo: this.route });
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
        this.carteraadeudo_create = true;
        this.carteraadeudo_delete = true;
        this.carteraadeudo_update = true;
        this.carteraadeudo_read = true;
      }

      if (element.code == 'CARTERAADEUDO:UPDATE') {
        this.carteraadeudo_update = true;
      }

      if (element.code == 'CARTERAADEUDO:DELETE') {
        this.carteraadeudo_delete = true;
      }

      if (element.code == 'CARTERAADEUDO:READ') {
        this.carteraadeudo_read = true;
      }

      if (element.code == 'CARTERAADEUDO:CREATE') {
        this.carteraadeudo_create = true;
      }

      if (element.code == 'CARTERAADEUDO:*') {
        this.carteraadeudo_update = true;
        this.carteraadeudo_create = true;
        this.carteraadeudo_delete = true;
        this.carteraadeudo_read = true;
      }
    });
  }
}
