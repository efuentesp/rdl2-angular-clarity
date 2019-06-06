/* PSG  Saldoscuenta Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Saldoscuenta } from '../saldoscuenta.psg.model';
import { SaldoscuentaService } from '../saldoscuenta.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-saldoscuenta',
  styleUrls: ['../saldoscuenta.psg.scss'],
  templateUrl: './saldoscuenta-administrar.psg.html',
})
export class SaldoscuentaAdministrar {
  saldoscuentaArray: Saldoscuenta[];
  saldoscuenta: Saldoscuenta;
  idSaldoscuenta: number;
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

  saldoscuenta_update: boolean = false;
  saldoscuenta_delete: boolean = false;
  saldoscuenta_create: boolean = false;
  saldoscuenta_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private saldoscuentaService: SaldoscuentaService
  ) {}

  ngOnInit() {
    console.log('Saldoscuenta administrar()');

    this.getUser();
    this.setButtons();
    this.cargaSaldoscuenta();

    this.route.params.subscribe(params => {
      this.idSaldoscuenta = params['id'];
    });

    if (this.idSaldoscuenta !== undefined) {
      this.getRecuperaSaldoscuentaPorFideicomiso(this.idSaldoscuenta);
    }
    if (this.idSaldoscuenta !== undefined) {
      this.getRecuperaSaldoscuentaPorSubfiso(this.idSaldoscuenta);
    }
  }

  cargaSaldoscuenta() {
    this.saldoscuentaService.getRecuperaSaldoscuenta().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.saldoscuentaArray = res.json();
            this.llenaCampos(this.saldoscuentaArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Saldos por cuenta.', 'error');
      }
    );
  }

  getRecuperaSaldoscuentaPorFideicomiso(id) {
    this.saldoscuentaService.getRecuperaSaldoscuentaPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.saldoscuentaArray = res.json();
            this.llenaCampos(this.saldoscuentaArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the saldoscuenta.', 'error');
      }
    );
  }
  getRecuperaSaldoscuentaPorSubfiso(id) {
    this.saldoscuentaService.getRecuperaSaldoscuentaPorSubfiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.saldoscuentaArray = res.json();
            this.llenaCampos(this.saldoscuentaArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the saldoscuenta.', 'error');
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

  setClickedRowEditaSaldoscuenta(index, saldoscuenta) {
    this.saldoscuentaService.setSaldoscuenta(saldoscuenta);
    if (this.idSaldoscuenta === undefined) {
      this.router.navigate(['editar', saldoscuenta.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', saldoscuenta.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaSaldoscuenta(index, saldoscuenta) {
    this.saldoscuentaService.setSaldoscuenta(saldoscuenta);
    if (this.idSaldoscuenta === undefined) {
      this.router.navigate(['eliminar', saldoscuenta.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', saldoscuenta.id], { relativeTo: this.route });
    }
  }

  getSaldoscuenta() {
    if (this.idSaldoscuenta === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idSaldoscuenta], { relativeTo: this.route });
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
        this.saldoscuenta_create = true;
        this.saldoscuenta_delete = true;
        this.saldoscuenta_update = true;
        this.saldoscuenta_read = true;
      }

      if (element.code == 'SALDOSCUENTA:UPDATE') {
        this.saldoscuenta_update = true;
      }

      if (element.code == 'SALDOSCUENTA:DELETE') {
        this.saldoscuenta_delete = true;
      }

      if (element.code == 'SALDOSCUENTA:READ') {
        this.saldoscuenta_read = true;
      }

      if (element.code == 'SALDOSCUENTA:CREATE') {
        this.saldoscuenta_create = true;
      }

      if (element.code == 'SALDOSCUENTA:*') {
        this.saldoscuenta_update = true;
        this.saldoscuenta_create = true;
        this.saldoscuenta_delete = true;
        this.saldoscuenta_read = true;
      }
    });
  }
}
