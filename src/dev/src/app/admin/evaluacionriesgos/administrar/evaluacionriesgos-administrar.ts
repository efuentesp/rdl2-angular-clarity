/* PSG  Evaluacionriesgos Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Evaluacionriesgos } from '../evaluacionriesgos.psg.model';
import { EvaluacionriesgosService } from '../evaluacionriesgos.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-evaluacionriesgos',
  styleUrls: ['../evaluacionriesgos.psg.scss'],
  templateUrl: './evaluacionriesgos-administrar.psg.html',
})
export class EvaluacionriesgosAdministrar {
  evaluacionriesgosArray: Evaluacionriesgos[];
  evaluacionriesgos: Evaluacionriesgos;
  idEvaluacionriesgos: number;
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

  evaluacionriesgos_update: boolean = false;
  evaluacionriesgos_delete: boolean = false;
  evaluacionriesgos_create: boolean = false;
  evaluacionriesgos_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private evaluacionriesgosService: EvaluacionriesgosService
  ) {}

  ngOnInit() {
    console.log('Evaluacionriesgos administrar()');

    this.getUser();
    this.setButtons();
    this.cargaEvaluacionriesgos();

    this.route.params.subscribe(params => {
      this.idEvaluacionriesgos = params['id'];
    });

    if (this.idEvaluacionriesgos !== undefined) {
      this.getRecuperaEvaluacionriesgosPorFideicomiso(this.idEvaluacionriesgos);
    }
  }

  cargaEvaluacionriesgos() {
    this.evaluacionriesgosService.getRecuperaEvaluacionriesgos().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.evaluacionriesgosArray = res.json();
            this.llenaCampos(this.evaluacionriesgosArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Resultados de la Evaluación de Riesgos.', 'error');
      }
    );
  }

  getRecuperaEvaluacionriesgosPorFideicomiso(id) {
    this.evaluacionriesgosService.getRecuperaEvaluacionriesgosPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.evaluacionriesgosArray = res.json();
            this.llenaCampos(this.evaluacionriesgosArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the evaluacionriesgos.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
      if (element.cliente == 'ALTO') {
        element.clienteItem = 'Alto';
      }
      if (element.cliente == 'MEDIO') {
        element.clienteItem = 'Medio';
      }
      if (element.cliente == 'BAJO') {
        element.clienteItem = 'Bajo';
      }
      if (element.estructura == 'ALTO') {
        element.estructuraItem = 'Alto';
      }
      if (element.estructura == 'MEDIO') {
        element.estructuraItem = 'Medio';
      }
      if (element.estructura == 'BAJO') {
        element.estructuraItem = 'Bajo';
      }
      if (element.resultadofinal == 'ALTO') {
        element.resultadofinalItem = 'Alto';
      }
      if (element.resultadofinal == 'MEDIO') {
        element.resultadofinalItem = 'Medio';
      }
      if (element.resultadofinal == 'BAJO') {
        element.resultadofinalItem = 'Bajo';
      }
    });
  }

  setClickedRowEditaEvaluacionriesgos(index, evaluacionriesgos) {
    this.evaluacionriesgosService.setEvaluacionriesgos(evaluacionriesgos);
    if (this.idEvaluacionriesgos === undefined) {
      this.router.navigate(['editar', evaluacionriesgos.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', evaluacionriesgos.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaEvaluacionriesgos(index, evaluacionriesgos) {
    this.evaluacionriesgosService.setEvaluacionriesgos(evaluacionriesgos);
    if (this.idEvaluacionriesgos === undefined) {
      this.router.navigate(['eliminar', evaluacionriesgos.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', evaluacionriesgos.id], { relativeTo: this.route });
    }
  }

  getEvaluacionriesgos() {
    if (this.idEvaluacionriesgos === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idEvaluacionriesgos], { relativeTo: this.route });
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
        this.evaluacionriesgos_create = true;
        this.evaluacionriesgos_delete = true;
        this.evaluacionriesgos_update = true;
        this.evaluacionriesgos_read = true;
      }

      if (element.code == 'EVALUACIONRIESGOS:UPDATE') {
        this.evaluacionriesgos_update = true;
      }

      if (element.code == 'EVALUACIONRIESGOS:DELETE') {
        this.evaluacionriesgos_delete = true;
      }

      if (element.code == 'EVALUACIONRIESGOS:READ') {
        this.evaluacionriesgos_read = true;
      }

      if (element.code == 'EVALUACIONRIESGOS:CREATE') {
        this.evaluacionriesgos_create = true;
      }

      if (element.code == 'EVALUACIONRIESGOS:*') {
        this.evaluacionriesgos_update = true;
        this.evaluacionriesgos_create = true;
        this.evaluacionriesgos_delete = true;
        this.evaluacionriesgos_read = true;
      }
    });
  }
}
