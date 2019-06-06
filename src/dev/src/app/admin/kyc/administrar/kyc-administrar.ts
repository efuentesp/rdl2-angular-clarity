/* PSG  Kyc Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Kyc } from '../kyc.psg.model';
import { KycService } from '../kyc.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-kyc',
  styleUrls: ['../kyc.psg.scss'],
  templateUrl: './kyc-administrar.psg.html',
})
export class KycAdministrar {
  kycArray: Kyc[];
  kyc: Kyc;
  idKyc: number;
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

  kyc_update: boolean = false;
  kyc_delete: boolean = false;
  kyc_create: boolean = false;
  kyc_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private kycService: KycService
  ) {}

  ngOnInit() {
    console.log('Kyc administrar()');

    this.getUser();
    this.setButtons();
    this.cargaKyc();

    this.route.params.subscribe(params => {
      this.idKyc = params['id'];
    });

    if (this.idKyc !== undefined) {
      this.getRecuperaKycPorFideicomiso(this.idKyc);
    }
  }

  cargaKyc() {
    this.kycService.getRecuperaKyc().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.kycArray = res.json();
            this.llenaCampos(this.kycArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Generar KYC.', 'error');
      }
    );
  }

  getRecuperaKycPorFideicomiso(id) {
    this.kycService.getRecuperaKycPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.kycArray = res.json();
            this.llenaCampos(this.kycArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the kyc.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
      if (element.conceptoimpresion == 'CONCEPTO1') {
        element.conceptoimpresionItem = 'ALTA DEL CONTRATO(Promoción Fiduciaria)';
      }
      if (element.conceptoimpresion == 'CONCEPTO2') {
        element.conceptoimpresionItem = 'CALL REPORT(Administración Fiducuario)';
      }
      if (element.conceptoimpresion == 'CONCEPTO3') {
        element.conceptoimpresionItem = 'CAMBIO DE DATOS ADMINISTRATIVOS(Administración Fiduciaria)';
      }
    });
  }

  setClickedRowEditaKyc(index, kyc) {
    this.kycService.setKyc(kyc);
    if (this.idKyc === undefined) {
      this.router.navigate(['editar', kyc.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', kyc.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaKyc(index, kyc) {
    this.kycService.setKyc(kyc);
    if (this.idKyc === undefined) {
      this.router.navigate(['eliminar', kyc.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', kyc.id], { relativeTo: this.route });
    }
  }

  getKyc() {
    if (this.idKyc === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idKyc], { relativeTo: this.route });
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
        this.kyc_create = true;
        this.kyc_delete = true;
        this.kyc_update = true;
        this.kyc_read = true;
      }

      if (element.code == 'KYC:UPDATE') {
        this.kyc_update = true;
      }

      if (element.code == 'KYC:DELETE') {
        this.kyc_delete = true;
      }

      if (element.code == 'KYC:READ') {
        this.kyc_read = true;
      }

      if (element.code == 'KYC:CREATE') {
        this.kyc_create = true;
      }

      if (element.code == 'KYC:*') {
        this.kyc_update = true;
        this.kyc_create = true;
        this.kyc_delete = true;
        this.kyc_read = true;
      }
    });
  }
}
