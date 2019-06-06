/* PSG  Aplicacionpagoscontrolados Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Aplicacionpagoscontrolados } from '../aplicacionpagoscontrolados.psg.model';
import { AplicacionpagoscontroladosService } from '../aplicacionpagoscontrolados.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-aplicacionpagoscontrolados',
  styleUrls: ['../aplicacionpagoscontrolados.psg.scss'],
  templateUrl: './aplicacionpagoscontrolados-administrar.psg.html',
})
export class AplicacionpagoscontroladosAdministrar {
  aplicacionpagoscontroladosArray: Aplicacionpagoscontrolados[];
  aplicacionpagoscontrolados: Aplicacionpagoscontrolados;
  idAplicacionpagoscontrolados: number;
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

  aplicacionpagoscontrolados_update: boolean = false;
  aplicacionpagoscontrolados_delete: boolean = false;
  aplicacionpagoscontrolados_create: boolean = false;
  aplicacionpagoscontrolados_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private aplicacionpagoscontroladosService: AplicacionpagoscontroladosService
  ) {}

  ngOnInit() {
    console.log('Aplicacionpagoscontrolados administrar()');

    this.getUser();
    this.setButtons();
    this.cargaAplicacionpagoscontrolados();

    this.route.params.subscribe(params => {
      this.idAplicacionpagoscontrolados = params['id'];
    });

    if (this.idAplicacionpagoscontrolados !== undefined) {
      this.getRecuperaAplicacionpagoscontroladosPorFideicomiso(this.idAplicacionpagoscontrolados);
    }
    if (this.idAplicacionpagoscontrolados !== undefined) {
      this.getRecuperaAplicacionpagoscontroladosPorSubfiso(this.idAplicacionpagoscontrolados);
    }
  }

  cargaAplicacionpagoscontrolados() {
    this.aplicacionpagoscontroladosService.getRecuperaAplicacionpagoscontrolados().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.aplicacionpagoscontroladosArray = res.json();
            this.llenaCampos(this.aplicacionpagoscontroladosArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Aplicación de pagos controlados.', 'error');
      }
    );
  }

  getRecuperaAplicacionpagoscontroladosPorFideicomiso(id) {
    this.aplicacionpagoscontroladosService.getRecuperaAplicacionpagoscontroladosPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.aplicacionpagoscontroladosArray = res.json();
            this.llenaCampos(this.aplicacionpagoscontroladosArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the aplicacionpagoscontrolados.', 'error');
      }
    );
  }
  getRecuperaAplicacionpagoscontroladosPorSubfiso(id) {
    this.aplicacionpagoscontroladosService.getRecuperaAplicacionpagoscontroladosPorSubfiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.aplicacionpagoscontroladosArray = res.json();
            this.llenaCampos(this.aplicacionpagoscontroladosArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the aplicacionpagoscontrolados.', 'error');
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
      if (element.formapago == 'PAGO1') {
        element.formapagoItem = 'CARGO A CUENTA DE CHEQUES';
      }
      if (element.formapago == 'PAGO2') {
        element.formapagoItem = 'CARGO A OTRO CONTRATO';
      }
      if (element.formapago == 'PAGO3') {
        element.formapagoItem = 'CARGO A TARJETA DE CREDITO';
      }
      if (element.formapago == 'PAGO4') {
        element.formapagoItem = 'CARGO AL CONTRATO';
      }
      if (element.formapago == 'PAGO5') {
        element.formapagoItem = 'VIA GESTIÓN';
      }
      if (element.formapago == 'PAGO6') {
        element.formapagoItem = 'TERMINAL FINANCIERO';
      }
      if (element.tipocomision == 'COMISION') {
        element.tipocomisionItem = 'HONORARIOS POR ADMINISTRACIÓN';
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

  setClickedRowEditaAplicacionpagoscontrolados(index, aplicacionpagoscontrolados) {
    this.aplicacionpagoscontroladosService.setAplicacionpagoscontrolados(aplicacionpagoscontrolados);
    if (this.idAplicacionpagoscontrolados === undefined) {
      this.router.navigate(['editar', aplicacionpagoscontrolados.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', aplicacionpagoscontrolados.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaAplicacionpagoscontrolados(index, aplicacionpagoscontrolados) {
    this.aplicacionpagoscontroladosService.setAplicacionpagoscontrolados(aplicacionpagoscontrolados);
    if (this.idAplicacionpagoscontrolados === undefined) {
      this.router.navigate(['eliminar', aplicacionpagoscontrolados.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', aplicacionpagoscontrolados.id], { relativeTo: this.route });
    }
  }

  getAplicacionpagoscontrolados() {
    if (this.idAplicacionpagoscontrolados === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idAplicacionpagoscontrolados], { relativeTo: this.route });
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
        this.aplicacionpagoscontrolados_create = true;
        this.aplicacionpagoscontrolados_delete = true;
        this.aplicacionpagoscontrolados_update = true;
        this.aplicacionpagoscontrolados_read = true;
      }

      if (element.code == 'APLICACIONPAGOSCONTROLADOS:UPDATE') {
        this.aplicacionpagoscontrolados_update = true;
      }

      if (element.code == 'APLICACIONPAGOSCONTROLADOS:DELETE') {
        this.aplicacionpagoscontrolados_delete = true;
      }

      if (element.code == 'APLICACIONPAGOSCONTROLADOS:READ') {
        this.aplicacionpagoscontrolados_read = true;
      }

      if (element.code == 'APLICACIONPAGOSCONTROLADOS:CREATE') {
        this.aplicacionpagoscontrolados_create = true;
      }

      if (element.code == 'APLICACIONPAGOSCONTROLADOS:*') {
        this.aplicacionpagoscontrolados_update = true;
        this.aplicacionpagoscontrolados_create = true;
        this.aplicacionpagoscontrolados_delete = true;
        this.aplicacionpagoscontrolados_read = true;
      }
    });
  }
}
