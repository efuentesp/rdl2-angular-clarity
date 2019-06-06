/* PSG  Tercero Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Tercero } from '../tercero.psg.model';
import { TerceroService } from '../tercero.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-tercero',
  styleUrls: ['../tercero.psg.scss'],
  templateUrl: './tercero-administrar.psg.html',
})
export class TerceroAdministrar {
  terceroArray: Tercero[];
  tercero: Tercero;
  idTercero: number;
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

  tercero_update: boolean = false;
  tercero_delete: boolean = false;
  tercero_create: boolean = false;
  tercero_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private terceroService: TerceroService
  ) {}

  ngOnInit() {
    console.log('Tercero administrar()');

    this.getUser();
    this.setButtons();
    this.cargaTercero();

    this.route.params.subscribe(params => {
      this.idTercero = params['id'];
    });

    if (this.idTercero !== undefined) {
      this.getRecuperaTerceroPorFideicomiso(this.idTercero);
    }
  }

  cargaTercero() {
    this.terceroService.getRecuperaTercero().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.terceroArray = res.json();
            this.llenaCampos(this.terceroArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Tercero.', 'error');
      }
    );
  }

  getRecuperaTerceroPorFideicomiso(id) {
    this.terceroService.getRecuperaTerceroPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.terceroArray = res.json();
            this.llenaCampos(this.terceroArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the tercero.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
      if (element.nacionalidad == 'MEXICANO') {
        element.nacionalidadItem = 'MEXICANO';
      }
      if (element.nacionalidad == 'NORTAM') {
        element.nacionalidadItem = 'ESTADOUNIDENSE';
      }
      if (element.actividadeconomica == 'DESC') {
        element.actividadeconomicaItem = 'INGENIERO';
      }
      if (element.actividadeconomica == 'INM') {
        element.actividadeconomicaItem = 'AGENTES INMOBILIARIOS';
      }
      if (element.actividadeconomica == 'ARQ') {
        element.actividadeconomicaItem = 'ARQUITECTO';
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
      element.fechaverfircosoftAux = new Date(element.fechaverfircosoft);
      if (element.tipopersona == 'FISICA') {
        element.tipopersonaItem = 'FISICA';
      }
      if (element.tipopersona == 'GOBIERNO') {
        element.tipopersonaItem = 'GOBIERNO';
      }
      if (element.tipopersona == 'MORAL') {
        element.tipopersonaItem = 'MORAL';
      }
      if (element.calidamigratoria == 'EXRANJERA') {
        element.calidamigratoriaItem = 'EXRANJERA';
      }
      if (element.calidamigratoria == 'INDISTINTA') {
        element.calidamigratoriaItem = 'INDISTINTA';
      }
      if (element.calidamigratoria == 'INMIGRANTE') {
        element.calidamigratoriaItem = 'INMIGRANTE';
      }
      if (element.calidamigratoria == 'INMIGRADO') {
        element.calidamigratoriaItem = 'INMIGRADO';
      }
      if (element.calidamigratoria == 'NACIONAL') {
        element.calidamigratoriaItem = 'NACIONAL';
      }
    });
  }

  setClickedRowEditaTercero(index, tercero) {
    this.terceroService.setTercero(tercero);
    if (this.idTercero === undefined) {
      this.router.navigate(['editar', tercero.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', tercero.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaTercero(index, tercero) {
    this.terceroService.setTercero(tercero);
    if (this.idTercero === undefined) {
      this.router.navigate(['eliminar', tercero.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', tercero.id], { relativeTo: this.route });
    }
  }

  getTercero() {
    if (this.idTercero === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idTercero], { relativeTo: this.route });
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
        this.tercero_create = true;
        this.tercero_delete = true;
        this.tercero_update = true;
        this.tercero_read = true;
      }

      if (element.code == 'TERCERO:UPDATE') {
        this.tercero_update = true;
      }

      if (element.code == 'TERCERO:DELETE') {
        this.tercero_delete = true;
      }

      if (element.code == 'TERCERO:READ') {
        this.tercero_read = true;
      }

      if (element.code == 'TERCERO:CREATE') {
        this.tercero_create = true;
      }

      if (element.code == 'TERCERO:*') {
        this.tercero_update = true;
        this.tercero_create = true;
        this.tercero_delete = true;
        this.tercero_read = true;
      }
    });
  }
}
