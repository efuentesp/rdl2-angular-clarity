import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Estudiante } from '../../estudiante.psg.model';
import { EstudianteService } from '../../estudiante.psg.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../../_models/permission';
import { User } from '../../../../_models';

import { RegistroService } from '../../../registro/registro.psg.service';
import { Registro } from '../../../registro/registro.psg.model';

@Component({
  selector: 'clr-registro-styles',
  styleUrls: ['../../estudiante.psg.scss'],
  templateUrl: './registro-administrar.psg.html',
})
export class RegistroDetailsFormDemo {
  registroArray: Registro[];
  estudiante = new Estudiante();

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private registro_update: boolean = false;
  private registro_delete: boolean = false;
  private registro_create: boolean = false;
  private registro_read: boolean = false;

  public variableEntidad: string = '';
  public idEstudiante: string = '';

  constructor(
    private registroService: RegistroService,
    private router: Router,
    private route: ActivatedRoute,
    private estudianteService: EstudianteService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();

    this.estudiante = this.estudianteService.getEstudiante();
    this.variableEntidad = this.estudiante.nombreestudiante;
    this.route.params.subscribe(params => {
      this.idEstudiante = params['id'];
      this.cargaRegistroPorEstudiante(this.idEstudiante);
    });
  }

  cargaRegistroPorEstudiante(id) {
    this.registroService.getRecuperaRegistroPorEstudiante(id).subscribe(
      res => {
        if (res) {
          this.registroArray = res.json();
          this.registroArray.forEach(element => {
            /*this.estudianteService.getRecuperaEstudiantePorId(element.estudianteId).subscribe(result => {
              if (result) {
                this.estudiante = result.json();
                element.estudianteItem = this.estudiante.nombreestudiante;
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
    this.router.navigate(['../../../registro-details/editar/', this.idEstudiante], { relativeTo: this.route });
  }

  setClickedRowEliminaRegistro(index, registro) {
    this.registroService.setRegistro(registro);
    this.router.navigate(['../../../registro-details/eliminar/', this.idEstudiante], { relativeTo: this.route });
  }

  getRegistro() {
    this.router.navigate(['../../../registro-details/agregar/', this.idEstudiante], { relativeTo: this.route });
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
