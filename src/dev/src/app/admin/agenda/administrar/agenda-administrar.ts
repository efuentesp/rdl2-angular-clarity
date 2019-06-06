/* PSG  Agenda Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Agenda } from '../agenda.psg.model';
import { AgendaService } from '../agenda.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-agenda',
  styleUrls: ['../agenda.psg.scss'],
  templateUrl: './agenda-administrar.psg.html',
})
export class AgendaAdministrar {
  agendaArray: Agenda[];
  agenda: Agenda;
  idAgenda: number;
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

  agenda_update: boolean = false;
  agenda_delete: boolean = false;
  agenda_create: boolean = false;
  agenda_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private agendaService: AgendaService
  ) {}

  ngOnInit() {
    console.log('Agenda administrar()');

    this.getUser();
    this.setButtons();
    this.cargaAgenda();

    this.route.params.subscribe(params => {
      this.idAgenda = params['id'];
    });

    if (this.idAgenda !== undefined) {
      this.getRecuperaAgendaPorFideicomiso(this.idAgenda);
    }
    if (this.idAgenda !== undefined) {
      this.getRecuperaAgendaPorSubfiso(this.idAgenda);
    }
  }

  cargaAgenda() {
    this.agendaService.getRecuperaAgenda().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.agendaArray = res.json();
            this.llenaCampos(this.agendaArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Agenda.', 'error');
      }
    );
  }

  getRecuperaAgendaPorFideicomiso(id) {
    this.agendaService.getRecuperaAgendaPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.agendaArray = res.json();
            this.llenaCampos(this.agendaArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the agenda.', 'error');
      }
    );
  }
  getRecuperaAgendaPorSubfiso(id) {
    this.agendaService.getRecuperaAgendaPorSubfiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.agendaArray = res.json();
            this.llenaCampos(this.agendaArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the agenda.', 'error');
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
      if (element.estatus == 'APLICADO') {
        element.estatusItem = 'APLICADO';
      }
      if (element.estatus == 'ACTIVO') {
        element.estatusItem = 'ACTIVO';
      }
    });
  }

  setClickedRowEditaAgenda(index, agenda) {
    this.agendaService.setAgenda(agenda);
    if (this.idAgenda === undefined) {
      this.router.navigate(['editar', agenda.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', agenda.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaAgenda(index, agenda) {
    this.agendaService.setAgenda(agenda);
    if (this.idAgenda === undefined) {
      this.router.navigate(['eliminar', agenda.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', agenda.id], { relativeTo: this.route });
    }
  }

  getAgenda() {
    if (this.idAgenda === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idAgenda], { relativeTo: this.route });
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
        this.agenda_create = true;
        this.agenda_delete = true;
        this.agenda_update = true;
        this.agenda_read = true;
      }

      if (element.code == 'AGENDA:UPDATE') {
        this.agenda_update = true;
      }

      if (element.code == 'AGENDA:DELETE') {
        this.agenda_delete = true;
      }

      if (element.code == 'AGENDA:READ') {
        this.agenda_read = true;
      }

      if (element.code == 'AGENDA:CREATE') {
        this.agenda_create = true;
      }

      if (element.code == 'AGENDA:*') {
        this.agenda_update = true;
        this.agenda_create = true;
        this.agenda_delete = true;
        this.agenda_read = true;
      }
    });
  }
}
