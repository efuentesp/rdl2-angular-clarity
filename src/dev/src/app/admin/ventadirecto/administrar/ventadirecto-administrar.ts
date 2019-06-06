/* PSG  Ventadirecto Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Ventadirecto } from '../ventadirecto.psg.model';
import { VentadirectoService } from '../ventadirecto.psg.service';

// Detalles
import { InstruccionService } from '../../instruccion/instruccion.psg.service';
import { Instruccion } from '../../instruccion/instruccion.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { ContratoinversionService } from '../../contratoinversion/contratoinversion.psg.service';
import { Contratoinversion } from '../../contratoinversion/contratoinversion.psg.model';

@Component({
  selector: 'clr-ventadirecto',
  styleUrls: ['../ventadirecto.psg.scss'],
  templateUrl: './ventadirecto-administrar.psg.html',
})
export class VentadirectoAdministrar {
  ventadirectoArray: Ventadirecto[];
  ventadirecto: Ventadirecto;
  idVentadirecto: number;
  loading = false;

  public instruccion: Instruccion;
  public subfiso: Subfiso;
  public fideicomiso: Fideicomiso;
  public contratoinversion: Contratoinversion;

  // Detalles
  idInstruccion: number;
  idSubfiso: number;
  idFideicomiso: number;
  idContratoinversion: number;

  // Modal
  modalinstruccion: boolean = false;
  modalsubfiso: boolean = false;
  modalfideicomiso: boolean = false;
  modalcontratoinversion: boolean = false;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  ventadirecto_update: boolean = false;
  ventadirecto_delete: boolean = false;
  ventadirecto_create: boolean = false;
  ventadirecto_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private instruccionService: InstruccionService,
    private subfisoService: SubfisoService,
    private fideicomisoService: FideicomisoService,
    private contratoinversionService: ContratoinversionService,
    private ventadirectoService: VentadirectoService
  ) {}

  ngOnInit() {
    console.log('Ventadirecto administrar()');

    this.getUser();
    this.setButtons();
    this.cargaVentadirecto();

    this.route.params.subscribe(params => {
      this.idVentadirecto = params['id'];
    });

    if (this.idVentadirecto !== undefined) {
      this.getRecuperaVentadirectoPorInstruccion(this.idVentadirecto);
    }
    if (this.idVentadirecto !== undefined) {
      this.getRecuperaVentadirectoPorSubfiso(this.idVentadirecto);
    }
    if (this.idVentadirecto !== undefined) {
      this.getRecuperaVentadirectoPorFideicomiso(this.idVentadirecto);
    }
    if (this.idVentadirecto !== undefined) {
      this.getRecuperaVentadirectoPorContratoinversion(this.idVentadirecto);
    }
  }

  cargaVentadirecto() {
    this.ventadirectoService.getRecuperaVentadirecto().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.ventadirectoArray = res.json();
            this.llenaCampos(this.ventadirectoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Instrucción de venta de valores.', 'error');
      }
    );
  }

  getRecuperaVentadirectoPorInstruccion(id) {
    this.ventadirectoService.getRecuperaVentadirectoPorInstruccion(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.ventadirectoArray = res.json();
            this.llenaCampos(this.ventadirectoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the ventadirecto.', 'error');
      }
    );
  }
  getRecuperaVentadirectoPorSubfiso(id) {
    this.ventadirectoService.getRecuperaVentadirectoPorSubfiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.ventadirectoArray = res.json();
            this.llenaCampos(this.ventadirectoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the ventadirecto.', 'error');
      }
    );
  }
  getRecuperaVentadirectoPorFideicomiso(id) {
    this.ventadirectoService.getRecuperaVentadirectoPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.ventadirectoArray = res.json();
            this.llenaCampos(this.ventadirectoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the ventadirecto.', 'error');
      }
    );
  }
  getRecuperaVentadirectoPorContratoinversion(id) {
    this.ventadirectoService.getRecuperaVentadirectoPorContratoinversion(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.ventadirectoArray = res.json();
            this.llenaCampos(this.ventadirectoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the ventadirecto.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.instruccionService.getRecuperaInstruccionPorId(element.instruccionId).subscribe(res => {
        this.instruccion = res.json();
        element.instruccionItem = this.instruccion.folio + '';
      });
      if (element.titulosgarantia == 'NO') {
        element.titulosgarantiaItem = 'NO';
      }
      if (element.titulosgarantia == 'SI') {
        element.titulosgarantiaItem = 'SI';
      }
      this.subfisoService.getRecuperaSubfisoPorId(element.subfisoId).subscribe(res => {
        this.subfiso = res.json();
        element.subfisoItem = this.subfiso.numero + '';
      });
      if (element.operacionfutura == 'NO') {
        element.operacionfuturaItem = 'NO';
      }
      if (element.operacionfutura == 'SI') {
        element.operacionfuturaItem = 'SI';
      }
      element.fechaoperacionAux = new Date(element.fechaoperacion);
      if (element.activos == 'AUMENTO') {
        element.activosItem = 'Aumento de activos';
      }
      if (element.activos == 'DISMINUCION') {
        element.activosItem = 'Disminución de activos';
      }
      if (element.mercado == 'MERCADO1') {
        element.mercadoItem = 'MERCADO BANCARIO';
      }
      if (element.mercado == 'MERCADO2') {
        element.mercadoItem = 'MERCADO DE CAPITALES';
      }
      if (element.mercado == 'MERCADO3') {
        element.mercadoItem = 'MERCADO DE DERIVADOS';
      }
      if (element.mercado == 'MERCADO4') {
        element.mercadoItem = 'MERCADO DE DINERO';
      }
      if (element.mercado == 'MERCADO5') {
        element.mercadoItem = 'MERCADO DESCONOCIDO';
      }
      if (element.mercado == 'MERCADO6') {
        element.mercadoItem = 'SOCIEDADES DE INVERSIÓN';
      }
      if (element.mercado == 'MERCADO7') {
        element.mercadoItem = 'INVERSIONES POR LIQUIDAR';
      }
      if (element.instrumento == 'INST1') {
        element.instrumentoItem = 'INVERSIÓN GLOBAL';
      }
      if (element.instrumento == 'INST2') {
        element.instrumentoItem = 'DEPÓSITO A LA VISTA';
      }
      if (element.instrumento == 'INST3') {
        element.instrumentoItem = 'INVERSIÓN GLOBAL EN INST. FINANCIERAS DEL PAÍS';
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
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
      this.contratoinversionService.getRecuperaContratoinversionPorId(element.contratoinversionId).subscribe(res => {
        this.contratoinversion = res.json();
        element.contratoinversionItem = this.contratoinversion.contratoiversion + '';
      });
      if (element.emisiones == 'EMISIONES1') {
        element.emisionesItem = 'INV GLOBAL 0 0';
      }
      if (element.emisiones == 'EMISIONES2') {
        element.emisionesItem = '1 1 0';
      }
      if (element.emisiones == 'EMISIONES3') {
        element.emisionesItem = 'CHEQUES GL 0 0';
      }
      if (element.emisiones == 'EMISIONES4') {
        element.emisionesItem = '53 1 0';
      }
    });
  }

  setClickedRowEditaVentadirecto(index, ventadirecto) {
    this.ventadirectoService.setVentadirecto(ventadirecto);
    if (this.idVentadirecto === undefined) {
      this.router.navigate(['editar', ventadirecto.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', ventadirecto.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaVentadirecto(index, ventadirecto) {
    this.ventadirectoService.setVentadirecto(ventadirecto);
    if (this.idVentadirecto === undefined) {
      this.router.navigate(['eliminar', ventadirecto.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', ventadirecto.id], { relativeTo: this.route });
    }
  }

  getVentadirecto() {
    if (this.idVentadirecto === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idVentadirecto], { relativeTo: this.route });
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
        this.ventadirecto_create = true;
        this.ventadirecto_delete = true;
        this.ventadirecto_update = true;
        this.ventadirecto_read = true;
      }

      if (element.code == 'VENTADIRECTO:UPDATE') {
        this.ventadirecto_update = true;
      }

      if (element.code == 'VENTADIRECTO:DELETE') {
        this.ventadirecto_delete = true;
      }

      if (element.code == 'VENTADIRECTO:READ') {
        this.ventadirecto_read = true;
      }

      if (element.code == 'VENTADIRECTO:CREATE') {
        this.ventadirecto_create = true;
      }

      if (element.code == 'VENTADIRECTO:*') {
        this.ventadirecto_update = true;
        this.ventadirecto_create = true;
        this.ventadirecto_delete = true;
        this.ventadirecto_read = true;
      }
    });
  }
}
