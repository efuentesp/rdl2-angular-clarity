/* PSG  Monitoreochekermonerario Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Monitoreochekermonerario } from '../monitoreochekermonerario.psg.model';
import { MonitoreochekermonerarioService } from '../monitoreochekermonerario.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-monitoreochekermonerario',
  styleUrls: ['../monitoreochekermonerario.psg.scss'],
  templateUrl: './monitoreochekermonerario-administrar.psg.html',
})
export class MonitoreochekermonerarioAdministrar {
  monitoreochekermonerarioArray: Monitoreochekermonerario[];
  monitoreochekermonerario: Monitoreochekermonerario;
  idMonitoreochekermonerario: number;
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

  monitoreochekermonerario_update: boolean = false;
  monitoreochekermonerario_delete: boolean = false;
  monitoreochekermonerario_create: boolean = false;
  monitoreochekermonerario_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private monitoreochekermonerarioService: MonitoreochekermonerarioService
  ) {}

  ngOnInit() {
    console.log('Monitoreochekermonerario administrar()');

    this.getUser();
    this.setButtons();
    this.cargaMonitoreochekermonerario();

    this.route.params.subscribe(params => {
      this.idMonitoreochekermonerario = params['id'];
    });

    if (this.idMonitoreochekermonerario !== undefined) {
      this.getRecuperaMonitoreochekermonerarioPorFideicomiso(this.idMonitoreochekermonerario);
    }
    if (this.idMonitoreochekermonerario !== undefined) {
      this.getRecuperaMonitoreochekermonerarioPorSubfiso(this.idMonitoreochekermonerario);
    }
  }

  cargaMonitoreochekermonerario() {
    this.monitoreochekermonerarioService.getRecuperaMonitoreochekermonerario().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.monitoreochekermonerarioArray = res.json();
            this.llenaCampos(this.monitoreochekermonerarioArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Monitoreo de Instrucciones de checker monetario.', 'error');
      }
    );
  }

  getRecuperaMonitoreochekermonerarioPorFideicomiso(id) {
    this.monitoreochekermonerarioService.getRecuperaMonitoreochekermonerarioPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.monitoreochekermonerarioArray = res.json();
            this.llenaCampos(this.monitoreochekermonerarioArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the monitoreochekermonerario.', 'error');
      }
    );
  }
  getRecuperaMonitoreochekermonerarioPorSubfiso(id) {
    this.monitoreochekermonerarioService.getRecuperaMonitoreochekermonerarioPorSubfiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.monitoreochekermonerarioArray = res.json();
            this.llenaCampos(this.monitoreochekermonerarioArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the monitoreochekermonerario.', 'error');
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
      if (element.estatus == 'APLI') {
        element.estatusItem = 'APLICADO';
      }
      if (element.estatus == 'APLIPAR') {
        element.estatusItem = 'APLICADO PARCIAL';
      }
      if (element.estatus == 'CANC') {
        element.estatusItem = 'CANCELADO';
      }
      if (element.estatus == 'PROC') {
        element.estatusItem = 'EN PROCESO';
      }
      if (element.estatus == 'PEND') {
        element.estatusItem = 'PENDIENTE';
      }
    });
  }

  setClickedRowEditaMonitoreochekermonerario(index, monitoreochekermonerario) {
    this.monitoreochekermonerarioService.setMonitoreochekermonerario(monitoreochekermonerario);
    if (this.idMonitoreochekermonerario === undefined) {
      this.router.navigate(['editar', monitoreochekermonerario.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', monitoreochekermonerario.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaMonitoreochekermonerario(index, monitoreochekermonerario) {
    this.monitoreochekermonerarioService.setMonitoreochekermonerario(monitoreochekermonerario);
    if (this.idMonitoreochekermonerario === undefined) {
      this.router.navigate(['eliminar', monitoreochekermonerario.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', monitoreochekermonerario.id], { relativeTo: this.route });
    }
  }

  getMonitoreochekermonerario() {
    if (this.idMonitoreochekermonerario === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idMonitoreochekermonerario], { relativeTo: this.route });
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
        this.monitoreochekermonerario_create = true;
        this.monitoreochekermonerario_delete = true;
        this.monitoreochekermonerario_update = true;
        this.monitoreochekermonerario_read = true;
      }

      if (element.code == 'MONITOREOCHEKERMONERARIO:UPDATE') {
        this.monitoreochekermonerario_update = true;
      }

      if (element.code == 'MONITOREOCHEKERMONERARIO:DELETE') {
        this.monitoreochekermonerario_delete = true;
      }

      if (element.code == 'MONITOREOCHEKERMONERARIO:READ') {
        this.monitoreochekermonerario_read = true;
      }

      if (element.code == 'MONITOREOCHEKERMONERARIO:CREATE') {
        this.monitoreochekermonerario_create = true;
      }

      if (element.code == 'MONITOREOCHEKERMONERARIO:*') {
        this.monitoreochekermonerario_update = true;
        this.monitoreochekermonerario_create = true;
        this.monitoreochekermonerario_delete = true;
        this.monitoreochekermonerario_read = true;
      }
    });
  }
}
