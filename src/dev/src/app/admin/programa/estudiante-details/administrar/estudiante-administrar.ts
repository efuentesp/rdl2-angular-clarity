import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Programa } from '../../programa.psg.model';
import { ProgramaService } from '../../programa.psg.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../../_models/permission';
import { User } from '../../../../_models';

import { EstudianteService } from '../../../estudiante/estudiante.psg.service';
import { Estudiante } from '../../../estudiante/estudiante.psg.model';

@Component({
  selector: 'clr-estudiante-styles',
  styleUrls: ['../../programa.psg.scss'],
  templateUrl: './estudiante-administrar.psg.html',
})
export class EstudianteDetailsFormDemo {
  estudianteArray: Estudiante[];
  programa = new Programa();

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private estudiante_update: boolean = false;
  private estudiante_delete: boolean = false;
  private estudiante_create: boolean = false;
  private estudiante_read: boolean = false;

  public variableEntidad: string = '';
  public idPrograma: string = '';

  constructor(
    private estudianteService: EstudianteService,
    private router: Router,
    private route: ActivatedRoute,
    private programaService: ProgramaService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();

    this.programa = this.programaService.getPrograma();
    this.variableEntidad = this.programa.nombreprograma;
    this.route.params.subscribe(params => {
      this.idPrograma = params['id'];
      this.cargaEstudiantePorPrograma(this.idPrograma);
    });
  }

  cargaEstudiantePorPrograma(id) {
    this.estudianteService.getRecuperaEstudiantePorPrograma(id).subscribe(
      res => {
        if (res) {
          this.estudianteArray = res.json();
          this.estudianteArray.forEach(element => {
            /*this.programaService.getRecuperaProgramaPorId(element.programaId).subscribe(result => {
              if (result) {
                this.programa = result.json();
                element.programaItem = this.programa.nombreprograma;
              }
            }); DETAILS */
          });
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the estudiantes.', 'error');
      }
    );
  }

  setClickedRowEditaEstudiante(index, estudiante) {
    this.estudianteService.setEstudiante(estudiante);
    this.router.navigate(['../../../estudiante-details/editar/', this.idPrograma], { relativeTo: this.route });
  }

  setClickedRowEliminaEstudiante(index, estudiante) {
    this.estudianteService.setEstudiante(estudiante);
    this.router.navigate(['../../../estudiante-details/eliminar/', this.idPrograma], { relativeTo: this.route });
  }

  getEstudiante() {
    this.router.navigate(['../../../estudiante-details/agregar/', this.idPrograma], { relativeTo: this.route });
  }

  getUser() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['access_token'];
    this.permissions = obj['permissions'];
    this.user = obj['user'];
  }

  setButtons() {
    this.permissions.forEach(element => {
      if (element.code == 'ESTUDIANTE:CREATE') {
        this.estudiante_create = true;
      }

      if (element.code == 'ESTUDIANTE:UPDATE') {
        this.estudiante_update = true;
      }

      if (element.code == 'ESTUDIANTE:DELETE') {
        this.estudiante_delete = true;
      }

      if (element.code == 'ESTUDIANTE:READ') {
        this.estudiante_read = true;
      }

      if (element.code == 'ESTUDIANTE:*') {
        this.estudiante_create = true;
        this.estudiante_delete = true;
        this.estudiante_read = true;
        this.estudiante_update = true;
      }

      if (element.code == '*:*') {
        this.estudiante_create = true;
        this.estudiante_delete = true;
        this.estudiante_read = true;
        this.estudiante_update = true;
      }
    });
  }
}
