/* PSG  Honorarioscontrato Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Honorarioscontrato } from '../honorarioscontrato.psg.model';
import { HonorarioscontratoService } from '../honorarioscontrato.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-honorarioscontrato',
  styleUrls: ['../honorarioscontrato.psg.scss'],
  templateUrl: './honorarioscontrato-administrar.psg.html',
})
export class HonorarioscontratoAdministrar {
  honorarioscontratoArray: Honorarioscontrato[];
  honorarioscontrato: Honorarioscontrato;
  idHonorarioscontrato: number;
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

  honorarioscontrato_update: boolean = false;
  honorarioscontrato_delete: boolean = false;
  honorarioscontrato_create: boolean = false;
  honorarioscontrato_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private honorarioscontratoService: HonorarioscontratoService
  ) {}

  ngOnInit() {
    console.log('Honorarioscontrato administrar()');

    this.getUser();
    this.setButtons();
    this.cargaHonorarioscontrato();

    this.route.params.subscribe(params => {
      this.idHonorarioscontrato = params['id'];
    });

    if (this.idHonorarioscontrato !== undefined) {
      this.getRecuperaHonorarioscontratoPorFideicomiso(this.idHonorarioscontrato);
    }
    if (this.idHonorarioscontrato !== undefined) {
      this.getRecuperaHonorarioscontratoPorSubfiso(this.idHonorarioscontrato);
    }
  }

  cargaHonorarioscontrato() {
    this.honorarioscontratoService.getRecuperaHonorarioscontrato().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.honorarioscontratoArray = res.json();
            this.llenaCampos(this.honorarioscontratoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Cartera honorarios por contrato.', 'error');
      }
    );
  }

  getRecuperaHonorarioscontratoPorFideicomiso(id) {
    this.honorarioscontratoService.getRecuperaHonorarioscontratoPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.honorarioscontratoArray = res.json();
            this.llenaCampos(this.honorarioscontratoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the honorarioscontrato.', 'error');
      }
    );
  }
  getRecuperaHonorarioscontratoPorSubfiso(id) {
    this.honorarioscontratoService.getRecuperaHonorarioscontratoPorSubfiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.honorarioscontratoArray = res.json();
            this.llenaCampos(this.honorarioscontratoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the honorarioscontrato.', 'error');
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
    });
  }

  setClickedRowEditaHonorarioscontrato(index, honorarioscontrato) {
    this.honorarioscontratoService.setHonorarioscontrato(honorarioscontrato);
    if (this.idHonorarioscontrato === undefined) {
      this.router.navigate(['editar', honorarioscontrato.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', honorarioscontrato.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaHonorarioscontrato(index, honorarioscontrato) {
    this.honorarioscontratoService.setHonorarioscontrato(honorarioscontrato);
    if (this.idHonorarioscontrato === undefined) {
      this.router.navigate(['eliminar', honorarioscontrato.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', honorarioscontrato.id], { relativeTo: this.route });
    }
  }

  getHonorarioscontrato() {
    if (this.idHonorarioscontrato === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idHonorarioscontrato], { relativeTo: this.route });
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
        this.honorarioscontrato_create = true;
        this.honorarioscontrato_delete = true;
        this.honorarioscontrato_update = true;
        this.honorarioscontrato_read = true;
      }

      if (element.code == 'HONORARIOSCONTRATO:UPDATE') {
        this.honorarioscontrato_update = true;
      }

      if (element.code == 'HONORARIOSCONTRATO:DELETE') {
        this.honorarioscontrato_delete = true;
      }

      if (element.code == 'HONORARIOSCONTRATO:READ') {
        this.honorarioscontrato_read = true;
      }

      if (element.code == 'HONORARIOSCONTRATO:CREATE') {
        this.honorarioscontrato_create = true;
      }

      if (element.code == 'HONORARIOSCONTRATO:*') {
        this.honorarioscontrato_update = true;
        this.honorarioscontrato_create = true;
        this.honorarioscontrato_delete = true;
        this.honorarioscontrato_read = true;
      }
    });
  }
}
