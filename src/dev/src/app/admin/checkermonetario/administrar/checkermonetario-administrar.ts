/* PSG  Checkermonetario Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Checkermonetario } from '../checkermonetario.psg.model';
import { CheckermonetarioService } from '../checkermonetario.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';
import { InstruccionService } from '../../instruccion/instruccion.psg.service';
import { Instruccion } from '../../instruccion/instruccion.psg.model';
import { TransaccionService } from '../../transaccion/transaccion.psg.service';
import { Transaccion } from '../../transaccion/transaccion.psg.model';

@Component({
  selector: 'clr-checkermonetario',
  styleUrls: ['../checkermonetario.psg.scss'],
  templateUrl: './checkermonetario-administrar.psg.html',
})
export class CheckermonetarioAdministrar {
  checkermonetarioArray: Checkermonetario[];
  checkermonetario: Checkermonetario;
  idCheckermonetario: number;
  loading = false;

  public fideicomiso: Fideicomiso;
  public subfiso: Subfiso;
  public instruccion: Instruccion;
  public transaccion: Transaccion;

  // Detalles
  idFideicomiso: number;
  idSubfiso: number;
  idInstruccion: number;
  idTransaccion: number;

  // Modal
  modalfideicomiso: boolean = false;
  modalsubfiso: boolean = false;
  modalinstruccion: boolean = false;
  modaltransaccion: boolean = false;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  checkermonetario_update: boolean = false;
  checkermonetario_delete: boolean = false;
  checkermonetario_create: boolean = false;
  checkermonetario_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private instruccionService: InstruccionService,
    private transaccionService: TransaccionService,
    private checkermonetarioService: CheckermonetarioService
  ) {}

  ngOnInit() {
    console.log('Checkermonetario administrar()');

    this.getUser();
    this.setButtons();
    this.cargaCheckermonetario();

    this.route.params.subscribe(params => {
      this.idCheckermonetario = params['id'];
    });

    if (this.idCheckermonetario !== undefined) {
      this.getRecuperaCheckermonetarioPorFideicomiso(this.idCheckermonetario);
    }
    if (this.idCheckermonetario !== undefined) {
      this.getRecuperaCheckermonetarioPorSubfiso(this.idCheckermonetario);
    }
    if (this.idCheckermonetario !== undefined) {
      this.getRecuperaCheckermonetarioPorInstruccion(this.idCheckermonetario);
    }
    if (this.idCheckermonetario !== undefined) {
      this.getRecuperaCheckermonetarioPorTransaccion(this.idCheckermonetario);
    }
  }

  cargaCheckermonetario() {
    this.checkermonetarioService.getRecuperaCheckermonetario().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.checkermonetarioArray = res.json();
            this.llenaCampos(this.checkermonetarioArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Monetario.', 'error');
      }
    );
  }

  getRecuperaCheckermonetarioPorFideicomiso(id) {
    this.checkermonetarioService.getRecuperaCheckermonetarioPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.checkermonetarioArray = res.json();
            this.llenaCampos(this.checkermonetarioArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the checkermonetario.', 'error');
      }
    );
  }
  getRecuperaCheckermonetarioPorSubfiso(id) {
    this.checkermonetarioService.getRecuperaCheckermonetarioPorSubfiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.checkermonetarioArray = res.json();
            this.llenaCampos(this.checkermonetarioArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the checkermonetario.', 'error');
      }
    );
  }
  getRecuperaCheckermonetarioPorInstruccion(id) {
    this.checkermonetarioService.getRecuperaCheckermonetarioPorInstruccion(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.checkermonetarioArray = res.json();
            this.llenaCampos(this.checkermonetarioArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the checkermonetario.', 'error');
      }
    );
  }
  getRecuperaCheckermonetarioPorTransaccion(id) {
    this.checkermonetarioService.getRecuperaCheckermonetarioPorTransaccion(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.checkermonetarioArray = res.json();
            this.llenaCampos(this.checkermonetarioArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the checkermonetario.', 'error');
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
      this.instruccionService.getRecuperaInstruccionPorId(element.instruccionId).subscribe(res => {
        this.instruccion = res.json();
        element.instruccionItem = this.instruccion.folio + '';
      });
      this.transaccionService.getRecuperaTransaccionPorId(element.transaccionId).subscribe(res => {
        this.transaccion = res.json();
        element.transaccionItem = this.transaccion.notransaccion + '';
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
    });
  }

  setClickedRowEditaCheckermonetario(index, checkermonetario) {
    this.checkermonetarioService.setCheckermonetario(checkermonetario);
    if (this.idCheckermonetario === undefined) {
      this.router.navigate(['editar', checkermonetario.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', checkermonetario.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaCheckermonetario(index, checkermonetario) {
    this.checkermonetarioService.setCheckermonetario(checkermonetario);
    if (this.idCheckermonetario === undefined) {
      this.router.navigate(['eliminar', checkermonetario.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', checkermonetario.id], { relativeTo: this.route });
    }
  }

  getCheckermonetario() {
    if (this.idCheckermonetario === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idCheckermonetario], { relativeTo: this.route });
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
        this.checkermonetario_create = true;
        this.checkermonetario_delete = true;
        this.checkermonetario_update = true;
        this.checkermonetario_read = true;
      }

      if (element.code == 'CHECKERMONETARIO:UPDATE') {
        this.checkermonetario_update = true;
      }

      if (element.code == 'CHECKERMONETARIO:DELETE') {
        this.checkermonetario_delete = true;
      }

      if (element.code == 'CHECKERMONETARIO:READ') {
        this.checkermonetario_read = true;
      }

      if (element.code == 'CHECKERMONETARIO:CREATE') {
        this.checkermonetario_create = true;
      }

      if (element.code == 'CHECKERMONETARIO:*') {
        this.checkermonetario_update = true;
        this.checkermonetario_create = true;
        this.checkermonetario_delete = true;
        this.checkermonetario_read = true;
      }
    });
  }
}
