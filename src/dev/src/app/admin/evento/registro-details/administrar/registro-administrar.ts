import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Evento } from '../../evento.psg.model';
import { EventoService } from '../../evento.psg.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../../_models/permission';
import { User } from '../../../../_models';

import { RegistroService } from '../../../registro/registro.psg.service';
import { Registro } from '../../../registro/registro.psg.model';

@Component({
  selector: 'clr-registro-styles',
  styleUrls: ['../../evento.psg.scss'],
  templateUrl: './registro-administrar.psg.html',
})
export class RegistroDetailsFormDemo {
  registroArray: Registro[];
  evento = new Evento();

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private registro_update: boolean = false;
  private registro_delete: boolean = false;
  private registro_create: boolean = false;
  private registro_read: boolean = false;

  public variableEntidad: string = '';
  public idEvento: string = '';

  constructor(
    private registroService: RegistroService,
    private router: Router,
    private route: ActivatedRoute,
    private eventoService: EventoService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();

    this.evento = this.eventoService.getEvento();
    this.variableEntidad = this.evento.clave;
    this.route.params.subscribe(params => {
      this.idEvento = params['id'];
      this.cargaRegistroPorEvento(this.idEvento);
    });
  }

  cargaRegistroPorEvento(id) {
    this.registroService.getRecuperaRegistroPorEvento(id).subscribe(
      res => {
        if (res) {
          this.registroArray = res.json();
          this.registroArray.forEach(element => {
            /*this.eventoService.getRecuperaEventoPorId(element.eventoId).subscribe(result => {
              if (result) {
                this.evento = result.json();
                element.eventoItem = this.evento.clave;
              }
            }); DETAILS */
          });
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the registros.', 'error');
      }
    );
  }

  setClickedRowEditaRegistro(index, registro) {
    this.registroService.setRegistro(registro);
    this.router.navigate(['../../../registro-details/editar/', this.idEvento], { relativeTo: this.route });
  }

  setClickedRowEliminaRegistro(index, registro) {
    this.registroService.setRegistro(registro);
    this.router.navigate(['../../../registro-details/eliminar/', this.idEvento], { relativeTo: this.route });
  }

  getRegistro() {
    this.router.navigate(['../../../registro-details/agregar/', this.idEvento], { relativeTo: this.route });
  }

  getUser() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['access_token'];
    this.permissions = obj['permissions'];
    this.user = obj['user'];
  }

  setButtons() {
    this.permissions.forEach(element => {
      if (element.code == 'REGISTRO:CREATE') {
        this.registro_create = true;
      }

      if (element.code == 'REGISTRO:UPDATE') {
        this.registro_update = true;
      }

      if (element.code == 'REGISTRO:DELETE') {
        this.registro_delete = true;
      }

      if (element.code == 'REGISTRO:READ') {
        this.registro_read = true;
      }

      if (element.code == 'REGISTRO:*') {
        this.registro_create = true;
        this.registro_delete = true;
        this.registro_read = true;
        this.registro_update = true;
      }

      if (element.code == '*:*') {
        this.registro_create = true;
        this.registro_delete = true;
        this.registro_read = true;
        this.registro_update = true;
      }
    });
  }
}
